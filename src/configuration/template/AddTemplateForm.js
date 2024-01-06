import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddMonitorForm = (props) => {
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
                label="模板名称"
                name="templateName"
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
                    <Option value="网络监控模板">网络监控模板</Option>
                    <Option value="磁盘监控模板">磁盘监控模板</Option>
                    <Option value="by http">by http</Option>
                    <Option value="CPU监控模板">CPU监控模板</Option>
                    <Option value="内存监控模板">内存监控模板</Option>
                </Select>

            </Form.Item>


        </Form>
    );
};
export default AddMonitorForm;