import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddTriggerForm = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const {form} = props;


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
            form={form}
        >
            <Form.Item
                label="图表名称"
                name="graphicsName"
                rules={[
                    {
                        required: true,
                        message: '' +
                            '请输入图表名称!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="图表宽度"
                name="width"
                rules={[
                    {
                        required: true,
                        message: '' +
                            '请输入图表宽度!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="图表高度"
                name="height"
                rules={[
                    {
                        required: true,
                        message: '' +
                            '请输入图表高度!',
                    },
                ]}
            >
                <Input/>
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
                    <Option value="system.cpu(internal,time)">system.cpu(internal,time)</Option>
                    <Option value="system.cpu(process,time)">system.cpu(process,time)</Option>
                    <Option value="system.cpu(process,c)">system.cpu(process,c)</Option>
                    <Option value="system.cpu(idle,c)">system.cpu(idle,c)</Option>
                    <Option value="system.cpu(IO,c)">system.cpu(IO,c)</Option>
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
    );
};
export default AddTriggerForm;