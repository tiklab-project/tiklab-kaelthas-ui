import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, InputNumber, message, Row, Select} from "antd";

const {Option} = Select
import "./AddDatabases.scss"
import TextArea from "antd/es/input/TextArea";

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const AddDatabases = (props) => {


    const [form] = Form.useForm();

    const [customize, setCustomize] = useState(true);

    useEffect(async () => {

    }, []);

    const onFinish = async () => {
        console.log(form.getFieldsValue())

        props.history.push('/testMonitor')
    };

    const onCancel = () => {
        props.history.push('/testMonitor')
    };

    function SelectChangeDBType(value) {
        switch (value) {
            case "1":
                setCustomize(true)
                break
            case "2":
                setCustomize(false)
                break
        }
    }

    async function testSql() {
        await message.success("连接数据库成功")
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
                            新建监控项
                        </div>
                    </div>
                    <Form
                        className="db-edit-modal-form"
                        form={form}
                        preserve={false}
                        layout={"vertical"}
                        {...layout}
                        initialValues={{isOpen: "1"}}
                    >
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="监控项名称"
                                name="name"
                                rules={[{required: true, message: '请输入监控项名称!'}]}
                            >
                                <Input placeholder="监控项名称"/>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据源"
                                name="dbTupe"
                                rules={[{required: true, message: '请输入数据源!'}]}
                            >
                                <Select
                                    placeholder="请选择数据源"
                                    key="selectGroup"
                                    allowClear
                                    showSearch
                                    style={{width: 200}}
                                    optionFilterProp="children"
                                >
                                    <Option key={1} value="PostgreSQL">pgsql</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className={"db-edit-form-input"}>
                            <Form.Item
                                label="监控类型"
                                name="isOpen"
                                rules={[{required: false, message: '监控类型!'}]}
                            >
                                <Select
                                    placeholder="监控类型"
                                    allowClear
                                    onChange={SelectChangeDBType}
                                >
                                    <Option key={1} value="1">系统指标</Option>
                                    <Option key={2} value="2">自定义</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        {/*<div className={"db-edit-form-input"}>
                            <Form.Item
                                label="数据表名称"
                                name="driverName"
                                rules={[{required: true, message: '请选择数据表名称!'}]}
                            >
                                <Input placeholder="数据表名称"/>
                            </Form.Item>
                        </div>*/}
                        {
                            customize ?
                                <div className={"db-edit-form-input"}>
                                    <Form.Item
                                        label="监控指标"
                                        name="monitorExpression"
                                        rules={[{required: true, message: '监控项指标'}]}
                                    >
                                        <Select
                                            placeholder="监控项指标"
                                            allowClear
                                            // value={expression.id}
                                            // onChange={onSecondCityChange}
                                        >

                                        </Select>
                                    </Form.Item>
                                </div>
                                :
                                <div></div>

                        }
                        {
                            !customize ?
                                <div className={"db-edit-form-input"}>
                                    <Form.Item
                                        label="自定义SQL"
                                        name="monitorExpression"
                                        rules={[{required: true, message: '自定义SQL'}]}
                                    >
                                        <TextArea/>
                                    </Form.Item>
                                </div>
                                :
                                <div></div>
                        }
                        <div className="db-edit-form-input">
                            <Form.Item
                                label="数据保留时间"
                                name="dataRetentionPeriod"
                                rules={[{required: true, message: '数据保留时间!'}]}
                            >
                                <InputNumber min={1}/>
                            </Form.Item>
                        </div>
                    </Form>
                    <div className={"db-edit-box-footer"}>
                        {/*<Button type="primary" onClick={testSql} style={{margin: "0 10px 0 0"}}
                                className={"db-edit-box-footer-btn important-btn"}> 测试 </Button>*/}
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