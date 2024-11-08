import {Button, Form, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import templateStore from "../store/TemplateStore";

const {Option} = Select

const AddMonitor = () => {

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {addTemplate, getTemplateAll, findTemplateByMonitor, templateList} = templateStore;

    useEffect(async () => {
        await getTemplateAll();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const values = await form.validateFields();
        values.hostId = localStorage.getItem("hostId");
        values.monitorSource = 2;
        values.monitorStatus = 1;

        await addTemplate(values);

        await findTemplateByMonitor();

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={showModal}>
                添加模板
            </div>
            <Modal title="添加模板" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
                <Form
                    name="basic"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    layout="vertical"
                >
                    <Form.Item
                        label="模板名称"
                        name="templateId"
                        rules={[
                            {
                                required: true,
                                message: '请选择模板!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择您的模板"
                            className="template-select"
                            allowClear
                            showSearch
                        >
                            {
                                templateList && templateList.map((item) => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddMonitor;