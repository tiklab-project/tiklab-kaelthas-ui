import {Button, Form, Input, InputNumber, Modal, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/TriggerStore";

const {Option} = Select
const schemeList = [
    {
        name: "avg(平均值)",
        value: 1
    },
    {
        name: "percentage(百分比)",
        value: 2
    },
    {
        name: "last(最近一个值)",
        value: 3
    },
]

const alarmGrade = [
    {
        name: "灾难",
        value: 1
    },
    {
        name: "严重",
        value: 2
    },
    {
        name: "一般严重",
        value: 3
    },
    {
        name: "告警",
        value: 4
    },
    {
        name: "信息",
        value: 5
    },
    {
        name: "未分类",
        value: 6
    },

];


const AddTrigger = (props) => {

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {addTrigger, findMonitorListById, getTriggerList, monitorList, mediumList} = triggerStore;

    const [monitorData, setMonitorData] = useState([]);

    const [rowData, setRowData] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(async () => {
        const resData = await findMonitorListById({
            hostId: localStorage.getItem("hostId")
        });
        setMonitorData([...resData])
    }, []);

    const handleOk = async () => {
        console.log(form.getFieldsValue())
        form.validateFields().then(async res => {
            await addTrigger({
                hostId: localStorage.getItem("hostId"),
                name: res.name,
                monitorId: res.monitorId,
                state: 1,
                operator: res.operator,
                numericalValue: res.numericalValue,
                mediumIds: res.mediumType,
                severityLevel: res.severityLevel,
                describe: res.describe,
                source: rowData.source,
                expression: res.expression,
                rangeTime: res.rangeTime,
                percentage: res.percentage,
                scheme: res.scheme
            });
            await getTriggerList();
        })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
    };

    function conversionMonitorType(monitorSource) {
        switch (monitorSource) {
            case 1:
                return "主机";
            case 2:
                return "模板";
        }
    }

    return (
        <>
            <div onClick={showModal}>
                新建触发器
            </div>
            <Modal
                title="新建触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
                width={800}
            >
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
                    layout="vertical"
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
                                message: '触发器名称!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="触发器名称"/>
                    </Form.Item>
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
                        <Input.TextArea placeholder="请输入触发器表达式"/>
                    </Form.Item>

                    <Form.Item
                        label="请选择触发方案"
                        name="scheme"
                        rules={[
                            {
                                required: true,
                                message: '请选择触发方案!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择触发方案"
                            allowClear
                        >
                            {
                                schemeList.map(item => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="选择时间范畴"
                        name="rangeTime"
                        rules={[
                            {
                                required: true,
                                message: '选择时间范畴(单位为分钟)!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="分钟" min={0}/>
                    </Form.Item>
                    <Form.Item
                        label="百分比达到多少进行触发"
                        name="percentage"
                        rules={[
                            {
                                required: true,
                                message: '百分比达到多少进行触发',
                            },
                        ]}
                    >
                        <InputNumber placeholder="数据百分比" min={1} max={100}/>
                    </Form.Item>
                    <Form.Item
                        label="消息通知方案"
                        name="mediumType"
                        rules={[
                            {
                                required: true,
                                message: '请选择消息通知方案!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            maxTagCount="responsive"
                            placeholder="请选择您的消息通知方案"
                            allowClear
                        >
                            {
                                mediumList && mediumList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="严重性"
                        name="severityLevel"
                        rules={[
                            {
                                required: true,
                                message: '严重性!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="严重性选择"
                            allowClear
                        >
                            {
                                alarmGrade.map(item => {
                                    return <Option value={item.value} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="问题描述"
                        name="describe"
                        rules={[
                            {
                                required: true,
                                message: '问题描述!',
                            },
                        ]}
                    >
                        <Input placeholder="问题描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddTrigger;