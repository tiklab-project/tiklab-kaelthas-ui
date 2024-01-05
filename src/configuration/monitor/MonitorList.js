import {Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import AddMonitorForm from "./AddMonitorForm";


const MonitorList = (props) => {

    const {listData, setListData} = props;

    const removeToList = (key) => {
        // console.log(listData)

        listData.forEach((item,index) => {
            if (item.key === key) {
                listData.splice(index,1)
            }
        })
        console.log('删除成功',listData)
        setListData([...listData])
        return listData;
    }




    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'monitorName',
            key: 'monitorName',
            render: (text) => <span style={{cursor: "pointer"}} onClick={AddMonitorForm}>{text}</span>,
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
        }, {
            title: '监控表达式',
            dataIndex: 'monitorExpression',
            key: 'monitorExpression',
        }, {
            title: '间隔时间',
            dataIndex: 'interval',
            key: 'interval',
        }, {
            title: '数据保留时间',
            dataIndex: 'dataRetentionPeriod',
            key: 'dataRetentionPeriod',
        }, {
            title: '监控项状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '监控失败提示信息',
            dataIndex: 'failureInformation',
            key: 'failureInformation',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => removeToList(record.key)}>删除</span>
                </Space>
            ),
        },

    ];

    /*console.log("columns:", columns)
    columns.forEach((item, index) => {
        if (1 === index) {
            columns.splice(index, 1);
        }
    })

    console.log(columns)*/

    return <Table columns={columns} dataSource={listData}/>
};
export default withRouter(MonitorList);