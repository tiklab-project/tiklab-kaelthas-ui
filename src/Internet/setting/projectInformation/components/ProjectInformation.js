import React, {useEffect, useRef, useState} from 'react';
import "./ProjectInformation.scss"
import {withRouter} from "react-router-dom";
import {Alert, Button, Collapse, Form, Input, InputNumber, Modal, Select} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import projectStore from "../store/ProjectInformationStore";

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

    const {
        findInternetById,
        deleteInternet,
        updateInternet
    } = projectStore;

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [activeKey, setActiveKey] = useState([]);

    const internetId = localStorage.getItem("internetId");

    const onFinish = async (values) => {
        values.id = localStorage.getItem("internetId")

        await updateInternet(values)
    };
    const onReset = () => {
        setActiveKey([])
    };

    const onChange = async (key) => {
        if ("1" === key[0]) {
            //调用根据id查询,将查询的数据放到表单当中
            const resData = await findInternetById(localStorage.getItem("internetId"));

            form.setFieldsValue({
                id: localStorage.getItem("internetId"),
                name: resData.name,
                ip: resData.ip,
                type: resData.type,
                port: resData.port,
                status: resData.status
            })
        }
        setActiveKey(key)
    };

    const handleOk = async () => {
        await deleteInternet(internetId);
        props.history.push("/internet")
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //删除网络
    async function deleteByHost() {
        setIsModalVisible(true)
    }

    const hostHeader = () => (
        <div className="project-info-title">
            <FormOutlined/> &nbsp;
            网络信息
        </div>
    )

    const deleteHost = () => (
        <div className="project-info-title">
            <DeleteOutlined/> &nbsp;
            删除网络
        </div>
    );

    return (
        <div className="setting-box-body-right">
            <div className="setting-box-right-head">
                <div className="setting-box-right-head-text">
                    网络信息
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
                                label="网络名称"
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
                                name="port"
                                label="端口号"
                                rules={[{required: true}]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                            <Form.Item
                                name="type"
                                label="类型"
                                rules={[{required: false}]}
                            >
                                <Select
                                    allowClear
                                >
                                    <Option key={1} value={1}>交换机</Option>
                                    <Option key={2} value={2}>路由器</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="status"
                                label="是否开启"
                                rules={[{required: false}]}
                            >
                                <Select
                                    allowClear
                                >
                                    <Option key={1} value={1}>开启</Option>
                                    <Option key={2} value={2}>关闭</Option>
                                </Select>
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
                                此网络及其监控项、触发器、图形和模板将被永久删除。
                            </div>
                            <div className="setting-box-div-delete"
                                 onClick={() => deleteByHost()}
                            >
                                <span>是否删除网络</span>
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
                            <Button key="back" onClick={handleCancel} style={{float: 'left'}}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleOk}>
                                确定
                            </Button>,
                        ]}
                        width={200}
                    >
                        <p>你确定要删除网络吗？</p>
                    </Modal>
                </>
            </div>
        </div>
    );
};

export default withRouter(observer(ProjectInformation));