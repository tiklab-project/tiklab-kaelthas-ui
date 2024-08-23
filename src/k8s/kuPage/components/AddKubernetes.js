import React, {useEffect} from 'react';
import {Button, Col, Form, Input, InputNumber, message, Row, Select} from "antd";

const {Option} = Select
import "./AddKubernetes.scss"
import kubernetesStore from "../store/KubernetesStore";
import TextArea from "antd/es/input/TextArea";

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const AddKubernetes = (props) => {

    const {
        createKbInfo,
    } = kubernetesStore;

    const [form] = Form.useForm();

    const onFinish = async () => {
        let values = await form.validateFields();

        await createKbInfo(values)
        props.history.push('/kubernetes')
    };

    const onCancel = () => {
        props.history.push('/kubernetes')
    };


    async function testSql() {
        let values = await form.validateFields();

        /*const resData = await testJDBCSql(values)
        if (resData.code === 0){
            await message.success("连接数据库成功")
        }else {
            await message.error("连接失败!")
        }*/
    }

    return (
        <Row className="kubernetes-edit-modal">
            <Col
                xs={{span: "24"}}
                sm={{span: "24"}}
                md={{span: "24"}}
                lg={{span: "18", offset: "3"}}
                xl={{span: "14", offset: "5"}}
                xxl={{span: "10", offset: "7"}}
                style={{height: "100%"}}
            >
                <div className="kubernetes-edit-box">
                    <div className="kubernetes-edit-box-header">
                        <div className="kubernetes-edit-box-header-title">
                            新建数据库
                        </div>
                    </div>
                    <Form
                        className="kubernetes-edit-modal-form"
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        {...layout}
                        initialValues={{state: "1",port:6443}}
                    >
                        <div className={"kubernetes-edit-form-input"}>
                            <Form.Item
                                label="名称"
                                name="name"
                                rules={[{required: true, message: '名称!'}]}
                            >
                                <Input placeholder="名称"/>
                            </Form.Item>
                        </div>
                        <div className={"kubernetes-edit-form-input"}>
                            <Form.Item
                                label="集群Ip"
                                name="ip"
                                rules={[{required: true, message: '数据源ip!'}]}
                            >
                                <Input placeholder="数据源ip"/>
                            </Form.Item>
                        </div>
                        <div className={"kubernetes-edit-form-input"}>
                            <Form.Item
                                label="访问集群端口号"
                                name="port"
                                rules={[{required: true, message: '集群端口号!'}]}
                            >
                                <InputNumber placeholder="集群端口号" min={0}/>
                            </Form.Item>
                        </div>
                        <div className={"kubernetes-edit-form-input"}>
                            <Form.Item
                                label="集群token"
                                name="apiToken"
                                rules={[{required: true, message: '集群token(需要能够访问集群所有资源)!'}]}
                            >
                                <TextArea placeholder="集群token(需要能够访问集群所有资源)"/>
                            </Form.Item>
                        </div>
                        <div className={"kubernetes-edit-form-input"}>
                            <Form.Item
                                label="是否开启"
                                name="status"
                                rules={[{required: true, message: '是否开启!'}]}
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
                    <div className={"kubernetes-edit-box-footer"}>
                        {/*<Button type="primary" onClick={testSql} style={{margin: "0 10px 0 0"}}
                                className={"kubernetes-edit-box-footer-btn important-btn"}> 测试 </Button>*/}
                        <Button onClick={onCancel} style={{margin: "0 10px 0 0"}}
                                className={"kubernetes-edit-box-footer-btn"}> 取消 </Button>
                        <Button type="primary" onClick={onFinish}
                                className={"kubernetes-edit-box-footer-btn important-btn"}> 提交 </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AddKubernetes;