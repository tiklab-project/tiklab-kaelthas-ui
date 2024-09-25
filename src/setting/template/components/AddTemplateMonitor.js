import {Button, Modal, Form, Input, Select, AutoComplete, InputNumber} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../host/configuration/monitor/store/MonitorStore";
import templateStore from "../../../host/configuration/template/store/TemplateStore";
import {withRouter} from "react-router";
import templateSettingStore from "../store/TemplateSettingStore";
import {observer} from "mobx-react";

const {Option} = Select


const AddTemplateMonitor = (props) => {

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet.svg'];

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();

    const {findMonitorItemByName} = monitorStore;

    const {findMonitorByTemplateId, createMonitor} = templateSettingStore;

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {

        form.validateFields().then(async res => {
            await createMonitor({
                hostId: localStorage.getItem("templateId"),
                name: res.monitorName,
                type: res.monitorType,
                monitorItemId: itemId,
                expression: res.monitorExpression,
                intervalTime: res.interval,
                dataRetentionTime: res.dataRetentionPeriod,
                source: 2,
                monitorStatus: 1
            })

            await findMonitorByTemplateId();

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
            <div className="monitor-add" onClick={showModal}>
                新建监控项
            </div>
            <Modal
                destroyOnClose={true}
                title="新建监控项"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
                centered
                bodyStyle={{maxHeight: '400px', overflowY: 'auto'}}
            >
                <Form
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                    labelAlign={"left"}
                    preserve={false}
                >
                    <Form.Item
                        label="监控项名称"
                        name="monitorName"
                        rules={[{required: true, message: '请输入监控项名称!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="监控类型"
                        name="monitorType"
                        rules={[{required: true, message: '请选择监控项类型!'}]}
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
                        rules={[{required: true, message: '请选择监控项指标!'}]}
                    >
                        <AutoComplete
                            placeholder="请选择监控项指标"
                            allowClear
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
                        rules={[{required: true, message: '请输入数据保留时间!'}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    {/*<Form.Item
                        label="监控状态"
                        name="monitorStatus"
                        rules={[{required: true, message: '请选择是否启用!'}]}
                    >
                        <Select
                            placeholder="请选择是否启用"
                            allowClear
                        >
                            <Option value={1} key={1}>{"启用"}</Option>))
                            <Option value={2} key={2}>{"关闭"}</Option>))
                        </Select>
                    </Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default withRouter(observer(AddTemplateMonitor));