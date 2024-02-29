import React, {useState} from 'react';
import {withRouter} from "react-router";
import TemplateAddMonitor from "./TemplateAddMonitor";
import {Alert, Form, Modal, Space, Table, Tabs} from "antd";
import templateSettingStore from "../store/TemplateSettingStore";
import "./TemplateSettingMonitorList.scss"
import TemplateUpdateMonitor from "./TemplateUpdateMonitor";

const TemplateSettingMonitorList = (props) => {


    const {deleteMonitorById, findTemplateMonitorByTemplateId, findTemplatePage, monitorTotal} = templateSettingStore;

    const [form] = Form.useForm();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const {
        setIsModalOpen,
        isModalOpen,
        rowData,
        setRowData,
        monitorList,
        setMonitorList,
        dataList,
        setDataList
    } = props;

    const [monitorId, setMonitorId] = useState({});

    const [visible, setVisible] = useState(false);

    const handleOk = async () => {

        const templatePage = await findTemplatePage();

        setDataList([...templatePage.dataList])

        setIsModalOpen(false);

    };

    const handleCancel = async () => {

        const templatePage = await findTemplatePage();

        setDataList([...templatePage.dataList])

        setIsModalOpen(false);
    };


    async function updateMonitorForTemplate(record) {

        setMonitorId(record.id)

        form.setFieldsValue({
            name: record.name,
            monitorType: record.monitorItem.type,
            expression: record.monitorItem.id,
            monitorItemId: record.monitorItem.id,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            monitorStatus: record.monitorStatus
        })

        console.log(form.getFieldsValue())

        setIsUpdateModalOpen(true)
    }

    async function deleteMonitorForTemplate(id) {

        const resMessage = await deleteMonitorById(id);

        if (resMessage.code === 110) {
            setVisible(true);
        }

        const resData = await findTemplateMonitorByTemplateId(rowData.id);

        setMonitorList([...resData.data])
    }

    const handleClose = () => {
        setVisible(false);
    };


    const monitorColumns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => updateMonitorForTemplate(record)}>{text}</span>,
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
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteMonitorForTemplate(record.id)}>删除</span>
                </Space>
            ),
        },

    ];

    return (
        <div>
            <Modal
                open={isModalOpen}
                title="模板详情"
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                width={1200}
            >
                <div className="box-templateSetting-details-between">
                    <div className="">
                        <div
                            className="box-templateSetting-details-text">模板名称: {rowData.name}
                        </div>
                        <div
                            className="box-templateSetting-details-text">模板下监控项数量：{rowData.monitorNum}
                        </div>
                    </div>

                </div>
                <div>
                    {visible ? (
                        <Alert message="监控项下有关联触发器或者图表,无法删除" type="warning" banner={true} closable
                               afterClose={handleClose}/>
                    ) : null}
                </div>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="监控项信息" key="2">
                        <div className="box-templateSetting-details-between">
                            <div>

                            </div>
                            <div className="box-templateSetting-details-text">
                                <TemplateAddMonitor rowData={rowData} monitorList={monitorList}
                                                    setMonitorList={setMonitorList}/>
                            </div>
                        </div>
                        <Table
                            rowKey={record => record.id}
                            columns={monitorColumns}
                            dataSource={monitorList}
                            pagination={{
                                position: ["bottomCenter"],
                                total: monitorTotal,
                                showSizeChanger: true
                            }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="其他" key="3">
                        其他信息
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
            <div>
                <TemplateUpdateMonitor rowData={rowData} form={form}
                                       isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen}
                                       monitorId={monitorId}
                                       monitorList={monitorList} setMonitorList={setMonitorList}
                />
            </div>

        </div>
    );
};

export default withRouter(TemplateSettingMonitorList);