import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddMonitorForm = () => {
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
                label="监控项名称"
                name="monitorName"
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
                label="数据保留时间"
                name="dataRetentionPeriod"
                rules={[
                    {
                        required: true,
                        message: '请输入数据保留时间!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="更新间隔"
                name="updateInterval"
                rules={[
                    {
                        required: true,
                        message: '请输入更新间隔!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

        </Form>
    );
};
export default AddMonitorForm;