import {Space, Table, Tag} from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";

const data = [
    {
        key: '1',
        name: 'host01',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
    {
        key: '2',
        name: 'host02',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
    {
        key: '3',
        name: 'host03',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
    {
        key: '4',
        name: 'host04',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
    {
        key: '5',
        name: 'host05',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
    {
        key: '6',
        name: 'host06',
        ip: '127.0.0.1',
        status: '已启用',
        availability: '可用',
        templateCount: 1,
        monitorCount: 3,
        triggerCount: 2,
        graphics: 1,
        createTime: '1小时前'
    },
];


const TableList = (props) => {

    const {dataList, setDataList} = props;

    const host = () =>{
        props.history.push("/Configuration/Host")
    }


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{cursor: "pointer"}} onClick={host}>{text}</span>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
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
        }, {
            title: '模板数量',
            dataIndex: 'templateCount',
            key: 'templateCount',
        }, {
            title: '监控项数量',
            dataIndex: 'monitorCount',
            key: 'monitorCount',
        }, {
            title: '触发器数量',
            dataIndex: 'triggerCount',
            key: 'triggerCount',
        }, {
            title: '图形',
            dataIndex: 'graphics',
            key: 'graphics',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    return <Table columns={columns} dataSource={dataList}/>
};
export default withRouter(TableList);