import React, {useEffect, useRef, useState} from 'react';
import "./ProjectInformation.scss"
import {withRouter} from "react-router-dom";
import {Alert, Button, Collapse, Form, Input, Modal, Select} from "antd";
import projectInformationStore from "../store/ProjectInformationStore";
import configurationStore from "../../../hostPage/store/ConfigurationStore";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const {Panel} = Collapse;

const {Option} = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {

    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
        offset: 4
    },
};

const ProjectInformation = (props) => {

    const {deleteHostById, findHostById, findAllHostGroupList, updateHost, allHostGroupList} = projectInformationStore;

    const {setNullCondition, findPageHost} = configurationStore;

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [activeKey, setActiveKey] = useState([]);

    const onFinish = async (values) => {
        values.id = localStorage.getItem("hostId")

        await updateHost(values)
    };
    const onReset = () => {
        setActiveKey([])
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
        setActiveKey(key)
    };

    const handleOk = async () => {

        await deleteHostById(localStorage.getItem("hostId"));

        setNullCondition();

        await findPageHost();

        props.history.push("/configuration");

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //删除主机
    async function deleteByHost() {
        setIsModalVisible(true)
    }

    const hostHeader = () => (
        <div className="project-info-title">
            <FormOutlined/> &nbsp;
            主机信息
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
                <Collapse onChange={(key) => onChange(key)} expandIconPosition="right" activeKey={activeKey}>
                    <Panel header={hostHeader()} key="1">
                        <Form
                            {...layout}
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            labelAlign={"left"}
                        >
                            <Form.Item
                                name="name"
                                label="主机名称"
                                rules={[{required: true,}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="ip"
                                label="ip地址"
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="hostGroupId"
                                label="主机群组"
                                rules={[{required: false}]}
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
                                rules={[{required: false}]}
                            >
                                <Select
                                    placeholder="是否开启"
                                    allowClear
                                >
                                    <Option key={1} value={1}>开启</Option>
                                    <Option key={2} value={2}>关闭</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="describe"
                                label="描述"
                                rules={[{required: false}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button htmlType="button" onClick={onReset}>
                                    取消
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    确定
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
                <>
                    <Modal
                        title="确认操作"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel} style={{ float: 'left' }}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleOk}>
                                确定
                            </Button>,
                        ]}
                        width={200}
                    >
                        <p>你确定要删除主机吗？</p>
                    </Modal>
                </>
            </div>
        </div>
    );
};

export default withRouter(observer(ProjectInformation));