import {Button, Col, Form, Input, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import configurationStore from "../store/ConfigurationStore";
import {withRouter} from "react-router";
import "./AddHost.scss"
import {observer} from "mobx-react";

const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};

const AddHost = (props) => {

    const [form] = Form.useForm();

    const {templateList, findTemplateAll, findHostGroup, hostGroupList, addHost, findPageHost} = configurationStore;

    useEffect(async () => {
        await findTemplateAll();
        await findHostGroup();
    }, []);

    const onFinish = async () => {
        const values = await form.validateFields();
        await addHost({
            name: values.name,
            ip: values.ip,
            hostGroupId: values.hostGroupId,
            templateId: values.templateId,
        });
        await findPageHost()
        props.history.push('/configuration')
    };

    const onCancel = () => {
        props.history.push('/configuration')
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
                            新建主机
                        </div>
                    </div>
                    <Form
                        className="ws-edit-modal-form"
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        {...layout}
                        initialValues={{ isOpen: "1" }}
                    >
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="主机名称"
                                name="name"
                                rules={[{required: true, message: '请输入主机名称!'}]}
                            >
                                <Input placeholder="主机名称"/>
                            </Form.Item>
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="主机ip地址"
                                name="ip"
                                rules={[{required: true, message: '请输入主机ip地址!'}]}
                            >
                                <Input placeholder="主机ip地址"/>
                            </Form.Item>
                        </div>
                        {/*<Form.Item
                                label="可见范围"
                                name="visibility"
                            >
                                <div className={"ws-edit-visibility"}>
                                    <div className={`ws-edit-visibility-item "ws-edit-visibility-action":null}`}>
                                        <div style={{"display":"flex","alignItems":"center"}}>
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-suoding`} />
                                            </svg>
                                            <span>公共</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>公共项目，全部成员可见</div>
                                    </div>

                                    <div className={`ws-edit-visibility-item  "ws-edit-visibility-action"`}>
                                        <div style={{"display":"flex","alignItems":"center"}} >
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-jiesuo`} />
                                            </svg>
                                            <span>私密</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>私密项目，只有项目成员可见</div>
                                    </div>
                                </div>
                            </Form.Item>*/}
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="主机群组"
                                name="hostGroupId"
                                rules={[{required: true, message: '请选择主机群组!'}]}
                            >
                                <Select
                                    placeholder="请选择主机群组"
                                    key="selectGroup"
                                    allowClear
                                    showSearch
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
                        </div>
                        <div className={"ws-edit-form-input"}>
                            <Form.Item
                                label="添加模板"
                                name="templateId"
                                rules={[{required: false, message: '请选择模板!'}]}
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
                        </div>
                        <div className={"ws-edit-form-input"}>
                                <Form.Item
                                    label="是否开启"
                                    name="isOpen"
                                    rules={[{required: false, message: '是否开启!'}]}
                                >
                                    <Select
                                        placeholder="是否开启"
                                        allowClear
                                    >
                                        <Option key={1} value="1">开启</Option>
                                        <Option key={2} value="2">关闭</Option>
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
export default withRouter(observer(AddHost));