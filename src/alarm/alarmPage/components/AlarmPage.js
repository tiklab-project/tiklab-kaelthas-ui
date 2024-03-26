import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Input, Table, Tooltip} from "antd";
import alarmPageStore from "../store/AlarmPageStore";

const AlarmPage = () => {

    const host = (record) => {
        console.log("路由跳转到监控项详情中")
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
        localStorage.setItem('hostId', record.id);
        localStorage.setItem("hostName", record.name)
        localStorage.setItem("ip", record.ip)
    }

    const {alarmPage,findAlarmPage} = alarmPageStore;

    useEffect(async () => {
        await findAlarmPage();
    }, []);


    const columns = [
        {
            title: '名称',
            dataIndex: 'hostName',
            key: 'hostName',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '告警时间',
            dataIndex: 'alarmTime',
            key: 'alarmTime',
        },
        {
            title: '告警类型',
            dataIndex: 'alarmType',
            key: 'alarmType',
        },
        {
            title: '触发器名称',
            dataIndex: 'triggerName',
            key: 'triggerName',
        },
        {
            title: '问题',
            dataIndex: 'problem',
            key: 'problem',
        },
        {
            title: '持续时间',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '是否确认',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let config = {
                    1: "已确认",
                    2: "未确认",
                }
                return config[status];
            },
        },
    ];

    return (
        <div className="alarm-box">
            <div className="alarm-box-page">
                <div className="alarm-box-body">
                    <div className="alarm-box-title">
                        <div className="alarm-box-title-text">
                            告警模块
                        </div>
                    </div>
                    <div className="alarm-box-line">
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
                    </div>
                    <div className="alarm-box-search">
                        <div>

                        </div>
                        <div>
                            <Input placeholder="请输入主机名称"/>
                        </div>
                    </div>
                    <div className="alarm-box-table">
                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={alarmPage}
                               pagination={false}
                               scroll={{
                                   x: 300,
                                   y: 'max-content'
                               }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AlarmPage);