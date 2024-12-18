import React, {useEffect} from 'react';
import {Button, Col, Form, Input, InputNumber, message, Row, Select} from "antd";

const {Option} = Select
import "./AddDatabases.scss"
import databasesStore from "../store/DatabasesStore";

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const AddDatabases = (props) => {

    const {
        createDbInfo,
        testJDBCSql
    } = databasesStore;


    const [form] = Form.useForm();

    useEffect(async () => {

    }, []);

    const onFinish = async () => {
        let values = await form.validateFields();
        values.usability = 0;

        await createDbInfo(values)
        props.history.push('/db')
    };

    const onCancel = () => {
        props.history.push('/db')
    };

    async function testSql() {
        let values = await form.validateFields();

        const resData = await testJDBCSql(values)
        if (resData.code === 0){
            await message.success("连接数据库成功")
        }else {
            await message.error("连接失败!")
        }
    }

    return (
        <Row className="db-edit-modal">
            <Col
                xs={{span: "24"}}
                sm={{span: "24"}}
                md={{span: "24"}}
                lg={{span: "18", offset: "3"}}
                xl={{span: "14", offset: "5"}}
                xxl={{span: "10", offset: "7"}}
                style={{height: "100%"}}
            >
                <div className="db-edit-box">
                    <div className="db-edit-box-header">
                        <div className="db-edit-box-header-title">
                            新建数据库
                        </div>
                    </div>
                    <Form
                        className="db-edit-modal-form"
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        {...layout}
                        initialValues={{state: 1}}
                    >
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="名称"
                                name="name"
                                rules={[{required: true, message: '请输入名称!'}]}
                            >
                                <Input placeholder="名称"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据源ip"
                                name="ip"
                                rules={[{required: true, message: '请输入数据源ip!'}]}
                            >
                                <Input placeholder="数据源ip"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据库类型"
                                name="dbType"
                                rules={[{required: true, message: '请输入数据库类型!'}]}
                            >
                                <Select
                                    placeholder="请选择数据库类型"
                                    key="selectGroup"
                                    allowClear
                                    showSearch
                                    style={{width: 200}}
                                    optionFilterProp="children"
                                    // onChange={SelectChangeDBType}
                                >
                                    <Option key={1} value="PostgreSQL">PostgreSQL</Option>
                                    <Option key={2} value="MYSQL">MYSQL</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        {/*<div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据库名称"
                                name="dbName"
                                rules={[{required: true, message: '请选择数据库名称!'}]}
                            >
                                <Input placeholder="数据库名称"/>
                            </Form.Item>
                        </div>*/}
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据库端口号"
                                name="dbPort"
                                rules={[{required: true, message: '请选择数据库端口号!'}]}
                            >
                                <InputNumber placeholder="数据库端口号" min={0}/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{required: true, message: '用户名!'}]}
                            >
                                <Input placeholder="用户名"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{required: true, message: '密码!'}]}
                            >
                                <Input placeholder="密码"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="是否开启"
                                name="state"
                                rules={[{required: true, message: '是否开启!'}]}
                            >
                                <Select
                                    placeholder="是否开启"
                                    allowClear
                                >
                                    <Option key={1} value={1}>开启</Option>
                                    <Option key={2} value={0}>关闭</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className={"db-edit-box-footer"}>
                        <Button type="primary" onClick={testSql} style={{margin: "0 10px 0 0"}}
                                className={"db-edit-box-footer-btn important-btn"}> 测试 </Button>
                        <Button onClick={onCancel} style={{margin: "0 10px 0 0"}}
                                className={"db-edit-box-footer-btn"}> 取消 </Button>
                        <Button type="primary" onClick={onFinish}
                                className={"db-edit-box-footer-btn important-btn"}> 提交 </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AddDatabases;