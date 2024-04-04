import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import configurationStore from "../store/ConfigurationStore";

const {Option} = Select

const AddHost = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {templateList, findTemplateAll, findHostGroup, hostGroupList, addHost, findPageHost} = configurationStore;

    useEffect(() => {

            findTemplateAll().then((res) => {
                form.setFieldsValue({
                    templateName: res[0].name
                })
            })
            findHostGroup().then((res) => {
                form.setFieldsValue({
                    hostGroupName: res[0].name
                })
            })

    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        form.validateFields().then(async res => {
            console.log(res)
            await addHost({
                name: res.name,
                ip: res.ip,
                hostGroupId: res.hostGroupId,
                templateId: res.templateId,
                state: res.isOpen,
            });
            const resData = await findPageHost()
            setDataList([...resData])
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={showModal}>
                新建主机
            </div>
            <Modal title="新建主机" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
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
                        name="hostGroupId"
                        rules={[
                            {
                                required: true,
                                message: '请选择主机群组!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择主机群组"
                            className="hostGroup-select"
                            key="selectGroup"
                            allowClear
                            showSearch
                            // onSearch={onHostSearch}
                            style={{width: 200}}
                            optionFilterProp="children"
                        >
                            {
                                hostGroupList && hostGroupList.map((item) => {
                                    return <Option value={item.id}
                                                   key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="添加模板"
                        name="templateId"
                        rules={[
                            {
                                required: false,
                                message: '请选择模板!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择模板"
                            allowClear
                            className="template-select"
                            key="selectTemplate"

                            showSearch
                            style={{width: 200}}
                            optionFilterProp="children"
                        >
                            {
                                templateList && templateList.map((item) => {
                                    return <Select.Option value={item.id}
                                                          key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="是否开启"
                        name="isOpen"
                        rules={[
                            {
                                required: false,
                                message: '是否开启!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="是否开启"
                            allowClear
                        >
                            <Option value="1">开启</Option>
                            <Option value="2">关闭</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default AddHost;