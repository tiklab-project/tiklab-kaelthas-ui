import React, {useEffect, useRef, useState} from 'react';
import "./DbProject.scss"
import {withRouter} from "react-router-dom";
import {Alert, Button, Col, Collapse, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import databasesStore from "../../../databasesPage/store/DatabasesStore";

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
const DbProject = (props) => {

    const {
        findDbInfoById,
        updateDbInfo,
        deleteDbInfo,
        dbObj
    } = databasesStore;

    const dbId = localStorage.getItem("dbId");

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [activeKey, setActiveKey] = useState([]);

    useEffect(async () => {

    }, []);

    const onFinish = async () => {
        let values = await form.getFieldsValue()
        values.id = dbId;
        await updateDbInfo(values);

        console.log(values)
    };

    const onReset = () => {
        setActiveKey([])
    };

    const onChange = async (key) => {
        if ("1" === key[0]) {

            const newVar = await findDbInfoById(dbId);

            form.setFieldsValue(newVar)
        }


        setActiveKey(key)
    };

    const handleOk = async () => {
        await deleteDbInfo(dbId)
        props.history.push("/db")
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
            数据库信息
        </div>
    )

    const deleteHost = () => (
        <div className="project-info-title">
            <DeleteOutlined/> &nbsp;
            删除数据库
        </div>
    );

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
            testSql: testSql
        });
    }

    return (
        <Row className="dbSetting-box-body-right">
            <Col xs={{ span: "24" }}
                 sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20" ,offset:"2"}}
                 xxl={{ span: "18", offset: "3" }}
                 className="setting-box-right-head">
                <div className="setting-box-right-head-text">
                    数据库信息
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
                                label="数据源名称"
                                name="name"
                                rules={[{required: true, message: '请输入数据源名称!'}]}
                            >
                                <Input placeholder="数据源名称"/>
                            </Form.Item>

                            <Form.Item
                                label="数据源ip"
                                name="ip"
                                rules={[{required: true, message: '请输入数据源ip!'}]}
                            >
                                <Input placeholder="数据源ip"/>
                            </Form.Item>

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
                            {/*<Form.Item
                                label="数据库名称"
                                name="dbName"
                                rules={[{required: true, message: '请选择数据库名称!'}]}
                            >
                                <Input placeholder="数据库名称"/>
                            </Form.Item>*/}
                            <Form.Item
                                label="数据库端口"
                                name="dbPort"
                                rules={[{required: true, message: '请选择数据库端口!'}]}
                            >
                                <InputNumber placeholder="数据库端口"/>
                            </Form.Item>

                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{required: true, message: '用户名!'}]}
                            >
                                <Input placeholder="用户名"/>
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[{required: true, message: '密码!'}]}
                            >
                                <Input placeholder="密码"/>
                            </Form.Item>

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
                    <Panel header={deleteHost()} key={2}>
                        <div className="dropDownMenu-box">
                            <div style={{color: "#ff0000"}}>
                                此主机及其监控项、触发器、图形和模板将被永久删除。
                            </div>
                            <div className="setting-box-div-delete"
                                 onClick={() => deleteByHost()}
                            >
                                <span>是否删除数据源</span>
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
                        <p>你确定要删除数据源吗？</p>
                    </Modal>
                </>
            </Col>
        </Row>
    );
};

export default withRouter(observer(DbProject));