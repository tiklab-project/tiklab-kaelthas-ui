import {Button, Form, Input, InputNumber, message, Modal, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/InTriggerStore";
import inTriggerStore from "../store/InTriggerStore";

const {Option} = Select
const schemeList = [
    {name: "last(最近一个值)", value: 1},
    {name: "avg(平均值)", value: 2},
    {name: "percentage(百分比)", value: 3}
]

const alarmGrade = [
    {name: "灾难", value: 1},
    {name: "严重", value: 2},
    {name: "一般严重", value: 3},
    {name: "告警", value: 4},
    {name: "信息", value: 5},
    {name: "未分类", value: 6}
];


const InAddTrigger = () => {

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        createTrigger,
        findTriggerPage,
        mediumList
    } = inTriggerStore;

    //定义两个状态,分别表示时间范畴和百分比输入框
    const [timeStatus, setTimeStatus] = useState(true);

    const [percentageStatus, setPercentageStatus] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const values = await form.validateFields();

        values.internetId = localStorage.getItem("internetId");
        values.status = 1;
        values.source = 1;

        const res = await createTrigger(values);

        if (res?.data !== null) {
            message.success("添加成功!")
        } else {
            message.warn("添加失败!")
        }
        await findTriggerPage();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function updateStatus(value) {
        switch (value) {
            case 1:
                setTimeStatus(false)
                setPercentageStatus(false)
                break
            case 2:
                setTimeStatus(true)
                setPercentageStatus(false)
                break
            case 3:
                setTimeStatus(true)
                setPercentageStatus(true)
                break
        }
    }

    return (
        <>
            <div onClick={showModal}>
                新建触发器
            </div>
            <Modal
                destroyOnClose={true}
                title="新建触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
                width={600}
                centered={true}
                bodyStyle={{maxHeight: '400px', overflowY: 'auto'}}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    preserve={false}
                >
                    <Form.Item
                        label="触发器名称"
                        name="name"
                        rules={[{required: true, message: '触发器名称!'}]}
                    >
                        <Input allowClear={true} placeholder="触发器名称"/>
                    </Form.Item>
                    <Form.Item
                        label="触发器表达式"
                        name="expression"
                        rules={[{required: true, message: '触发器表达式!'}]}
                    >
                        <Input.TextArea placeholder="触发器表达式"/>
                    </Form.Item>
                    <Form.Item
                        label="请选择触发方案"
                        name="scheme"
                        rules={[{required: true, message: '请选择触发方案!'}]}
                    >
                        <Select
                            placeholder="触发方案"
                            allowClear
                            onSelect={updateStatus}
                        >
                            {
                                schemeList.map(item => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    {
                        timeStatus ? <Form.Item
                                label="选择时间范畴"
                                name="rangeTime"
                                rules={[{required: true, message: '选择时间范畴(单位为分钟)!'}]}
                            >
                                <InputNumber placeholder="分钟" min={0}/>
                            </Form.Item>
                            :
                            <></>
                    }
                    {
                        percentageStatus ? <Form.Item
                                label="百分比达到多少进行触发"
                                name="percentage"
                                rules={[{required: true, message: '百分比达到多少进行触发'}]}
                            >
                                <InputNumber placeholder="数据百分比" min={1} max={100}/>
                            </Form.Item>
                            :
                            <></>
                    }
                    <Form.Item
                        label="消息通知方案"
                        name="mediumIds"
                        rules={[
                            {
                                required: true,
                                message: '请选择消息通知方案!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            maxTagCount="responsive"
                            placeholder="请选择您的消息通知方案"
                            allowClear
                        >
                            {
                                mediumList && mediumList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="严重性"
                        name="severityLevel"
                        rules={[
                            {
                                required: true,
                                message: '严重性!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="严重性选择"
                            allowClear
                        >
                            {
                                alarmGrade.map(item => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="问题描述"
                        name="describe"
                        rules={[
                            {
                                required: true,
                                message: '问题描述!',
                            },
                        ]}
                    >
                        <Input placeholder="问题描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default InAddTrigger;