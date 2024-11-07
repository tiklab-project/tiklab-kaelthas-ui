import React, {useEffect, useRef, useState} from 'react';
import "./KuProject.scss"
import {withRouter} from "react-router-dom";
import {Alert, Button, Collapse, Form, Input, InputNumber, Modal, Select} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import kubernetesStore from "../../../kuPage/store/KubernetesStore";
import TextArea from "antd/es/input/TextArea";

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
const KuProject = (props) => {

    const {
        findKuInfoById,
        updateKbInfo,
        deleteKuInfo
    } = kubernetesStore;

    const kuId = localStorage.getItem("kuId");

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [activeKey, setActiveKey] = useState([]);

    useEffect(async () => {

    }, []);

    const onFinish = async () => {
        let values = await form.getFieldsValue()
        values.id = kuId;
        await updateKbInfo(values);

        console.log(values)
    };

    const onReset = () => {
        setActiveKey([])
    };

    const onChange = async (key) => {
        if ("1" === key[0]) {

            const newVar = await findKuInfoById(kuId);

            form.setFieldsValue(newVar)
        }


        setActiveKey(key)
    };

    const handleOk = async () => {
        await deleteKuInfo(kuId)
        props.history.push("/kubernetes")
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
            集群信息
        </div>
    )

    const deleteHost = () => (
        <div className="project-info-title">
            <DeleteOutlined/> &nbsp;
            删除集群
        </div>
    );

    return (
        <div className="setting-box-body-right">
            <div className="setting-box-right-head">
                <div className="setting-box-right-head-text">
                    集群信息
                </div>
                <Collapse onChange={(key) => onChange(key)} expandIconPosition="right" activeKey={activeKey}>
                    <Panel header={hostHeader()} key={1}>
                        <Form
                            {...layout}
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            labelAlign={"left"}
                        >
                            <Form.Item
                                label="集群名称"
                                name="name"
                                rules={[{required: true, message: '集群名称!'}]}
                            >
                                <Input placeholder="集群名称"/>
                            </Form.Item>

                            <Form.Item
                                label="集群ip"
                                name="ip"
                                rules={[{required: true, message: '集群ip!'}]}
                            >
                                <Input placeholder="集群ip"/>
                            </Form.Item>
                            <Form.Item
                                label="端口"
                                name="port"
                                rules={[{required: true, message: '端口!'}]}
                            >
                                <InputNumber placeholder="端口"/>
                            </Form.Item>

                            <Form.Item
                                label="apiToken"
                                name="apiToken"
                                rules={[{required: false, message: 'apiToken!'}]}
                            >
                                <TextArea placeholder="token"/>
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
                    <Panel header={deleteHost()} key={2}>
                        <div className="dropDownMenu-box">
                            <div style={{color: "#ff0000"}}>
                                此主机及其监控项、触发器、图形和模板将被永久删除。
                            </div>
                            <div className="setting-box-div-delete"
                                 onClick={() => deleteByHost()}
                            >
                                <span>是否删除集群</span>
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
                        <p>你确定要删除集群吗？</p>
                    </Modal>
                </>
            </div>
        </div>
    );
};

export default withRouter(observer(KuProject));