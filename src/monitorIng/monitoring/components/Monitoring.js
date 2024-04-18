import React, {useEffect} from 'react';
import {Col, Input, Pagination, Row, Table} from "antd";
import "./MonitorIng.scss"
import monitoringStore from "../store/MonitoringStore";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";

const Monitoring = (props) => {

    const {
        findHostPage,
        findInformationByMonitorId,
        setSearchCondition,
        searchCondition,
        total,
        hostState,
        setHostState,
        setNullCondition,
        monitoringList
    } = monitoringStore;

    const host = (record) => {
        console.log("路由跳转到监控项详情中")
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
        localStorage.setItem('hostIdForMonitoring', record.id);
        localStorage.setItem("hostName", record.name)
        localStorage.setItem("ip", record.ip)
    }

    useEffect(async () => {
        setNullCondition();
        await findHostPage();
    }, []);


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            ellipsis: true,
            key: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
        },
        {
            title: '主机状态',
            dataIndex: 'state',
            ellipsis: true,
            key: 'state',
            render: (state) => {
                let config = {
                    1: "启用",
                    2: "未启用",
                }
                return config[state];
            }
        },
        {
            title: '可用性',
            dataIndex: 'usability',
            ellipsis: true,
            key: 'usability',
            render: (usability) => {
                let config = {
                    1: "可用",
                    2: "不可用",
                    3: "未知"
                }
                return config[usability];
            }
        },
        {
            title: '监控数据数量',
            dataIndex: 'countMonitor',
            ellipsis: true,
            key: 'countMonitor',
        },
        {
            title: '图形数量',
            dataIndex: 'graphicNum',
            ellipsis: true,
            key: 'graphicNum',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            ellipsis: true,
            key: 'createTime',
        },

    ];

    const availabilityTab = [
        {
            title: '全部',
            key: 0,
            icon: "allHost"
        },
        {
            title: '可用',
            key: 1,
            icon: "availableHost"
        },
        {
            title: '不可用',
            key: 2,
            icon: "noAvailableHost"
        }
    ];

    async function checkTabHost(value) {
        setHostState(value)
        switch (value) {
            case 0:
                value = null
                break
            case 1:
                value = 1
                break
            case 2:
                value = 2
                break
        }
        setSearchCondition({
            usability: value,
            name: ""
        });
        await findHostPage()
    }

    async function checkPage(page, pageSize) {
        setSearchCondition({
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            },
            monitorName: ""
        })

        await findInformationByMonitorId();
    }

    async function searchByName(event) {
        setSearchCondition({
            name: event.target.value
        })
        await findHostPage();
    }

    return (

        <Row className="monitoring">
            <Col sm={24} md={24} lg={{ span: 24 }} xl={{ span: "22", offset: "1" }} xxl={{ span: "18", offset: "3" }}>
                <div className="monitoring-alarm-table">
                    <div className="monitoring-table-title">主机监控</div>
                    <div className="monitoring-search">
                        <div className="monitoring-tabs">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`monitoring-tab ${hostState === item.key ? "active-tabs" : ""}`}
                                        key={item.key}
                                        onClick={() => checkTabHost(item.key)}
                                    >
                                        {item.title}
                                    </div>
                                })
                            }
                        </div>
                        <div>
                            <Input placeholder="根据主机名称进行查询"
                                   className="monitoring-input"
                                   onPressEnter={(event) => searchByName(event)}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="monitoring-alarm-table-list">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={monitoringList}
                            pagination={false}
                        />
                        <div className="details-pagination">
                            <Pagination
                                current={searchCondition.pageParam.currentPage}
                                pageSize={searchCondition.pageParam.pageSize}
                                showSizeChanger={true}
                                total={total}
                                onChange={(page, pageSize) => checkPage(page, pageSize)}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default withRouter(observer(Monitoring));