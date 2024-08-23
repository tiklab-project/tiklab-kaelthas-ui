import React, {useEffect, useState} from 'react';
import "./KuMonitor.scss"
import {Col, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import KuUpdateMonitor from "./KuUpdateMonitor";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import kuMonitorStore from "../store/KuMonitorStore";
import KuAddMonitor from "./KuAddMonitor";

const KuMonitor = (props) => {

    const {
        findKuMonitorPage,
        setSearchCondition,
        kuMonitorList,
        setSearchNullCondition,
        total,
        deleteKuMonitor,
        searchCondition
    } = kuMonitorStore;

    const [monitorSource, setMonitorSource] = useState(null);

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        setSearchCondition({
            dbId: localStorage.getItem("kuId")
        })
        await findKuMonitorPage()
    }, []);

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({
            name: value
        })
        await findKuMonitorPage()
    };


    const onClickMonitor = async (monitorSource) => {

    }

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        });

        await findKuMonitorPage();
    }

    const removeToList = async (record) => {
        await deleteKuMonitor(record.id)
        await findKuMonitorPage()
    }

    const drawerList = (record) => {
        form.setFieldsValue(record)
        setColumnData(record)
        setIsModalOpen(true);
    };

    const availabilityTab = [
        {
            title: '全部',
            key: null,
            icon: "allHost"
        },
        {
            title: '数据库监控项',
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
            render: (name, record) => <span style={{cursor: "pointer"}} onClick={() => drawerList(record)}>{name}</span>
        },

        {
            title: '监控表达式',
            dataIndex: ['kubernetesItem', 'expression'],
            id: 'expression',
            width: "20%",
            ellipsis: "true"
        },
        {
            title: '数据保留时间',
            dataIndex: 'retentionTime',
            id: 'retentionTime',
            width: "10%",
            ellipsis: "true",
        },
        {
            title: '监控项状态',
            dataIndex: 'status',
            id: 'status',
            width: "10%",
            ellipsis: "true",
            render: (status) => {
                let config = {
                    1: "启用",
                    2: "关闭",
                }
                return config[status];
            }
        },
        {
            title: '操作',
            id: 'action',
            width: "5%",
            ellipsis: "true",
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => removeToList(record)}
                        operation={"删除"}
                    />
                </Space>
            ),
        },

    ];

    return (
        <Row className="ku-monitor-right">
            <Col style={{marginLeft: 10}}>
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
                            <KuAddMonitor/>
                        </div>
                    </div>
                </div>
                <div className="ku-monitor-table">
                    <>
                        <KuUpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                         form={form} columnData={columnData}
                        />
                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={kuMonitorList}
                               className="custom-table"
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

export default withRouter(observer(KuMonitor));