import React, {useEffect} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from "antd";

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
        console.log(form.getFieldsValue())
        await createDbInfo(form.getFieldsValue())

        props.history.push('/db')
    };

    const onCancel = () => {
        props.history.push('/db')
    };

    function SelectChangeDBType(value) {

        let driverName = '';
        let driverUrl = '';
        let testSql = '';

        switch (value) {
            case "PostgreSQL":
                driverName = 'org.postgresql.Driver';
                driverUrl = 'jdbc:postgresql://127.0.0.1:5432/xmonitor';
                testSql = 'select version()';
                break;
        }

        form.setFieldsValue({
            driverName: driverName,
            driverUrl: driverUrl,
            testSql:testSql
        });
    }

    async function testSql() {
        const resData = await testJDBCSql(form.getFieldsValue())
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
                        initialValues={{state: "1"}}
                    >
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据源名称"
                                name="name"
                                rules={[{required: true, message: '请输入数据源名称!'}]}
                            >
                                <Input placeholder="数据源名称"/>
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
                                    onChange={SelectChangeDBType}
                                >
                                    <Option key={1} value="PostgreSQL">PostgreSQL</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="驱动名称"
                                name="driverName"
                                rules={[{required: true, message: '请选择驱动名称!'}]}
                            >
                                <Input placeholder="驱动名称"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="连接字符串"
                                name="driverUrl"
                                rules={[{required: true, message: '请选择连接字符串!'}]}
                            >
                                <Input placeholder="连接字符串"/>
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
                                label="测试SQL"
                                name="testSql"
                                rules={[{required: true, message: '测试SQL!'}]}
                            >
                                <Input placeholder="测试SQL"/>
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
                                    <Option key={1} value="1">开启</Option>
                                    <Option key={2} value="2">关闭</Option>
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