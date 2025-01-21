import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Col, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import {SearchOutlined} from "@ant-design/icons";
import UpdateMonitor from "./UpdateMonitor";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";

const Monitor = (props) => {
    const {match:{params}} = props;

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
        setSearchNullCondition({
            hostId: params.id,
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
        //条件筛选
        setSearchNullCondition({
            source: monitorSource,
            name: null,
            hostId: params.id
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
        setColumnData(record)
        /*setColumnData({
            id: record.id,
            name: record.name,
            type: record.monitorType,
            monitorItemId: record.monitorItem.id,
            monitorItem: record.monitorItem,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            source: record.source,
            monitorStatus: record.monitorStatus
        })*/

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
            width: "10%",
            ellipsis: "true",
            render: (name, record) => {
                let text;
                record?.source === 1 ?
                    text = <span style={{cursor: "pointer"}}
                                 onClick={() => drawerList(record)}>{name}</span>
                    :
                    text = <span>{name}</span>
                return text;
            }
        },
        {
            title: '监控项大类',
            dataIndex: ['monitorItem', 'type'],
            id: 'monitorType',
            width: "10%",
            ellipsis: "true"
        },
        {
            title: '监控项小类',
            dataIndex: ['monitorItem', 'dataSubclass'],
            id: 'dataSubclass',
            width: "10%",
            ellipsis: "true",
            render: (name) => <span>{name}</span>
        },
        {
            title: '监控表达式',
            dataIndex: 'expression',
            id: 'expression',
            width: "20%",
            ellipsis: "true"
        },
        {
            title: '监控项来源',
            dataIndex: 'source',
            id: 'source',
            width: "10%",
            ellipsis: "true",
            render: (monitorSource, record) => {
                let text;
                record?.templateId !== null ?
                    text = <span>模板</span>
                    :
                    text = <span>主机</span>
                return text;
            }
        },
        {
            title: '数据保留时间',
            dataIndex: 'dataRetentionTime',
            id: 'dataRetentionTime',
            width: "10%",
            ellipsis: "true",
        },
        {
            title: '监控项状态',
            dataIndex: 'monitorStatus',
            id: 'monitorStatus',
            width: "10%",
            ellipsis: "true",
            render: (monitorStatus) => {
                let config = {
                    1: "启用",
                    2: "关闭",
                }
                return config[monitorStatus];
            }
        },
        {
            title: '操作',
            id: 'action',
            width: "10%",
            ellipsis: "true",
            render: (_, record) => (
                <Space size="middle">
                    {
                        record?.source === 1 ? <HideDelete
                            deleteFn={() => removeToList(record)}
                            operation={"删除"}
                        /> : <span>无</span>
                    }
                </Space>
            ),
        },

    ];

    return (
        <div className="box-monitor-right">
            <div className='box-monitor-title'>
                <div className='box-monitor-title-text'>监控项</div>
                <div className="monitor-top-right">
                    <AddMonitor {...props}    hostId={params.id}/>
                </div>
            </div>

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

                </div>
            </div>
            <div className="box-monitor-table">
                <>

                            <UpdateMonitor isModalOpen={isModalOpen}
                                           setIsModalOpen={setIsModalOpen}
                                           columnData={columnData}
                                           hostId={params.id}
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
        </div>
    );
};

export default withRouter(observer(Monitor));
