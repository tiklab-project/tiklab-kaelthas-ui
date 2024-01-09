import {Button, Drawer, Form, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MonitorListDetails";
import UpdateMonitor from "./UpdateMonitor";

const MonitorList = (props) => {

    const [open, setOpen] = useState(false);

    const {listData, setListData} = props;

    const [columnData,setColumnData] = useState({});

    const [form] = Form.useForm();



    const removeToList = (key) => {
        // console.log(listData)

        listData.forEach((item, index) => {
            if (item.key === key) {
                listData.splice(index, 1)
            }
        })

        setListData([...listData])

    }


    const [isModalOpen, setIsModalOpen] = useState(false);

    const drawerList = (record) => {
        /*setOpen(false);
        console.log('open',open)*/

        setIsModalOpen(true);


        form.setFieldsValue({
            key:record.key,
            dataRetentionPeriod:record.dataRetentionPeriod,
            monitorName:record.monitorName,
            monitorType:record.monitorType,
            isTemplate:record.isTemplate,
            interval:record.interval,
            monitorExpression:record.monitorExpression,
            status:record.status,
        })

        setColumnData({
            key:record.key,
            dataRetentionPeriod:record.dataRetentionPeriod,
            monitorName:record.monitorName,
            monitorType:record.monitorType,
            isTemplate:record.isTemplate,
            interval:record.interval,
            monitorExpression:record.monitorExpression,
            status:record.status,
        })

    };
    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'monitorName',
            key: 'monitorName',
            render: (text,record) => <span style={{cursor: "pointer"}} onClick={() => drawerList(record)}>{text}</span>,
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

    return (
        <>
            {/*<MonitorListDetails open={open} setOpen={setOpen}/>*/}
            <UpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                           columnData={columnData} setColumnData={setColumnData} form={form}
                           listData={listData} setListData={setListData}
            />
            <Table columns={columns} dataSource={listData}/>
        </>

    )
};

export default withRouter(MonitorList);