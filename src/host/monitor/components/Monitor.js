import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Col, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import {SearchOutlined} from "@ant-design/icons";
import UpdateMonitor from "./UpdateMonitor";
import {observer} from "mobx-react";

const Monitor = (props) => {

    const {
        findMonitorCondition,
        setSearchCondition,
        monitorList,
        setSearchNullCondition,
        total,
        deleteMonitorById,
        searchCondition
    } = monitorStore;

    const [monitorSource, setMonitorSource] = useState(null);

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        let hostId = localStorage.getItem(`hostId`);
        setSearchNullCondition({
            hostId: hostId,
            name: null,
            source: null
        });

        await findMonitorCondition();
    }, []);

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({
            name: value,
        })
        await findMonitorCondition();
    };


    const onClickMonitor = async (monitorSource) => {
        setMonitorSource(monitorSource)
        let hostId = localStorage.getItem(`hostId`);
        //条件筛选
        setSearchNullCondition({
            source: monitorSource,
            name: null,
            hostId: hostId
        })
        await findMonitorCondition();
    }

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        });

        await findMonitorCondition();
    }

    const removeToList = async (record) => {

        if (record.source === 1) {

            await deleteMonitorById(record.id);
            await findMonitorCondition();
        }

    }

    const drawerList = (record) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            name: record.name,
            monitorType: record.monitorItem.type,
            expression: record.monitorItem.id,
            monitorItemId: record.monitorItem.id,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            source: record.source,
            monitorStatus: record.monitorStatus
        })

        setColumnData({
            id: record.id,
            name: record.name,
            type: record.monitorType,
            monitorItemId: record.monitorItem.id,
            monitorItem: record.monitorItem,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            source: record.source,
            monitorStatus: record.monitorStatus
        })

    };

    const availabilityTab = [
        {
            title: '全部',
            key: null,
            icon: "allHost"
        },
        {
            title: '主机监控项',
            key: 1,
            icon: "noAvailableHost"
        },
        {
            title: '模板监控项',
            key: 2,
            icon: "availableHost"
        },
    ];

    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => drawerList(record)}>{text}</span>,
        },
        {
            title: '监控项大类',
            dataIndex: ['monitorItem', 'type'],
            id: 'monitorType',
        },
        {
            title: '监控项小类',
            dataIndex: ['monitorItem', 'dataSubclass'],
            id: 'dataSubclass',
            render: (name) => <Tooltip title={name}>
                <div>{name}</div>
            </Tooltip>
        },
        {
            title: '监控表达式',
            dataIndex: ['monitorItem', 'name'],
            id: 'expression',
        },
        {
            title: '监控项来源',
            dataIndex: 'source',
            id: 'source',
            render: (monitorSource) => {
                let config = {
                    1: "主机",
                    2: "模板",
                }
                return config[monitorSource];
            }
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
                    2: "关闭",
                }
                return config[monitorStatus];
            }
        },
        /*{
            title: '监控信息',
            dataIndex: 'information',
            id: 'information',
        },*/
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => removeToList(record)}>删除</span>
                </Space>
            ),
        },

    ];

    return (
        <Row className="box-monitor-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                {/*<div className="box-monitor-title">
                    <div className="box-monitor-title-text">监控项数量:{total}</div>

                </div>*/}
                <div className="monitor-kind-options">
                    <div className="monitor-kind-options-tabs">
                        {
                            availabilityTab.map(item => {
                                return <div
                                    key={item.title}
                                    className={`monitor-kind-options-tabs-text ${item.key === monitorSource ? "monitor-select" : ""}`}
                                    onClick={() => onClickMonitor(item.key)}>
                                    {item.title}
                                </div>
                            })
                        }
                    </div>
                    <div className="monitor-top-right-search">
                        <div>
                            <Input
                                placeholder="监控项名称"
                                className="monitor-kind-search"
                                onPressEnter={(event) => searchName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="monitor-top-right">
                            <AddMonitor/>
                        </div>
                    </div>
                </div>
                <div className="box-monitor-table">
                    <>
                        <UpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                       form={form} columnData={columnData}
                        />
                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={monitorList}
                               className="custom-table"
                               scroll={{
                                   x: 300,
                               }}
                               onChange={changePage}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: total,
                                   showSizeChanger: true,
                                   pageSize: searchCondition.pageParam.pageSize,
                                   current: searchCondition.pageParam.currentPage,
                               }}
                        />
                    </>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Monitor));