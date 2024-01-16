import {Button, Form, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import templateStore from "../store/TemplateStore";

const {Option} = Select

const AddMonitor = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addTemplate,getTemplateByName,templateList} = templateStore

    useEffect(() => {
        getTemplateByName().then(() => {
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


    async function onTemplate(val) {
        //查询模板
        const resData = await getTemplateByName(val);
        if (resData.length > 0){
            resData.then(res => {
                form.setFieldsValue({
                    id:res.id,
                    getTemplateByName:res.name
                })
            })
        }
    }

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
                                    className="template-select"
                                    // key="selectTemplate"
                                    allowClear
                                    showSearch
                                    onSearch={onTemplate}
                                    optionFilterProp="children"
                                >

                                    {
                                        templateList && templateList.map((item) => {
                                            return <Option value={item.id}>{item.name}</Option>
                                        })
                                    }
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