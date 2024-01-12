import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddMonitorForm = (props) => {

    const {setListData, listData, form} = props;

    // const onFinish = (values) => {
    //
    // };
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
            // onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
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
                label="监控类型"
                name="monitorType"
                rules={[
                    {
                        required: true,
                        message: '请选择监控项类型!',
                    },
                ]}
            >

                <Select
                    placeholder="请选择您的监控类型"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Select.Option value="CPU信息监控">CPU信息监控</Select.Option>
                    <Select.Option value="内存信息监控">内存信息监控</Select.Option>
                    <Select.Option value="磁盘信息监控">磁盘信息监控</Select.Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="监控指标"
                name="monitorExpression"
                rules={[
                    {
                        required: true,
                        message: '请选择监控项指标!',
                    },
                ]}
            >

                <Select
                    placeholder="请选择监控项指标"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Select.Option value="system.cpu(internal,time)">system.cpu(internal,time)</Select.Option>
                    <Select.Option value="system.cpu(process,time)">system.cpu(process,time)</Select.Option>
                    <Select.Option value="system.cpu(process,c)">system.cpu(process,c)</Select.Option>
                    <Select.Option value="system.cpu(idle,c)">system.cpu(idle,c)</Select.Option>
                    <Select.Option value="system.cpu(IO,c)">system.cpu(IO,c)</Select.Option>
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
                name="interval"
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