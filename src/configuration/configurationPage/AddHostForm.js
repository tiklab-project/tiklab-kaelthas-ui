import {Button, Checkbox, Form, Input, Select} from 'antd';
import React from 'react';

const AddHostForm = (props) => {

    /*const onFinish = (values) => {
        console.log('Success:', values);
    };*/
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const {dateList,setDataList,form} = props;

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
                label="主机名称"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '' +
                            '请输入主机名称!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            
            <Form.Item
                label="主机ip地址"
                name="ip"
                rules={[
                    {
                        required: true,
                        message: '请输入主机ip地址!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="主机群组"
                name="hosts"
                rules={[
                    {
                        required: false,
                        message: '请选择主机群组!',
                    },
                ]}
            >

                <Select
                    placeholder="请选择主机群组"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Option value="linux群组">linux群组</Option>
                    <Option value="server群组">server群组</Option>
                    <Option value="System Serve">System Serve</Option>
                    <Option value="Databases">Databases</Option>
                    <Option value="Windows Server">Windows Server</Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="添加模板"
                name="messageType"
                rules={[
                    {
                        required: false,
                        message: '请选择模板!',
                    },
                ]}
            >

                <Select
                    placeholder="请选择模板"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Option value="CPU监控模板">CPU监控模板</Option>
                    <Option value="内存监控模板">内存监控模板</Option>
                    <Option value="网络监控模板">网络监控模板</Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="是否开启"
                name="status"
                rules={[
                    {
                        required: false,
                        message: '是否开启!',
                    },
                ]}
            >

                <Select
                    placeholder="是否开启"
                    /*onChange={onGenderChange}*/
                    allowClear
                >
                    <Option value="开启">开启</Option>
                    <Option value="关闭">关闭</Option>
                </Select>

            </Form.Item>



        </Form>
    );
};
export default AddHostForm;