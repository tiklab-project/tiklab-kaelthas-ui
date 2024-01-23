import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Button, Form, Input, Modal, Select} from "antd";
import templateSettingStore from "../store/TemplateSettingStore";

const {Option} = Select
const TemplateSettingAdd = (props) => {


    const {isOpen, setIsOpen, form, rowData, setDataList, dataList} = props;

    const {updateTemplate, findTemplatePage} = templateSettingStore;


    useEffect(() => {
        console.log(form.getFieldsValue())
        console.log(rowData)
    }, []);

    const handleOk = async () => {

        form.validateFields().then(async res => {
            await updateTemplate({
                id: rowData.id,
                name: res.name,
                isOpen: res.isOpen,
                describe: res.describe
            })

            const resData = await findTemplatePage();

            setDataList([...resData.dataList]);

        })
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('模板添加成功')
    }

    const onSecondCityChange = (value) => {
        console.log(value)
    };


    return (
        <>
            <Modal title="编辑模板" open={isOpen} onOk={handleOk} onCancel={handleCancel} visible={isOpen}
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