import {Form, Input, Modal, Select, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import UpdateTrigger from "./UpdateTrigger";
import triggerStore from "../store/TriggerStore";

const TriggerList = (props) => {

    const {getTriggerList,deleteTriggerById} = triggerStore;

    const {dataList, setDataList} = props;

    const [rowData,setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        getTriggerList().then(res => {
            setDataList([...res])
        });

        return null;
    }, []);


    const deleteTrigger = async (id) => {

        /*dataList.forEach((item, index) => {
            if (id === item.id) {
                dataList.splice(index, 1)
            }
        })*/

        const resData = await deleteTriggerById(id);

        setDataList([...resData])
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
            dataIndex: 'triggerName',
            id: 'triggerName',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => rowEcho(record)}>{text}</span>,
        },
        {
            title: '是否模板创建',
            dataIndex: 'isTemplate',
            id: 'isTemplate',
        },
        {
            title: '触发表达式',
            dataIndex: 'triggerExpression',
            id: 'triggerExpression',
        }, {
            title: '消息通知方案',
            dataIndex: 'messageType',
            id: 'messageType',
        }, {
            title: '告警类型',
            dataIndex: 'alarmType',
            id: 'alarmType',
        }, {
            title: '描述',
            dataIndex: 'description',
            id: 'description',
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