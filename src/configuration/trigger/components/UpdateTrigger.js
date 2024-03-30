import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/TriggerStore";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select
const UpdateTrigger = (props) => {
    const {dataList, setDataList} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {rowData, setRowData} = props;

    const {form} = props;

    const {updateTrigger, findMonitorListById, getTriggerList, findTriggerExpressionAll} = triggerStore;

    const [monitorData, setMonitorData] = useState([]);

    const [triggerExData, setTriggerExData] = useState([]);

    useEffect(async () => {
        const resData = await findMonitorListById({
            hostId: localStorage.getItem("hostId")
        });
        setMonitorData([...resData])

        const triggerExAll = await findTriggerExpressionAll();
        setTriggerExData([...triggerExAll])
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {

        setIsModalOpen(false);

        form.validateFields().then(async res => {

            console.log("修改当中的res:", res)

            await updateTrigger({
                id: rowData.id,
                expressionId: rowData.expressionId,
                name: res.name,
                monitorId: res.monitorId,
                triggerStatus: 1,
                operator: res.operator,
                numericalValue: res.numericalValue,
                mediumType: res.mediumType,
                severityLevel: res.severityLevel,
                describe: res.describe,
                source: rowData.source,
                expression:res.expression
            });


            getTriggerList().then(res => {
                setDataList([...res.dataList])
            })

        })


    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function checkSource(value) {
        const resData = await findMonitorListById({
            hostId: localStorage.getItem("hostId"),
            monitorSource: value
        });

        setMonitorData([...resData])

        if (resData !== null) {
            form.setFieldsValue({
                monitorId: resData[0].id
            })
        }

    }

    const onCheckMonitor = (value, options) => {

        const type = options.children[2];

        switch (type) {
            case "主机":
                rowData.source = 1
                setRowData(rowData)
                break;
            case "模板":
                rowData.source = 2
                setRowData(rowData)
                break;
        }

    }

    const conversionMonitorType = (type) => {

        switch (type) {
            case 1:
                return "主机";
            case 2:
                return "模板";
        }

    }

    return (
        <>
            <Modal
                title="编辑触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
                width={500}
            >
                <div className="addMonitorForm">
                    <div>

                        <Form
                            name="updateMonitorForm"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            // onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                            labelAlign={"left"}
                        >
                            <Form.Item
                                label="触发器名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入触发器名称!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            {/*<Form.Item
                                label="监控项"
                                name="monitorId"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择监控项!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择您的监控项"
                                    onChange={(value, options) => onCheckMonitor(value, options)}
                                    allowClear
                                    showSearch
                                >
                                    {
                                        monitorData && monitorData.map(item => (
                                            <Option key={item.id}
                                                    value={item.id}>{item.name}{"  来源  "}{conversionMonitorType(item.monitorSource)}</Option>
                                        ))
                                    }
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="范围关系"
                                name="operator"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择范围关系!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="范围关系关系"
                                    allowClear
                                >
                                    <Option value={1} key={1}>{">"}</Option>
                                    <Option value={2} key={2}>{"<"}</Option>
                                    <Option value={3} key={3}>{"="}</Option>
                                    <Option value={4} key={4}>{">="}</Option>
                                    <Option value={5} key={5}>{"<="}</Option>
                                    <Option value={6} key={6}>{"<>"}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="值"
                                name="numericalValue"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入数字!',
                                    },
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>*/}

                            <Form.Item
                                label="触发器表达式"
                                name="expression"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入触发器表达式!',
                                    },
                                ]}
                            >
                                <TextArea placeholder="手动输入触发器表达式" allowClear />
                            </Form.Item>

                            <Form.Item
                                label="消息通知方案"
                                name="mediumType"
                                rules={[
                                    {
                                        required: false,
                                        message: '请选择消息通知方案!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择您的消息通知方案"
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value={1} key={1}>方案1:电子邮件</Option>
                                    <Option value={2} key={2}>方案2:微信公众号</Option>
                                    <Option value={3} key={3}>方案3:钉钉</Option>
                                    <Option value={4} key={4}>方案4:短信</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="严重性"
                                name="severityLevel"
                                rules={[
                                    {
                                        required: false,
                                        message: '严重性!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="严重性选择"
                                    allowClear
                                >
                                    <Option value={1} key={1}>灾难</Option>
                                    <Option value={2} key={2}>严重</Option>
                                    <Option value={3} key={3}>一般严重</Option>
                                    <Option value={4} key={4}>告警</Option>
                                    <Option value={5} key={5}>信息</Option>
                                    <Option value={6} key={6}>未分类</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="问题描述"
                                name="describe"
                                rules={[
                                    {
                                        required: false,
                                        message: '问题描述!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default UpdateTrigger;