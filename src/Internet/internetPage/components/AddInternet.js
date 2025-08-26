import {Button, Col, Form, Input, InputNumber, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import "./AddInternet.scss"
import {observer} from "mobx-react";
import internetStore from "../store/InternetStore";

const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};

const AddInternet = (props) => {

    const [form] = Form.useForm();

    const {createInternet} = internetStore;

    const onFinish = async () => {
        let values = await form.validateFields();

        await createInternet(values).then(res=>{
            props.history.push('/internet')
        })
    };

    const onCancel = () => {
        props.history.push('/internet')
    };


    return (
        <Row className="ws-edit-modal">
            <Col
                xs={{span: "24"}}
                sm={{span: "24"}}
                md={{span: "24"}}
                lg={{span: "18", offset: "3"}}
                xl={{span: "14", offset: "5"}}
                xxl={{span: "12", offset: "6"}}
                style={{height: "100%"}}
            >
                <div className="ws-edit-box">
                    <div className="ws-edit-box-header">
                        <div className="ws-edit-box-header-title">
                            新建网络
                        </div>
                    </div>
                    <Form
                        className="ws-edit-modal-form"
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        {...layout}
                        initialValues={{status: 1, type: 1}}
                    >
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="名称"
                                name="name"
                                rules={[{required: true, message: '名称!'}]}
                            >
                                <Input placeholder="名称"/>
                            </Form.Item>
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="ip地址"
                                name="ip"
                                rules={[{required: true, message: 'ip地址!'}]}
                            >
                                <Input placeholder="ip地址"/>
                            </Form.Item>
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="端口"
                                name="port"
                                rules={[{required: true, message: '端口!'}]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="网络设备类型"
                                name="type"
                                rules={[{required: true, message: '网络设备类型!'}]}
                            >
                                <Select
                                    placeholder="类型"
                                    allowClear
                                >
                                    <Option key={1} value={1}>交换机</Option>
                                    <Option key={2} value={2}>路由器</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="是否开启"
                                name="status"
                                rules={[{required: false, message: '是否开启!'}]}
                            >
                                <Select
                                    placeholder="是否开启"
                                    allowClear
                                >
                                    <Option key={1} value={1}>开启</Option>
                                    <Option key={2} value={2}>关闭</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className={"ws-edit-box-footer"}>
                        <Button onClick={onCancel} style={{margin: "0 10px 0 0"}}
                                className={"ws-edit-box-footer-btn"}> 取消 </Button>
                        <Button type="primary" onClick={onFinish}
                                className={"ws-edit-box-footer-btn important-btn"}> 提交 </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};
export default withRouter(observer(AddInternet));
