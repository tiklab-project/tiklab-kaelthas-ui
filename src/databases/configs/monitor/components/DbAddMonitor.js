import {Modal, Form, Input, Select, InputNumber} from 'antd';
import React, {useState} from 'react';
import {observer} from "mobx-react";
import TextArea from "antd/es/input/TextArea";
import dbMonitorStore from "../store/DbMonitorStore";

const {Option} = Select


const DbAddMonitor = (props) => {

    const {
        findMonitorItemAll
    } = dbMonitorStore;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = [{name: '系统指标', value: 1}, {name: '自定义', value: 2}];

    const [expression, setExpression] = useState([]);

    const dbId = localStorage.getItem("dbId");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        const fieldsValue = form.getFieldsValue();
        fieldsValue.dbId = dbId;
        console.log(fieldsValue);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleProvinceChange = async (value) => {
        switch (value) {
            case 1:
                const newVar = await findMonitorItemAll();
                setExpression(newVar)
                break
            case 2:
                break

        }
    };

    const onSecondCityChange = (value, option) => {

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
                bodyStyle={{maxHeight: '400px', overflowY: 'auto'}}
            >
                <Form
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    preserve={false}
                    initialValues={{status: 1}}
                >
                    <Form.Item
                        label="监控项名称"
                        name="name"
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
                        >
                            {
                                provinceData && provinceData.map(item => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="监控指标"
                        name="dbItemId"
                        rules={[{required: true, message: '监控项指标'}]}
                    >
                        <Select
                            placeholder="监控项指标"
                            allowClear
                            value={expression.id}
                            onChange={onSecondCityChange}
                        >
                            {
                                expression && expression.map((item) => (
                                    <Option value={item.id}
                                            key={item.id}>{item.expression}({item.describe})</Option>))
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="数据保留时间"
                        name="retentionTime"
                        rules={[{required: true, message: '数据保留时间!'}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    <Form.Item
                        label="监控项状态"
                        name="status"
                        rules={[{required: true, message: '请选择监控项状态!'}]}
                    >
                        <Select
                            placeholder="请选择您的监控项状态"
                            allowClear
                            onBlur={() => handleBlur('monitorStatus')}
                        >
                            <Option value={1} key={1}>{"开启"}</Option>
                            <Option value={2} key={2}>{"关闭"}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(DbAddMonitor);