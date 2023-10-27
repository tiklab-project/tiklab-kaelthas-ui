/*
 * @Descripttion: 迭代添加编辑弹窗
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-21 13:02:38
 */

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import { observer, inject } from "mobx-react";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
const { RangePicker } = DatePicker;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 24,
    },
};

const TemplateAddModal = (props) => {
    const [form] = Form.useForm();
    /**
     * 显示添加编辑弹窗，若是编辑模型，初始化表单
     */
    const showModal = () => {
        if (props.type === "edit") {

        }
    };

    /**
     * 关闭打开弹窗，重新加载数据
     */
    useEffect(() => {
        if (visible) {
            showModal()
        }
        return;
    }, [visible])

    /**
     * 添加表单信息，添加或者编辑
     */
    const onFinish = () => {
        form.validateFields().then((values) => {
            if (props.type === "add") {
            } else {
            }
            setVisible(false);
            form.resetFields();
        })
    };

    /**
     * 取消添加或者编制
     */
    const onCancel = () => {
        form.resetFields();
        setVisible(false);

    };

    return (
        <Modal
            title={"编辑"}
            visible={visible}
            onOk={onFinish}
            onCancel={onCancel}
            cancelText="取消"
            okText="确定"
            closable={false}
        >
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="迭代名称"
                    name="sprintName"
                    rules={[
                        {
                            required: true,
                            message: '请输入迭代名称',
                        },
                    ]}
                >
                    <Input placeholder="迭代名称" />
                </Form.Item>
                <Form.Item
                    label="负责人"
                    name="master"
                    rules={[
                        {
                            required: true,
                            message: '请输入负责人',
                        },
                    ]}
                >
                    <Select
                        placeholder="负责人"
                        allowClear
                    >
                        {
                            uselist && uselist.map((item, index) => {
                                return <Select.Option value={item.user?.id} key={item.user?.id}>{item.user?.nickname ? item.user?.nickname : item.user?.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>

                {
                    props.type !== "add" && <Form.Item
                        label="迭代状态"
                        name="sprintState"
                        rules={[
                            {
                                required: true,
                                message: '请输入迭代状态',
                            },
                        ]}
                    >
                        <Select
                            placeholder="迭代状态"
                            allowClear
                        >
                            {
                                sprintStateList && sprintStateList.map((item, index) => {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }

                <Form.Item name="startTime" label="计划日期"
                    rules={[
                        {
                            required: true,
                            message: '请选择计划日期',
                        },
                    ]}>
                    <RangePicker locale={locale} />
                </Form.Item>
                <Form.Item
                    label="迭代描述"
                    name="desc"
                    rules={[
                        {
                            required: false,
                            message: '请输入迭代描述',
                        },
                    ]}
                >
                    <Input placeholder="迭代描述" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default inject("sprintStore")(observer(TemplateAddModal));