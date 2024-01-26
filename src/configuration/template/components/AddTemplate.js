import {Button, Form, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import templateStore from "../store/TemplateStore";

const {Option} = Select

const AddMonitor = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addTemplate, getTemplateAll, findTemplateByMonitor, templateList} = templateStore

    useEffect(() => {
        getTemplateAll().then(() => {
            form.setFieldsValue({
                templateName: templateList[0]?.name
            })
        })

    }, []);

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

            await addTemplate({
                hostId: localStorage.getItem("hostId"),
                templateId: res.templateId,
                monitorSource: 2,
                monitorStatus: 1
            })
            const resData = await findTemplateByMonitor();
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
                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;