import { Space, Table, Tag } from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";



const data = [
    {
        key: '1',
        name: 'host1创建监控项 主机已用内存',
        time: '2023/12/15  18：43',
    },
    {
        key: '2',
        name: 'host1创建触发器 CPU空闲利用率超过80%的处理',
        time: '2023/12/15  15：43',
    },
    {
        key: '3',
        name: 'host1创建监控项 主机已用内存',
        time: '2023/12/14    9：27',
    },
    {
        key: '4',
        name: 'host1创建监控项 监控CPU空间利用率',
        time: '2023/12/13  13：22',
    },

];
const HostDetailsList = () => {
    const columns = [
        {
            title: '动态名称',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <span style={{cursor:"pointer"}} onClick={host}>{text}</span>,
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },

    ];

    return <Table columns={columns} dataSource={data} />
} ;
export default withRouter(HostDetailsList);