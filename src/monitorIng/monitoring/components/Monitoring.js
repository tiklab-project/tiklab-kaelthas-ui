import React, {useEffect, useRef} from 'react';
import {Col, Input, Pagination, Row, Table, Tag} from "antd";
import "./MonitorIng.scss"
import monitoringStore from "../store/MonitoringStore";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import monitorLayoutStore from "../../monitoringDetails/store/MonitorLayoutStore";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";

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
        monitoringList,
    } = monitoringStore;

    const {setNowTimeInterval,setSearchNull,getDateTime} = monitorLayoutStore;

    const {setNullConditionByMonitoring} = alarmPageStore;

    const host = (record) => {

        setNowTimeInterval([])
        setSearchNull({
            hostId: record.id,
            beginTime: getDateTime()[0],
            endTime: getDateTime()[1]
        })
        localStorage.setItem('hostIdForMonitoring', record.id);
        localStorage.setItem("hostName", record.name)
        localStorage.setItem("ip", record.ip)
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
    }

    useEffect(async () => {
        setNullCondition();
        await findHostPage();
    }, []);


    async function hrefAlarmPage(record) {
        setNullConditionByMonitoring({
            hostName: record.name,
            status: 2
        })

        // await findAlarmPage();

        sessionStorage.setItem("menuKey", "alarm")
        props.history.push(`/alarm`);
    }

    function hrefState(record) {
        setNowTimeInterval([])
        console.log("路由跳转到监控项详情中")
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
        localStorage.setItem('hostIdForMonitoring', record.id);
        localStorage.setItem("hostName", record.name)
        localStorage.setItem("ip", record.ip)
    }

    function converType(record) {

        if (record.usability === 2) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1){
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message})</span>
                </div>
            }
            if (record.alarmNum > 1){
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message}...)</span>
                </div>
            }
        }

        if (record.usability === 1) {
            return <Tag color={"blue"}>正常</Tag>
        }


    }

    function conversionColor(text) {
        if (text === 0 || text === null) {
            return <Tag color={"blue"}>{0}</Tag>
        } else {
            return <Tag color={"red"}>{text}</Tag>
        }
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            ellipsis: true,
            key: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
        },
        {
            title: '状态',
            dataIndex: 'usability',
            ellipsis: true,
            key: 'usability',
            render: (usability, record) => <span style={{cursor: "pointer"}}
                                                 onClick={() => hrefState(record)}>{converType(record)}</span>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefAlarmPage(record)}>{conversionColor(text)}</div>
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
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="monitoring-alarm-table">
                    <div className="monitoring-table-title">监控</div>
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
                            <Input placeholder="主机名称"
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