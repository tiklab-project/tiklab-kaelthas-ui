import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import configurationStore from "../store/ConfigurationStore";

const {Option} = Select

const AddHost = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {templateList, findTemplateByName,findHostGroup,hostGroupList} = configurationStore;

    useEffect(() => {
        findTemplateByName().then(() => {
            form.setFieldsValue({
                templateName: templateList[0]?.name
            })
        })

        findHostGroup().then(() =>{
            form.setFieldsValue({
                hostGroupName: hostGroupList[0]?.name
            })
        })


    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        setIsModalOpen(false);

        form.validateFields().then(res => {
            console.log("res",res)

        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    //点击的时候触发
    function onFocus() {
        console.log('focus');
    }

    //模板列表
    async function onSearch(val) {
        console.log('search:', val);

        const resData = await findTemplateByName(val);

        if (resData.length > 0) {
            resData.then((res) => {
                form.setFieldsValue({
                    id: res.id,
                    templateName: res.name
                })
            })
        }
    }


    //主机组列表
    function onHostSearch(val) {
        const resData = findHostGroup(val)
        if (resData.length > 0) {
            resData.then((res) => {
                form.setFieldsValue({
                    id: res.id,
                    hostGroupName: res.name
                })
            })
        }
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建主机
            </Button>
            <Modal title="新建主机" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
                <div className="addHostForm">
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
                            name="hostGroupName"
                            rules={[
                                {
                                    required: false,
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
                                onSearch={onHostSearch}
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
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
                            name="templateName"
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
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}

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
                </div>
            </Modal>
        </>
    );
};
export default AddHost;