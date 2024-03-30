import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Input, Table, Tooltip} from "antd";
import alarmPageStore from "../store/AlarmPageStore";

const AlarmPage = () => {


    const {alarmPage, findAlarmPage} = alarmPageStore;

    useEffect(async () => {
        await findAlarmPage();
    }, []);



    function isConfirm(status) {
        {
            let config = {
                1: "已确认",
                2: "未确认",
            }
            return config[status];
        }
    }

    function updateAlarm(record) {
        console.log(record)
        console.log(record.hostName)
        console.log(record.id)
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'hostName',
            key: 'hostName',
        },
        {
            title: '告警时间',
            dataIndex: 'gatherTime',
            key: 'gatherTime',
        },
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
            title: '问题',
            dataIndex: 'triggerName',
            key: 'triggerName',
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
            render: (status, record) => <div onClick={() => updateAlarm(record)}
                                             style={{cursor: "pointer"}}>{isConfirm(status)}</div>
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