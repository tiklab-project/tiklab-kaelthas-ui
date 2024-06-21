import {Modal, Form, Input, Select, InputNumber, AutoComplete, message} from 'antd';
import React, {useState} from 'react';
import monitorStore from "../store/MonitorStore";
import {observer} from "mobx-react";

const {Option} = Select


const AddMonitor = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();

    const {findMonitorItemByName, addMonitor, findMonitorCondition} = monitorStore;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        form.validateFields().then(async res => {
            const resData = await addMonitor({
                hostId: localStorage.getItem("hostId"),
                name: res.monitorName,
                type: res.monitorType,
                monitorItemId: itemId,
                expression: res.monitorExpression,
                dataRetentionTime: res.dataRetentionPeriod,
                source: 1,
                monitorStatus: 1,
            })
            if (resData.data === null) {
                message.warning("已经创建过相同监控项了!")
            }else {
                message.success("添加成功!")
            }
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

    const onSecondCityChange = (value, option) => {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    };

    return (
        <>
            <div onClick={showModal}>
                新建监控项
            </div>
            <Modal
                destroyOnClose={true}
                title="新建监控项"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                okText="确定"
                cancelText="取消"
                centered
                bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
            >
                <Form
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    preserve={false}
                >
                    <Form.Item
                        label="监控项名称"
                        name="monitorName"
                        rules={[{required: true, message: '请输入监控项名称!'}]}
                    >
                        <Input allowClear={true} placeholder="监控项名称"/>
                    </Form.Item>

                    <Form.Item
                        label="监控类型"
                        name="monitorType"
                        rules={[{required: true, message: '监控项类型'}]}
                    >
                        <Select
                            placeholder="监控类型"
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
                        rules={[{required: true, message: '监控项指标'}]}
                    >
                        <AutoComplete
                            placeholder="监控项指标"
                            allowClear
                            value={expression.id}
                            onChange={onSecondCityChange}
                        >
                            {
                                expression && expression.map((item) => (
                                    <Option value={item.name} key={item.id}>{item.name}---{item.dataSubclass}</Option>))
                            }
                        </AutoComplete>
                    </Form.Item>
                    <Form.Item
                        label="数据保留时间"
                        name="dataRetentionPeriod"
                        rules={[{required: true, message: '数据保留时间!'}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(AddMonitor);