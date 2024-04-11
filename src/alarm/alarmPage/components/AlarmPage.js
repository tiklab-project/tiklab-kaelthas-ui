import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Button, Input, Table} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

const AlarmPage = (props) => {


    const {alarmPage, findAlarmPage, updateAlarmPage, setSearchCondition, total,setNullCondition,searchCondition} = alarmPageStore;

    useEffect(async () => {
        setNullCondition();
        await findAlarmPage();
    }, []);

    function isConfirm(status) {
        {
            let config = {
                1: "已解决",
                2: "问题",
            }
            return config[status];
        }
    }

    async function updateAlarm(record) {
        console.log(record)
        console.log(record.hostName)
        console.log(record.id)
        await updateAlarmPage({
            id: record.id,
            state: 1
        });
    }

    function jumpToMonitor(record) {
        localStorage.setItem("hostIdForMonitoring", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "monitoring")
        props.history.push(`/monitoringList/${record.hostId}/monitoringDetails`)
    }

    const columns = [
        {
            title: '主机名称',
            dataIndex: 'hostName',
            key: 'hostName',
            render: (hostName, record) => <div onClick={() => jumpToMonitor(record)}
                                               style={{cursor: "pointer"}}>{hostName}</div>
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
            key: 'triggerName',
        },
        /*{
            title: '消息方式',
            dataIndex: 'mediumType',
            key: 'mediumType',
            render: (severityLevel) => {
                let config = {
                    1: "电子邮件",
                    2: "微信公众号",
                    3: "钉钉",
                    4: "短信",
                }
                return config[severityLevel];
            }
        },*/
        {
            title: '告警类型',
            dataIndex: 'severityLevel',
            key: 'severityLevel',
            render: (severityLevel) => {
                let config = {
                    1: "灾难",
                    2: "严重",
                    3: "一般严重",
                    4: "告警",
                    5: "信息",
                    6: "未分类",
                }
                return config[severityLevel];
            }
        },
        {
            title: '告警时间',
            dataIndex: 'alertTime',
            key: 'alertTime',
        },
        {
            title: '解决时间',
            dataIndex: 'resolutionTime',
            key: 'resolutionTime',
        },
        {
            title: '持续时间',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => <div onClick={() => updateAlarm(record)}
                                             style={{cursor: "pointer"}}>{isConfirm(status)}</div>
        },
    ];

    async function checkHostName(e) {
        setSearchCondition({
            hostName: e.target.value
        })
        await findAlarmPage();
    }

    async function checkPage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })
        await findAlarmPage();
    }

    return (
        <div className="alarm-box">
            <div className="alarm-box-body">
                <div className="alarm-box-title">
                    <div className="alarm-box-title-text">
                        主机告警
                    </div>
                </div>
                {/*<div className="alarm-box-line">
                        <div className="alarm-box-div">
                            <span>告警详情</span>
                            <div className="alarm-box-div-details">

                            </div>
                        </div>
                        <div className="alarm-box-div">
                            <span>告警数量图表展示</span>
                            <div className="alarm-box-div-details">

                            </div>
                        </div>
                    </div>*/}
                <div className="alarm-box-search">
                    <div>

                    </div>
                    <div>
                        <Input
                            placeholder="请输入主机名称"
                            onPressEnter={(e) => checkHostName(e)}
                            prefix={<SearchOutlined />}
                        />
                    </div>
                </div>
                <div className="alarm-box-table">
                    <Table rowKey={record => record.id}
                           columns={columns}
                           className="custom-table"
                           dataSource={alarmPage}
                           onChange={checkPage}
                           scroll={{
                               x: 400,
                           }}
                           pagination={{
                               position: ["bottomCenter"],
                               total: total,
                               showSizeChanger: true,
                               pageSize: searchCondition.pageParam.pageSize,
                               current: searchCondition.pageParam.currentPage,
                           }}
                    />
                </div>
            </div>
        </div>
    );
};

export default withRouter(observer(AlarmPage));