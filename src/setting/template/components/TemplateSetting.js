import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Col, Input, Modal, Row, Space, Table, Tabs} from "antd";
import "./TemplateSetting.scss"
import TemplateSettingAdd from "./TemplateSettingAdd";
import templateSettingStore from "../store/TemplateSettingStore";
import TemplateAddMonitor from "./TemplateAddMonitor";
import templateStore from "../../../configuration/template/store/TemplateStore";


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

const TemplateSetting = (props) => {

    const {findTemplatePage,setSearchCondition,createTemplate,deleteTemplate} = templateSettingStore;

    const {findTemplateByMonitor, deleteTemplateById, findMonitorByTemplateId} = templateStore;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rowData, setRowData] = useState({});

    const [dataList,setDataList] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    useEffect(async () => {

        const templatePage = await findTemplatePage();

        setDataList([...templatePage.dataList])

    }, []);

    const searchName = async (event) => {
        const name = event.target.value;

        setSearchCondition({name: name});

        const resData = await findTemplatePage();

        setDataList([...resData.dataList])
    };

    async function showTemplateDetails(record) {
        setIsModalOpen(true);

        setRowData({
            id: record.id,
            name:record.name,
            superiorId: record.superiorId
        })

        const resData = await findMonitorByTemplateId(record.id);

        setMonitorList([...resData.data])

    }

    const handleOk = async () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const deleteForTemplate= async (id) => {

        await deleteTemplate(id);

        const resData = await findTemplatePage();

        setDataList([...resData.dataList]);
    };

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{text}</span>,
        },
        {
            title: '模板状态',
            dataIndex: 'isOpen',
            id: 'isOpen',
            render:(isOpen) =>{
                let config = {
                    1:"开启",
                    2:"关闭"
                }
                return config[isOpen];
            }
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
        },
        {
            title: '模板描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{cursor: "pointer"}} onClick={() => deleteForTemplate(record.id)}>删除</div>
                </Space>
            ),
        },

    ];

    return (
        <Row className="box-templateSetting">
            <div className="box-templateSetting-body">
                <Col>
                    <div className="box-templateSetting-div">
                        <div className="box-privilege-breadcrumb">
                            <Space className="box-templateSetting-space">
                                <span>模板</span>
                            </Space>
                            <Space>
                                <TemplateSettingAdd/>
                            </Space>
                        </div>
                        <div className="template-kind-option">
                            <div className="template-kind-search">
                                <div>
                                    <Input placeholder="请输入模板名称" onPressEnter={(event) => searchName(event)}/>
                                </div>
                            </div>
                        </div>

                        <div className="box-templateSetting-table">
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
                                <div className="box-template-details-text">模板名称:{rowData.name}</div>
                                <div className="box-template-details-text">模板下监控项数量：{rowData.superiorId}</div>

                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="监控项信息" key="2">
                                        <TemplateAddMonitor rowData={rowData}/>
                                        <Table columns={monitorColumns} dataSource={monitorList}/>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="其他" key="3">
                                        其他信息
                                    </Tabs.TabPane>
                                </Tabs>

                            </Modal>
                        </div>
                    </div>
                </Col>
            </div>

        </Row>
    );
};

export default withRouter(TemplateSetting);