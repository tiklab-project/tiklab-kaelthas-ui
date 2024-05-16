import {Button, Modal, Form, Input, Select, InputNumber} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/MonitorStore";

const {Option} = Select


const AddMonitor = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [expression, setExpression] = useState([]);

    const {findMonitorItemByName, addMonitor, findMonitorCondition} = monitorStore;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        form.validateFields().then(async res => {
            await addMonitor({
                hostId: localStorage.getItem("hostId"),
                name: res.monitorName,
                type: res.monitorType,
                monitorItemId: res.monitorExpression,
                intervalTime: res.interval,
                dataRetentionTime: res.dataRetentionPeriod,
                monitorSource: 1,
                monitorStatus: 1,
            })
            await findMonitorCondition();
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleProvinceChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setExpression([...resData])

    };
    const onSecondCityChange = (value) => {
        console.log(value)
    };

    return (
        <>
            <div onClick={showModal}>
                新建监控项
            </div>
            <Modal title="新建监控项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定" width={800}>
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
                        label="监控项名称"
                        name="monitorName"
                        rules={[
                            {
                                required: true,
                                message: '' +
                                    '请输入监控项名称!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="监控项名称"/>
                    </Form.Item>

                    <Form.Item
                        label="监控类型"
                        name="monitorType"
                        rules={[
                            {
                                required: true,
                                message: '请选择监控项类型!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择您的监控类型"
                            allowClear
                            onChange={handleProvinceChange}
                            options={provinceData && provinceData.map((province) => ({
                                label: province,
                                value: province,
                            }))}
                        >
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label="监控指标"
                        name="monitorExpression"
                        rules={[
                            {
                                required: true,
                                message: '请选择监控项指标!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择监控项指标"
                            allowClear
                            value={expression.id}
                            onChange={onSecondCityChange}
                        >
                            {
                                expression && expression.map((item) => (
                                    <Option value={item.id}>{item.dataSubclass}</Option>))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="数据保留时间"
                        name="dataRetentionPeriod"
                        rules={[
                            {
                                required: true,
                                message: '请输入数据保留时间!',
                            },
                        ]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>

                    <Form.Item
                        label="更新间隔"
                        name="interval"
                        rules={[
                            {
                                required: true,
                                message: '请输入更新间隔!',
                            },
                        ]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default AddMonitor;