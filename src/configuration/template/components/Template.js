import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Button, Input, Modal, Space, Table, Tabs} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";
import ShowTemplateMonitor from "./ShowTemplateMonitor";
import TemplateDetails from "./TemplateDetails";

const monitorColumns = [
    {
        title: '监控项名称',
        dataIndex: 'name',
        id: 'name',
        render: (text) => <span style={{cursor: "pointer"}}>{text}</span>,
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

    const {findTemplateByMonitor, deleteTemplateById, setSearchCondition, findMonitorByTemplateId} = templateStore;

    const [monitorList, setMonitorList] = useState([]);

    const [rowData, setRowData] = useState({});

    useEffect(async () => {
        setSearchCondition({
            name: null,
            hostId: localStorage.getItem(`hostId`),
            monitorSource: 2
        })

        const resData = await findTemplateByMonitor();

        setDataList([...resData])
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    async function showTemplateDetails(record) {
        setIsModalOpen(true);
        setRowData({
            id: record.id,
            name:record.name,
            superiorId: record.superiorId
        })
    }

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{text}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'superiorId',
            id: 'superiorId',
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


    async function searchMonitorForTemplate() {
        //根据模板id查询模板下的监控项

        const resData = await findMonitorByTemplateId(rowData.id);

        setMonitorList([...resData.data])
    }

    return (
        <div>
            <div className="host-body">
                <div className="box-template">
                    <LeftMenu/>
                    <div className="box-template-right">
                        <div className="box-template-title">
                            <div className="box-template-title-text">
                                主机下模板
                            </div>
                            <div className="template-top-right">
                                <div>
                                    <AddTemplate dataList={dataList} setDataList={setDataList}/>
                                </div>

                            </div>
                        </div>
                        <div className="template-kind-options">
                            <div className="template-kind-search">
                                <div>
                                    <Input placeholder="请输入模板名称" onPressEnter={(event) => searchName(event)}/>
                                </div>
                            </div>
                        </div>

                        <div className="box-template-table">
                            <Table
                                rowKey={record => record.id}
                                columns={columns}
                                dataSource={dataList}
                                pagination={{
                                    position: ["bottomCenter"],
                                }
                                }
                            />
                            <Modal
                                open={isModalOpen}
                                title="模板详情"
                                onOk={handleOk}
                                onCancel={handleCancel}
                                visible={isModalOpen}
                                width={1000}
                            >

                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="详细信息" key="1">
                                        <TemplateDetails rowData={rowData}/>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="监控项信息" key="2">
                                        <Table columns={monitorColumns} dataSource={monitorList}/>
                                        <Button onClick={() => searchMonitorForTemplate()}>点击查询</Button>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="其他" key="3">
                                        其他信息
                                    </Tabs.TabPane>
                                </Tabs>

                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Template);