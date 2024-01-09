import {Space, Table, Tag} from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";


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