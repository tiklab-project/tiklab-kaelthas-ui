import {Button, Drawer, Form, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MonitorListDetails";
import UpdateMonitor from "./UpdateMonitor";
import monitorStore from "../store/MonitorStore";

const MonitorList = (props) => {

    const {deleteMonitorById, findMonitorCondition} = monitorStore;

    const {listData, setListData} = props;

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const removeToList = async (id) => {

        await deleteMonitorById(id);

        const resData = await findMonitorCondition();

        console.log(resData)

        setListData([...resData.dataList])


    }


    const drawerList = (record) => {
        /*setOpen(false);
        console.log('open',open)*/

        setIsModalOpen(true);


        form.setFieldsValue({
            id: record.id,
            dataRetentionPeriod: record.dataRetentionPeriod,
            monitorName: record.monitorName,
            monitorType: record.monitorType,
            isTemplate: record.isTemplate,
            interval: record.interval,
            monitorExpression: record.monitorExpression,
            status: record.status,
        })

        setColumnData({
            id: record.id,
            dataRetentionPeriod: record.dataRetentionPeriod,
            monitorName: record.monitorName,
            monitorType: record.monitorType,
            isTemplate: record.isTemplate,
            interval: record.interval,
            monitorExpression: record.monitorExpression,
            status: record.status,
        })

    };

    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => drawerList(record)}>{text}</span>,
        },
        {
            title: '监控项类别',
            dataIndex: 'monitorType',
            id: 'monitorType',
        },
        {
            title: '监控表达式',
            dataIndex: 'expression',
            id: 'expression',
        },
        {
            title: '间隔时间',
            dataIndex: 'intervalTime',
            id: 'intervalTime',
        },
        {
            title: '数据保留时间',
            dataIndex: 'dataRetentionTime',
            id: 'dataRetentionTime',
        },
        {
            title: '监控项状态',
            dataIndex: 'monitorStatus',
            id: 'monitorStatus',
        },
        {
            title: '监控失败提示信息',
            dataIndex: 'information',
            id: 'information',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => removeToList(record.id)}>删除</span>
                </Space>
            ),
        },

    ];

    return (
        <>
            <UpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                           columnData={columnData} setColumnData={setColumnData} form={form}
                           listData={listData} setListData={setListData}
            />
            <Table rowKey={record => record.id} columns={columns} dataSource={listData}/>
        </>

    )
};

export default withRouter(MonitorList);