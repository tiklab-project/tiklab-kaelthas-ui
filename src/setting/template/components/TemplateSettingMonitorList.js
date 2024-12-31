import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Alert, Col, Form, Modal, Row, Space, Table, Tabs} from "antd";
import templateSettingStore from "../store/TemplateSettingStore";
import "./TemplateSettingMonitorList.scss"
import TemplateUpdateMonitor from "./UpdateTemplateMonitor";
import {observer} from "mobx-react";
import AddTemplateMonitor from "./AddTemplateMonitor";
import {LeftOutlined} from "@ant-design/icons";
import HideDelete from "../../../common/hideDelete/HideDelete";

const TemplateSettingMonitorList = (props) => {
    const {match:{params}} = props;

    const {
        deleteMonitorById,
        findMonitorByTemplateId,
        monitorTotal,
        monitorList,
        setMonitorSearchCondition,
        monitorSearchCondition,
        findTemplateById
    } = templateSettingStore;

    const [form] = Form.useForm();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [monitorId, setMonitorId] = useState({});

    const [templateData,setTemplateData]=useState()

    useEffect(async () => {

        await setMonitorSearchCondition({
            templateId: params.id
        })

        await findMonitorByTemplateId()

        findTemplateById(params.id).then(res=>{
            res.code===0&&setTemplateData(res.data)
        })
    }, []);

    async function updateMonitorForTemplate(record) {

        setMonitorId(record.id)

        form.setFieldsValue({
            name: record.name,
            monitorType: record.monitorItem.type,
            expression: record.expression,
            monitorItemId: record.monitorItem.id,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            monitorStatus: record.monitorStatus
        })

        console.log(form.getFieldsValue())

        setIsUpdateModalOpen(true)
    }

    async function deleteMonitorForTemplate(record) {

        await deleteMonitorById({
            id: record?.id,
            templateId: record?.hostId,
            monitorItemId: record?.monitorItem?.id
        });
        await findMonitorByTemplateId(params.id);
    }


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
            dataIndex: 'expression',
            id: 'expression',
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
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteMonitorForTemplate(record)}
                        operation={"删除"}
                    />
                </Space>
            ),
        },

    ];

    function hrefTemplate() {
        props.history.push(`/setting/template`);
    }

    async function checkPage(pagination) {
        setMonitorSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })
        await findMonitorByTemplateId();
    }

    return (
        <Row className="monitor-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-between-div">
                    <div className="template-monitor-title">
                        <LeftOutlined onClick={() => hrefTemplate()}/>
                        &nbsp; 模板名称: {templateData?.name}
                    </div>
                    <div className="box-between">
                        <div className="box-between-title">
                            模板下监控项数量：{monitorTotal}
                        </div>
                    </div>
                </div>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="监控项信息" key="2">
                        <div className="box-between">
                            <div className="box-details-text">
                                <AddTemplateMonitor {...props} templateId={templateData?.id}/>
                            </div>
                        </div>
                        <Table
                            rowKey={record => record.id}
                            columns={monitorColumns}
                            dataSource={monitorList}
                            className="custom-table"
                            onChange={checkPage}
                            pagination={{
                                position: ["bottomCenter"],
                                total: monitorTotal,
                                showSizeChanger: true,
                                pageSize: monitorSearchCondition.pageParam.pageSize,
                                current: monitorSearchCondition.pageParam.currentPage,
                            }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="其他" key="3">
                        其他信息
                    </Tabs.TabPane>
                </Tabs>
            </Col>
            <>
                <TemplateUpdateMonitor form={form}  monitorId={monitorId}
                                       isUpdateModalOpen={isUpdateModalOpen}
                                       setIsUpdateModalOpen={setIsUpdateModalOpen}
                                       templateId={params.id}
                />
            </>
        </Row>
    );
};

export default withRouter(observer(TemplateSettingMonitorList));
