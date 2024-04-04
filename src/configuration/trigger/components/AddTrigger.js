import {Button, Form, Input, InputNumber, Modal, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import triggerStore from "../store/TriggerStore";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select
const schemeList = [
    {
        name: "avg(平均值)",
        value: 1
    },
    {
        name: "max(最大值)",
        value: 2
    },
    {
        name: "min(最小值)",
        value: 3
    },
    {
        name: "last(最近一个值)",
        value: 4
    },
]
const AddTrigger = (props) => {
    const {dataList, setDataList} = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addTrigger, findMonitorListById, getTriggerList, monitorList} = triggerStore;
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
                mediumType: res.mediumType,
                severityLevel: res.severityLevel,
                describe: res.describe,
                source: rowData.source,
                expression: res.expression
            });
            const resData = await getTriggerList();
            setDataList([...resData.dataList])
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
                width={500}
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
                                required: true,
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
                        <Input placeholder="问题描述"/>
                    </Form.Item>

                    {/*<Form.List name="function">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'first']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing first name',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="First Name" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label="监控项"
                                            name={[name, 'monitorId']}
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
                                            {...restField}
                                            label="范围关系"
                                            name={[name, 'operator']}
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
                                                <Option value={1}>{">"}</Option>
                                                <Option value={2}>{"<"}</Option>
                                                <Option value={3}>{"="}</Option>
                                                <Option value={4}>{">="}</Option>
                                                <Option value={5}>{"<="}</Option>
                                                <Option value={6}>{"<>"}</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            label="值"
                                            name={[name, 'numericalValue']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入数字!',
                                                },
                                            ]}
                                        >
                                            <InputNumber/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item style={{marginRight:0}}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>*/}
                </Form>
            </Modal>
        </>
    );
};

export default AddTrigger;