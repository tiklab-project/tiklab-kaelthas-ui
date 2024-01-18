import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/TriggerStore";

const {Option} = Select

const AddTrigger = (props) => {
    const {dataList, setDataList} = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {addTrigger, findMonitorListById,getTriggerList, monitorList} = triggerStore;

    const [monitorData, setMonitorData] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(async () => {
        const resData = await findMonitorListById(localStorage.getItem("hostId"));
        setMonitorData([...resData])
    }, []);

    const handleOk = async () => {
        form.validateFields().then(async res => {

            await addTrigger({
                hostId: localStorage.getItem("hostId"),
                name: res.name,
                monitorId: res.monitorId,
                triggerStatus: 1,
                operator: res.operator,
                numericalValue: res.numericalValue,
                mediumType: res.mediumType,
                severityLevel: res.severityLevel,
                describe: res.describe,
            });

            const resData = await getTriggerList();

            setDataList([...resData.dataList])
        })



        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建触发器
            </Button>
            <Modal
                title="新建触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
            >
                <div className="addMonitorForm">
                    <div>
                        <Form
                            name="basic"
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
                        >
                            <Form.Item
                                label="触发器名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入监控项名称!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
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
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    {
                                        monitorData && monitorData.map(item => (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="范围关系"
                                name="operator"
                                rules={[
                                    {
                                        required: false,
                                        message: '请选择范围关系!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="范围关系关系"
                                    allowClear
                                >
                                    <Option value={1}>{">"}</Option>
                                    <Option value={2}>{"<"}</Option>
                                    <Option value={3}>{"="}</Option>
                                    <Option value={4}>{">="}</Option>
                                    <Option value={5}>{"<="}</Option>
                                    <Option value={6}>{"<>"}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="值"
                                name="numericalValue"
                                rules={[
                                    {
                                        required: false,
                                        message: '请输入数字!',
                                    },
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>

                            <Form.Item
                                label="消息通知方案"
                                name="mediumType"
                                rules={[
                                    {
                                        required: false,
                                        message: '请选择监控项指标!',
                                    },
                                ]}
                            >

                                <Select
                                    placeholder="请选择您的监控类型"
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value="方案1:电子邮件">方案1:电子邮件</Option>
                                    <Option value="方案2:微信公众号">方案2:微信公众号</Option>
                                    <Option value="方案3:钉钉">方案3:钉钉</Option>
                                    <Option value="方案4:短信">方案4:短信</Option>
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
                                    <Option value={1}>灾难</Option>
                                    <Option value={2}>严重</Option>
                                    <Option value={3}>一般严重</Option>
                                    <Option value={4}>告警</Option>
                                    <Option value={5}>信息</Option>
                                    <Option value={6}>未分类</Option>
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

export default AddTrigger;