import {Modal, Form, Input, Select, InputNumber} from 'antd';
import React, {useState} from 'react';
import {observer} from "mobx-react";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select


const AddMonitor = (props) => {

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = [{name: '系统指标', value: 1}, {name: '自定义', value: 2}];

    const [expression, setExpression] = useState([]);

    const [customize, setCustomize] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        console.log(form.getFieldsValue())
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleProvinceChange = async (value) => {
        switch (value) {
            case 1:
                setCustomize(true)
                break
            case 2:
                setCustomize(false)
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

                    {
                        customize ?
                            <Form.Item
                                label="监控指标"
                                name="monitorExpression"
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
                                            <Option value={item.name}
                                                    key={item.id}>{item.name}({item.dataSubclass})</Option>))
                                    }
                                </Select>
                            </Form.Item>
                            :
                            <div></div>
                    }
                    {
                        !customize ?
                            <Form.Item
                                label="自定义SQL"
                                name="monitorExpression"
                                rules={[{required: true, message: '自定义SQL'}]}
                            >
                                <TextArea/>
                            </Form.Item>
                            :
                            <div></div>
                    }

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