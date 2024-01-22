import React, {useState} from 'react';
import {withRouter} from "react-router";
import {Button, Form, Input, Modal, Select} from "antd";
import templateSettingStore from "../store/TemplateSettingStore";

const TemplateSettingAdd = (props) => {


    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {createTemplate} = templateSettingStore;

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {

        form.validateFields().then(res => {
            createTemplate({
                name:res.name,
                isOpen:res.isOpen,
                describe:res.describe
            })

        })

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('模板添加成功')
    }

    const onSecondCityChange = (value) => {
        console.log(value)
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建模板
            </Button>
            <Modal title="新建模板" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定" afterClose={addDataForMonitor}>
                <div className="TemplateSettingAddForm">
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
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="模板名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入模板名称!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                label="是否开启"
                                name="isOpen"
                                rules={[
                                    {
                                        required: true,
                                        message: '模板是否开启!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择模板是否开启"
                                    allowClear
                                    onChange={onSecondCityChange}
                                >

                                    <Option value={1}>{"开启"}</Option>
                                    <Option value={0}>{"关闭"}</Option>

                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="描述"
                                name="describe"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入描述!',
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

export default withRouter(TemplateSettingAdd);