import { Space, Table, Tag } from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";
import AddTrigger from "./AddTrigger";



const data = [
    {
        key: '1',
        triggerName: '内核占用CPU百分比超过数值',
        isTemplate: '否',
        triggerExpression:'system.cpu(internal,time)>80%',
        messageType:'短信发送',
        alarmType: '一般严重',
        description:'对内核占用CPU百分比超过80%进行告警',
    },
    {
        key: '2',
        triggerName: '空闲CPU时间百分比低于正常值',
        isTemplate: '否',
        triggerExpression:'system.cpu(idle,c)<10%',
        messageType:'使用微信公众号',
        alarmType: '告警',
        description:'空闲CPU时间百分比低于10%进行告警',
    },
];


const TriggerList = (props) => {

    const showModal = (itemData) => {
        this.setState({
            visible: true,
            itemData
        });
    }

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'triggerName',
            key: 'triggerName',
            render: (text) => <span style={{cursor:"pointer"}} onClick={showModal}>{text}</span>,
        },
        {
            title: '是否模板创建',
            dataIndex: 'isTemplate',
            key: 'isTemplate',
        },
        {
            title: '触发表达式',
            dataIndex: 'triggerExpression',
            key: 'triggerExpression',
        },{
            title: '消息通知方案',
            dataIndex: 'messageType',
            key: 'messageType',
        },{
            title: '告警类型',
            dataIndex: 'alarmType',
            key: 'alarmType',
        },{
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>删除</a>
                </Space>
            ),
        },

    ];

    return <Table columns={columns} dataSource={data} />
} ;
export default withRouter(TriggerList);