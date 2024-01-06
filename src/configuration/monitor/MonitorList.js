import {Button, Drawer, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import  "./MonitorListDetails";
import MonitorListDetails from "./MonitorListDetails";

const MonitorList = (props) => {

    const [open, setOpen] = useState(false);

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


    const drawerList = () => {
        console.log('drawerList')
        setOpen(true);
        return(
            <MonitorListDetails open={open} setOPen={setOpen}/>
        )
    };
    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'monitorName',
            key: 'monitorName',
            render: (text) => <span style={{cursor: "pointer"}} onClick={()=>drawerList()}>{text}</span>,
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

    return <Table columns={columns} dataSource={listData}/>
};

export default withRouter(MonitorList);