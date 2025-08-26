import React, {useEffect, useState} from 'react';
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Col, Drawer, Input, Row, Space, Table, Tabs} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";
import "../../../../common/styles/_tabStyle.scss"
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import SearchInput from "../../../../common/input/SearchInput";


const Template = (props) => {
    const {match:{params}} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        findTemplateByMonitor,
        deleteTemplateById,
        setSearchCondition,
        findMonitorByTemplateId,
        setMonitorSearchCondition,
        total,
        monitorList,
        templatePage,
        monitorTotal,
        searchCondition
    } = templateStore;

    const [rowData, setRowData] = useState({});

    useEffect(async () => {
        setSearchCondition({
            name: null,
            hostId: params.id,
            monitorSource: 2
        })

        await findTemplateByMonitor();
    }, []);


    const deleteTemplate = async (id) => {

        await deleteTemplateById({
            hostId: params.id,
            templateId: id
        });

        await findTemplateByMonitor();
    };

    const searchName = async (event) => {

        const name = event.target.value;

        setSearchCondition({name: name});

        await findTemplateByMonitor();
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

        await setMonitorSearchCondition({
            templateId: record.id
        })

        await findMonitorByTemplateId();
    }

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            width: "40%",
            ellipsis: "true",
            render: (name, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{name}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
            width: "40%",
            ellipsis: "true",
        },
        /*{
            title: '触发器数量',
            dataIndex: 'triggerNum',
            id: 'triggerNum',
            width:"10%",
            ellipsis:"true",
        },*/
        {
            title: '操作',
            id: 'action',
            width: "20%",
            ellipsis: "true",
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteTemplate(record.id)}
                        operation={"移除"}
                    ></HideDelete>
                </Space>
            ),
        },

    ];

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
            dataIndex: 'expression',
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
        }
    ];

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })
        await findTemplateByMonitor();
    }

    return (
        <div className="box-template-right">

            <div className='box-template-right-title'>
                <div className="host-template-right-div">
                    <div>
                        <SearchInput {...props}
                                     placeholder={"模板名称"}
                                     onChange={(event) => searchName(event)}
                            /*   onPressEnter={onSearch}*/
                        />
                    </div>
                </div>
                <div className="host-template-top-right">
                    <AddTemplate {...props}   hostId={params.id}/>
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
                                pagination={{
                                    position: ["bottomCenter"],
                                    total: monitorTotal,
                                    showSizeChanger: true,
                                    pageSize: searchCondition.pageParam.pageSize,
                                    current: searchCondition.pageParam.currentPage,
                                }}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Drawer>
            </div>

        </div>
    );
};

export default withRouter(observer(Template));
