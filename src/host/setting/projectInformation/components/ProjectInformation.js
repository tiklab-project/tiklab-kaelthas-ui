import React, {useEffect, useRef, useState} from 'react';
import "./ProjectInformation.scss"
import {withRouter} from "react-router-dom";
import {Alert, Button, Collapse, Form, Input, Select} from "antd";
import projectInformationStore from "../store/ProjectInformationStore";
import configurationStore from "../../../hostPage/store/ConfigurationStore";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const {Panel} = Collapse;

const {Option} = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const ProjectInformation = (props) => {

    const {deleteHostById, findHostById, findAllHostGroupList, updateHost, allHostGroupList} = projectInformationStore;

    const {setNullCondition, findPageHost} = configurationStore;

    const [form] = Form.useForm();

    const formRef = useRef(null);

    const onFinish = async (values) => {
        values.id = localStorage.getItem("hostId")

        await updateHost(values)
    };
    const onReset = () => {
        form.resetFields();
    };

    const onChange = async (key) => {
        if ("1" === key[0]) {
            //调用根据id查询,将查询的数据放到表单当中
            const resData = await findHostById(localStorage.getItem("hostId"));

            await findAllHostGroupList();

            form.setFieldsValue({
                id: localStorage.getItem("hostId"),
                name: resData.name,
                ip: resData.ip,
                hostGroupId: resData.hostGroup === null ? null : resData.hostGroup.id,
                state: resData.state,
                describe: resData.describe
            })
        }
    };


    //删除主机
    async function deleteByHost() {

        await deleteHostById(localStorage.getItem("hostId"));

        setNullCondition();

        await findPageHost();

        props.history.push("/configuration");
    }

    const hostHeader = () => (
        <div className="project-info-title">
            <FormOutlined/> &nbsp;
            项目信息
        </div>
    )

    const deleteHost = () => (
        <div className="project-info-title">
            <DeleteOutlined/> &nbsp;
            删除主机
        </div>
    );

    return (
        <div className="setting-box-body-right">
            <div className="setting-box-right-head">
                <div className="setting-box-right-head-text">
                    主机信息
                </div>
                <Collapse onChange={onChange} expandIconPosition="right">
                    <Panel header={hostHeader()} key="1">
                        <Form {...layout}
                              form={form}
                              name="basic"
                              onFinish={onFinish}
                              initialValues={{remember: true}}
                              labelAlign={"left"}
                            // ref={formRef}
                        >
                            <Form.Item
                                name="name"
                                label="主机名称"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="ip"
                                label="ip地址"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="hostGroupId"
                                label="主机群组"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="请选择主机群组"
                                    allowClear
                                >
                                    {
                                        allHostGroupList && allHostGroupList.map(item => (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="state"
                                label="是否开启"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="是否开启"
                                    allowClear
                                >
                                    <Option value={1}>启用</Option>
                                    <Option value={2}>未启用</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="describe"
                                label="描述"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    确定
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    清除信息
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header={deleteHost()} key="2">
                        <div className="dropDownMenu-box">
                            <div style={{color: "#ff0000"}}>
                                此主机及其监控项、触发器、图形和模板将被永久删除。
                            </div>
                            <div className="setting-box-div-delete"
                                 onClick={() => deleteByHost()}
                            >
                                <span>是否删除主机</span>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export default withRouter(observer(ProjectInformation));