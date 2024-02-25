import React, {useEffect, useState} from 'react';
import {Form, Table} from "antd";
import "./MonitorIng.scss"
import monitoringStore from "../store/MonitoringStore";
import {withRouter} from "react-router-dom";
const Monitoring = (props) => {

    const [listData, setListData] = useState([]);

    const {findHostPage} = monitoringStore;

    const host = (record) => {
        console.log("路由跳转到监控项详情中")
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
        localStorage.setItem('hostIdForMonitoring', record.id);
    }

    useEffect(async () => {

        const resData = await findHostPage();
        setListData([...resData])

    }, []);


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '主机状态',
            dataIndex: 'state',
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
        /*{
            title: '模板数量',
            dataIndex: 'templateNum',
            key: 'templateNum',
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            key: 'monitorNum',
        },*/
        {
            title: '监控数据数量',
            dataIndex: 'countMonitor',
            key: 'countMonitor',
        },
        /*{
            title: '图形数量',
            dataIndex: 'graphicNum',
            key: 'graphicNum',
        },*/
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    return (

        <div className="monitoring">
            <div className="monitoring-body">
                <div className="monitoring-alarm-table">
                    <div className="monitoring-table-title">主机列表</div>
                    <div className="monitoring-alarm-table-list">
                        <Table rowKey={record => record.id} columns={columns} dataSource={listData}/>
                    </div>
                </div>
                <div className="monitoring-alarm-table">
                    <div className="monitoring-table-title">监控信息</div>
                    <div className="monitoring-alarm-table-list">
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withRouter(Monitoring);