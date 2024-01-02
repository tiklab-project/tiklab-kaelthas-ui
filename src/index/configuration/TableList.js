import { Space, Table, Tag } from 'antd';
import React from 'react';



const data = [
    {
        key: '1',
        name: 'host01',
        ip:'127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
    {
        key: '2',
        name: 'host02',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
    {
        key: '3',
        name: 'host03',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
    {
        key: '4',
        name: 'host04',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
    {
        key: '5',
        name: 'host05',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
    {
        key: '6',
        name: 'host06',
        status: '已启用',
        availability: '可用',
        templateCount:1,
        monitorCount:3,
        triggerCount:2,
        graphics:1,
        createTime:'1小时前'
    },
];
const App = (props) => {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a onClick={aaa}>{text}</a>,
        },
        {
            title: '主机状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '可用性',
            dataIndex: 'availability',
            key: 'availability',
        },{
            title: '模板数量',
            dataIndex: 'templateCount',
            key: 'templateCount',
        },{
            title: '监控项数量',
            dataIndex: 'monitorCount',
            key: 'monitorCount',
        },{
            title: '触发器数量',
            dataIndex: 'triggerCount',
            key: 'triggerCount',
        },{
            title: '图形',
            dataIndex: 'graphics',
            key: 'graphics',
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];
    const aaa = () =>{
        props.history.push("/Configuration/Host")
    }
    return <Table columns={columns} dataSource={data} />
} ;
export default  App;