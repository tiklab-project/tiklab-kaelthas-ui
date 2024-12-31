import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Button, Drawer, Form, Input, message, Modal, Select} from "antd";
import templateSettingStore from "../store/TemplateSettingStore";
import {observer} from "mobx-react";

const {Option} = Select
const TemplateSettingUpdate = (props) => {

    const {isOpen, setIsOpen, form,templateId} = props;

    const {updateTemplate, findTemplatePage} = templateSettingStore;

    const handleOk = async () => {
        setIsOpen(false);
    };

    const updateTempBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    id: templateId
                };
                obj[field] = values[field];

                await updateTemplate(obj);
                message.success("修改成功")
                await findTemplatePage();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    }

    return (
        <Drawer
            title="编辑模板"
            open={isOpen}
            onClose={handleOk}
            visible={isOpen}
            width={500}
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background: "transparent"}}
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
                layout="vertical"
                labelAlign={"left"}
                preserve={false}
            >
                <Form.Item
                    label="模板名称"
                    name="name"
                    rules={[{required: true, message: '请输入模板名称!'}]}
                >
                    <Input onBlur={() =>updateTempBlur('name')}/>
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
                        onBlur={() =>updateTempBlur('isOpen')}
                    >

                        <Option value={1} key={1}>{"开启"}</Option>
                        <Option value={0} key={0}>{"关闭"}</Option>

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
                    <Input onBlur={() =>updateTempBlur('describe')}/>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default withRouter(observer(TemplateSettingUpdate));
