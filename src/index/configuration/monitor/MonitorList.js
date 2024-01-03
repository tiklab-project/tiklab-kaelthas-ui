import { Space, Table, Tag } from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";



const data = [
    {
        key: '1',
        monitorName: '内核占用CPU时间百分比',
        isTemplate: '否',
        monitorType: 'CPU信息监控',
        monitorExpression:'system.cpu(internal,time)',
        interval:'10s',
        dataRetentionPeriod:'36d',
        status:'启动',
        failureInformation:'监控项无法识别'
    },
    {
        key: '2',
        monitorName: '用户态进程占用CPU时间百分比',
        isTemplate: '否',
        monitorType: 'CPU信息监控',
        monitorExpression:'system.cpu(process,time)',
        interval:'20s',
        dataRetentionPeriod:'40d',
        status:'启动',
        failureInformation:'不存在这个监控项'
    },
    {
        key: '3',
        monitorName: '改变过优先级的进程占用CPU的百分比',
        isTemplate: '否',
        monitorType: 'CPU信息监控',
        monitorExpression:'system.cpu(process,c)',
        interval:'20s',
        dataRetentionPeriod:'50d',
        status:'启动',
        failureInformation:'监控项无法识别'
    },
    {
        key: '4',
        monitorName: '空闲CPU时间百分比',
        isTemplate: '否',
        monitorType: 'CPU信息监控',
        monitorExpression:'system.cpu(idle,c)',
        interval:'30s',
        dataRetentionPeriod:'30d',
        status:'启动',
        failureInformation:'监控成功'
    },
];
const MonitorList = (props) => {
    const host = () =>{
        props.history.push("/Configuration/Host")
    }
    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'monitorName',
            key: 'monitorName',
            render: (text) => <span style={{cursor:"pointer"}} onClick={host}>{text}</span>,
        },
        {
            title: '是否模板创建',
            dataIndex: 'isTemplate',
            key: 'isTemplate',
        },
        {
            title: '监控项类别',
            dataIndex: 'monitorType',
            key: 'monitorType',
        },{
            title: '监控表达式',
            dataIndex: 'monitorExpression',
            key: 'monitorExpression',
        },{
            title: '间隔时间',
            dataIndex: 'interval',
            key: 'interval',
        },{
            title: '数据保留时间',
            dataIndex: 'dataRetentionPeriod',
            key: 'dataRetentionPeriod',
        },{
            title: '监控项状态',
            dataIndex: 'status',
            key: 'status',
        },{
            title: '监控失败提示信息',
            dataIndex: 'failureInformation',
            key: 'failureInformation',
        },

    ];

    return <Table columns={columns} dataSource={data} />
} ;
export default withRouter(MonitorList);