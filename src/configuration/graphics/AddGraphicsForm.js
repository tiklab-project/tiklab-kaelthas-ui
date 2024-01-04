import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddTriggerForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                name="monitorType"
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
                    <Option value="male">system.cpu(internal,time)</Option>
                    <Option value="female">system.cpu(process,time)</Option>
                    <Option value="other">system.cpu(process,c)</Option>
                    <Option value="four">system.cpu(idle,c)</Option>
                    <Option value="five">system.cpu(IO,c)</Option>
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
                    <Option value="email">方案1:电子邮件</Option>
                    <Option value="weChatPublicAccount">方案2:微信公众号</Option>
                    <Option value="dingding">方案3:钉钉</Option>
                    <Option value="sms">方案4:短信</Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="严重性"
                name="messageType"
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
                    <Option value="disaster">灾难</Option>
                    <Option value="severe">严重</Option>
                    <Option value="generallySevere">一般严重</Option>
                    <Option value="Alarm">告警</Option>
                    <Option value="Information">信息</Option>
                    <Option value="Uncategorized">未分类</Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="问题描述"
                name="dataRetentionPeriod"
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
    );
};
export default AddTriggerForm;