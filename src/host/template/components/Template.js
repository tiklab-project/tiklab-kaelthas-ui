import React, {useEffect, useState} from 'react';
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Col, Drawer, Input, Modal, Row, Space, Table, Tabs} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";
import "../../../common/styles/_tabStyle.scss"
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const monitorColumns = [
    {
        title: '监控项名称',
        dataIndex: 'name',
        id: 'name',
        render: (text) => <span>{text}</span>,
    },
    {
        title: '监控项类别',
        dataIndex: ['monitorItem', 'type'],
        id: 'monitorType',
    },
    {
        title: '监控表达式',
        dataIndex: ['monitorItem', 'name'],
        id: 'expression',
    },
    {
        title: '间隔时间',
        dataIndex: 'intervalTime',
        id: 'intervalTime',
    },
    {
        title: '数据保留时间',
        dataIndex: 'dataRetentionTime',
        id: 'dataRetentionTime',
    },
    {
        title: '监控项状态',
        dataIndex: 'monitorStatus',
        id: 'monitorStatus',
        render: (monitorStatus) => {
            let config = {
                1: "启用",
                2: "未启用",
            }
            return config[monitorStatus];
        }
    },
    {
        title: '监控信息',
        dataIndex: 'information',
        id: 'information',
    },

];

const Template = (props) => {

    const [dataList, setDataList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        findTemplateByMonitor,
        deleteTemplateById,
        setSearchCondition,
        findMonitorByTemplateId,
        total,
        monitorList,
        templatePage
    } = templateStore;

    const [rowData, setRowData] = useState({});

    useEffect(async () => {
        setSearchCondition({
            name: null,
            hostId: localStorage.getItem(`hostId`),
            monitorSource: 2
        })

        const resData = await findTemplateByMonitor();
        if (resData === null) {
            setDataList([])
        } else {
            setDataList([...resData])
        }
    }, []);


    const deleteTemplate = async (id) => {

        await deleteTemplateById({
            hostId: localStorage.getItem("hostId"),
            templateId: id
        });

        const resData = await findTemplateByMonitor();

        setDataList([...resData]);
    };

    const searchName = async (event) => {

        const name = event.target.value;

        setSearchCondition({name: name});

        const resData = await findTemplateByMonitor();

        setDataList([...resData])

    };

    const handleOk = async () => {
        setIsModalOpen(false);

    };

    async function showTemplateDetails(record) {
        setIsModalOpen(true);

        setRowData({
            id: record.id,
            name: record.name,
            monitorNum: record.monitorNum
        })

        await findMonitorByTemplateId(record.id);

    }

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (name, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{name}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
        },
        /*{
            title: '触发器数量',
            dataIndex: 'triggerNum',
            id: 'triggerNum',
        },*/
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{cursor: "pointer"}} onClick={() => deleteTemplate(record.id)}>移除</div>
                </Space>
            ),
        },

    ];

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        const resData = await findTemplateByMonitor();

        setDataList([...resData])
    }

    return (
        <Row className="box-template-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-template-title">
                    <div className="box-template-title-text">
                        模板
                    </div>
                    <div className="template-top-right">
                        <AddTemplate/>
                    </div>
                </div>
                <div className="template-kind-options">
                    <div>
                        <Input placeholder="模板名称"
                               className="template-kind-search"
                               onPressEnter={(event) => searchName(event)}
                               allowClear={true}
                               prefix={<SearchOutlined/>}
                        />
                    </div>
                </div>

                <div className="box-template-table">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={templatePage}
                        className="custom-table"
                        onChange={changePage}
                        pagination={{
                            position: ["bottomCenter"],
                            total: total,
                            showSizeChanger: true
                        }
                        }
                    />
                    <Drawer
                        title="模板详情"
                        placement="right"
                        onClose={handleOk}
                        open={isModalOpen}
                        visible={isModalOpen}
                        width={1000}
                        contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
                        maskStyle={{background: "transparent"}}
                    >
                        <div className="box-template-details-text">模板名称:{rowData.name}</div>
                        <div className="box-template-details-text">模板下监控项数量：{rowData.monitorNum}</div>

                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="监控项信息" key="2">
                                <Table
                                    rowKey={record => record.id}
                                    columns={monitorColumns}
                                    className="custom-table"
                                    dataSource={monitorList}
                                    scroll={{
                                        x: 300,
                                        y: 'max-content'
                                    }}
                                    pagination={{
                                        position: ["bottomCenter"],
                                        total: total,
                                        showSizeChanger: true
                                    }}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="其他" key="3">
                                其他信息
                            </Tabs.TabPane>
                        </Tabs>
                    </Drawer>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Template));