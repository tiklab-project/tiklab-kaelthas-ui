import {Button, Form, Modal, Select} from 'antd';
import React, {useState} from 'react';
import AddTemplateForm from "./AddTemplateForm";
import templateStore from "../store/TemplateStore";

const AddMonitor = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addTemplate} = templateStore

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {

        form.validateFields().then(async res => {
            const resData = await addTemplate({
                id: Math.random(),
                templateName: res.templateName,
                monitorNum: Math.floor(Math.random() * 10 + 5),
                triggerNum: Math.floor(Math.random() * 5),
            })

            setDataList([...resData]);
        })

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                添加模板
            </Button>
            <Modal title="添加模板" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
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
                                    <Select.Option value="网络监控模板">网络监控模板</Select.Option>
                                    <Select.Option value="磁盘监控模板">磁盘监控模板</Select.Option>
                                    <Select.Option value="by http">by http</Select.Option>
                                    <Select.Option value="CPU监控模板">CPU监控模板</Select.Option>
                                    <Select.Option value="内存监控模板">内存监控模板</Select.Option>
                                </Select>

                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;