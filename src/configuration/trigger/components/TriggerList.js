import {Form, Input, Modal, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import UpdateTrigger from "./UpdateTrigger";
import triggerStore from "../store/TriggerStore";

const TriggerList = (props) => {

    const {getTriggerList,deleteTriggerById,setSearchCondition,monitorList,findMonitorListById} = triggerStore;

    const {dataList, setDataList} = props;

    const [rowData,setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        setSearchCondition({hostId:localStorage.getItem("hostId")})

        getTriggerList().then(res => {
            setDataList([...res.dataList])
        });

        return null;
    }, []);


    const deleteTrigger = async (id) => {

        await deleteTriggerById(id);
        const resData = await getTriggerList();
        setDataList([...resData.dataList])

    }

    const rowEcho = (record) => {

        setIsModalOpen(true);

        form.setFieldsValue(
            {
                id:record.id,
                triggerName:record.triggerName,
                isTemplate:record.isTemplate,
                triggerExpression:record.triggerExpression,
                messageType:record.messageType,
                alarmType:record.alarmType,
                description:record.description,
            }
        )

        setRowData({
            id:record.id,
            triggerName:record.triggerName,
            isTemplate:record.isTemplate,
            triggerExpression:record.triggerExpression,
            messageType:record.messageType,
            alarmType:record.alarmType,
            description:record.description,
        })
    };

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => rowEcho(record)}>{text}</span>,
        },
        {
            title: '触发表达式',
            dataIndex: 'expression',
            id: 'expression',
        }, {
            title: '消息通知方案',
            dataIndex: 'messageType',
            id: 'messageType',
        }, {
            title: '告警等级',
            dataIndex: 'severityLevel',
            id: 'severityLevel',
        }, {
            title: '描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteTrigger(record.id)}>删除</span>
                </Space>
            ),
        },

    ];

    return (
        <>
            <UpdateTrigger dataList={dataList} setDataList={setDataList} form={form}
                           rowData={rowData} setRowData={setRowData}
                           isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
            />
        </>

    )
};
export default TriggerList;