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
                label="模板"
                name="monitorType"
                rules={[
                    {
                        required: true,
                        message: '请选择模板!',
                    },
                ]}
            >

                <Select
                    placeholder="请选择您的模板"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Option value="one">网络监控模板</Option>
                    <Option value="two">磁盘监控模板</Option>
                    <Option value="three">by http</Option>
                    <Option value="four">CPU监控模板</Option>
                    <Option value="five">内存监控模板</Option>
                </Select>

            </Form.Item>


        </Form>
    );
};
export default AddMonitorForm;