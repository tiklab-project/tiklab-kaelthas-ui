import {Button, Drawer, Form, Input, InputNumber, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/TriggerStore";
import TextArea from "antd/es/input/TextArea";
import {observer} from "mobx-react";

const {Option} = Select
const schemeList = [
    {
        name: "last(最近一个值)",
        value: 1
    },
    {
        name: "avg(平均值)",
        value: 2
    },
    {
        name: "percentage(百分比)",
        value: 3
    },
]
const UpdateTrigger = (props) => {

    const {isModalOpen, setIsModalOpen, form, rowData} = props;

    const {
        updateTrigger,
        findMonitorListById,
        getTriggerList,
        findTriggerExpressionAll,
        mediumList
    } = triggerStore;

    const [monitorData, setMonitorData] = useState([]);

    const [triggerExData, setTriggerExData] = useState([]);

    useEffect(async () => {
        const resData = await findMonitorListById({
            hostId: localStorage.getItem("hostId")
        });
        setMonitorData([...resData])

        const triggerExAll = await findTriggerExpressionAll();
        setTriggerExData([...triggerExAll])
    }, []);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        /*form.validateFields().then(async res => {
            await updateTrigger({
                id: rowData.id,
                expressionId: rowData.expressionId,
                name: res.name,
                monitorId: res.monitorId,
                triggerStatus: 1,
                operator: res.operator,
                numericalValue: res.numericalValue,
                mediumIds: res.mediumType,
                severityLevel: res.severityLevel,
                describe: res.describe,
                source: rowData.source,
                expression: res.expression,
                rangeTime: res.rangeTime,
                scheme: res.scheme,
                percentage: res.percentage,
                hostId: localStorage.getItem("hostId")
            });

            await getTriggerList();
        })*/

        setIsModalOpen(false);
    };

    const updateBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    hostId: localStorage.getItem("hostId"),
                    id: rowData.id,
                };
                obj[field] = values[field];

                await updateTrigger(obj);
                // message.success("修改成功")
                await getTriggerList();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    }

    function showText(exe) {
        console.log(exe)
    }

    return (
        <Drawer
            title="编辑触发器"
            placement="right"
            onClose={handleOk}
            open={isModalOpen}
            visible={isModalOpen}
            width={500}
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background: "transparent"}}
        >
            <Form
                name="updateMonitorForm"
                autoComplete="off"
                layout="vertical"
                form={form}
                labelAlign={"left"}
                preserve={false}
            >
                <Form.Item
                    label="触发器名称"
                    name="name"
                    rules={[{required: true, message: '请输入触发器名称!'}]}
                >
                    <Input onBlur={() => updateBlur('name')}/>
                </Form.Item>
                <Form.Item
                    label="触发器表达式"
                    name="expression"
                    rules={[{required: true, message: '触发器表达式!'}]}
                >
                    <TextArea onChange={() => updateBlur('expression')}/>
                </Form.Item>
                <Form.Item
                    label="请选择触发方案"
                    name="scheme"
                    rules={[{required: true, message: '请选择触发方案!'}]}
                >
                    <Select
                        placeholder="请选择触发方案"
                        allowClear
                        onBlur={() => updateBlur('scheme')}
                    >
                        {
                            schemeList.map(item => {
                                return <Option value={item.value} key={item.value}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="选择时间范畴"
                    name="rangeTime"
                    rules={[{required: true, message: '选择时间范畴(单位为分钟)!'}]}
                >
                    <InputNumber onChange={() => updateBlur('rangeTime')} placeholder="分钟" min={0}/>
                </Form.Item>
                <Form.Item
                    label="百分比达到多少进行触发"
                    name="percentage"
                    rules={[{required: true, message: '百分比达到多少进行触发'}]}
                >
                    <InputNumber  onChange={() => updateBlur('percentage')} placeholder="数据百分比" min={1} max={100}/>
                </Form.Item>
                <Form.Item
                    label="消息通知方案"
                    name="mediumIds"
                    rules={[{required: true, message: '请选择消息通知方案!'}]}
                >
                    <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        placeholder="请选择您的消息通知方案"
                        allowClear
                        onChange={() => updateBlur('mediumIds')}
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
                    rules={[{required: true, message: '严重性!'}]}
                >
                    <Select
                        placeholder="严重性选择"
                        allowClear
                        onBlur={() => updateBlur('severityLevel')}
                    >
                        <Option value={1} key={1}>灾难</Option>
                        <Option value={2} key={2}>严重</Option>
                        <Option value={3} key={3}>一般严重</Option>
                        <Option value={4} key={4}>告警</Option>
                        <Option value={5} key={5}>信息</Option>
                        <Option value={6} key={6}>未分类</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="问题描述"
                    name="describe"
                    rules={[{required: true, message: '问题描述!'}]}
                >
                    <Input onBlur={() => updateBlur('describe')}/>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default observer(UpdateTrigger);