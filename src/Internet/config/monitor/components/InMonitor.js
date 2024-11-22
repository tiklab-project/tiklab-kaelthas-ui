import React, {useEffect, useState} from 'react';
import "./InMonitor.scss"
import AddMonitor from "./InAddMonitor";
import {Col, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/InMonitorStore";
import {SearchOutlined} from "@ant-design/icons";
import InUpdateMonitor from "./InUpdateMonitor";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";

const InMonitor = () => {

    const {
        findMonitorPage,
        setSearchCondition,
        monitorList,
        total,
        deleteMonitor,
        searchCondition
    } = monitorStore;

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        setSearchCondition({
            internetId: localStorage.getItem("internetId")
        })
        await findMonitorPage()
    }, []);

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({
            name: value
        })
        await findMonitorPage()
    };

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        });

        await findMonitorPage();
    }

    const removeToList = async (record) => {
        await deleteMonitor(record.id)
        await findMonitorPage()
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
            dataIndex:  'expression',
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
        <Row className="in-monitor-right">
            <Col>
                <div className="monitor-kind-options">
                    <div className="monitor-kind-options-tabs">
                            <Input
                                placeholder="监控项名称"
                                className="monitor-kind-search"
                                onPressEnter={(event) => searchName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                    </div>
                    <div className="monitor-top-right-search">
                        <div className="monitor-top-right">
                            <AddMonitor/>
                        </div>
                    </div>
                </div>
                <div className="in-monitor-table">
                    <>
                        <InUpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                         form={form} columnData={columnData}
                        />
                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={monitorList}
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

export default withRouter(observer(InMonitor));