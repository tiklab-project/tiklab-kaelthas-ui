import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import triggerStore from "../store/TriggerStore";

const UpdateTrigger = (props) => {
    const {dataList, setDataList} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {rowData,setRowData} = props;

    const {form} = props;

    const {updateTriggerById} = triggerStore;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {

        setIsModalOpen(false);

        form.validateFields().then(async res => {

            const resData = await updateTriggerById({
                id: rowData.id,
                triggerName: res.triggerName,
                isTemplate: '否',
                triggerExpression: res.triggerExpression,
                messageType: res.messageType,
                alarmType: res.alarmType,
                description: res.description,
            });

            setDataList([...resData])
        })


    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="编辑触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
            >
                <div className="addMonitorForm">
                    <div>

                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            // onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="触发器名称"
                                name="triggerName"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入监控项名称!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="监控指标"
                                name="triggerExpression"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择监控项指标!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择您的监控类型"
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value="system.cpu(internal,time)">system.cpu(internal,time)</Option>
                                    <Option value="system.cpu(process,time)">system.cpu(process,time)</Option>
                                    <Option value="system.cpu(process,c)">system.cpu(process,c)</Option>
                                    <Option value="system.cpu(idle,c)">system.cpu(idle,c)</Option>
                                    <Option value="system.cpu(IO,c)">system.cpu(IO,c)</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="消息通知方案"
                                name="messageType"
                                rules={[
                                    {
                                        required: false,
                                        message: '请选择监控项指标!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择您的监控类型"
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value="方案1:电子邮件">方案1:电子邮件</Option>
                                    <Option value="方案2:微信公众号">方案2:微信公众号</Option>
                                    <Option value="方案3:钉钉">方案3:钉钉</Option>
                                    <Option value="方案4:短信">方案4:短信</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="严重性"
                                name="alarmType"
                                rules={[
                                    {
                                        required: false,
                                        message: '严重性!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="严重性选择"
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value="灾难">灾难</Option>
                                    <Option value="严重">严重</Option>
                                    <Option value="一般严重">一般严重</Option>
                                    <Option value="告警">告警</Option>
                                    <Option value="信息">信息</Option>
                                    <Option value="未分类">未分类</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="问题描述"
                                name="description"
                                rules={[
                                    {
                                        required: false,
                                        message: '问题描述!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateTrigger;