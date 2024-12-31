import {Button, Modal, Form, Input, Select, Drawer, AutoComplete, message, InputNumber} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../host/config/monitor/store/MonitorStore";
import templateSettingStore from "../store/TemplateSettingStore";
import {observer} from "mobx-react";

const {Option} = Select


const UpdateTemplateMonitor = (props) => {

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet.svg'];

    const {form, rowData, isUpdateModalOpen, setIsUpdateModalOpen, monitorId,templateId} = props;

    const [monitorItemList, setMonitorItemList] = useState([]);

    const [itemId, setItemId] = useState();

    const {findMonitorItemByName} = monitorStore;

    const {updateTemplateMonitor, findMonitorByTemplateId, setMonitorSearchCondition} = templateSettingStore;

    const handleOk = async () => {
        form.validateFields().then(async res => {
            await updateTemplateMonitor({
                id: monitorId,
                name: res.name,
                hostId: templateId,
                type: res.monitorType,
                monitorItemId: itemId,
                expression: res.expression,
                intervalTime: res.intervalTime,
                dataRetentionTime: res.dataRetentionTime,
                source: 2,
                monitorStatus: res.monitorStatus
            })

            await setMonitorSearchCondition({
                templateId: templateId
            })

            await findMonitorByTemplateId();

        })

        setIsUpdateModalOpen(false);
    };

    const handleBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    id: monitorId,
                    hostId: templateId,
                    monitorItemId: itemId,
                    source: 2,
                };
                obj[field] = values[field];

                await updateTemplateMonitor(obj);

                await findMonitorByTemplateId();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    }

    const handleProvinceChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setMonitorItemList([...resData])

    };

    function changeExpression(value, option) {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    }

    return (
        <Drawer
            title="编辑监控项"
            placement="right"
            onClose={handleOk}
            open={isUpdateModalOpen}
            visible={isUpdateModalOpen}
            width={500}
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background: "transparent"}}
        >
            <Form
                name="basic"
                autoComplete="off"
                form={form}
                layout="vertical"
                labelAlign={"left"}
                preserve={false}
            >
                <Form.Item
                    label="监控项名称"
                    name="name"
                    rules={[{required: true, message: '监控项名称!'}]}
                >
                    <Input onChange={() => handleBlur('name')}/>
                </Form.Item>
                <Form.Item
                    label="监控类型"
                    name="monitorType"
                    rules={[{required: true, message: '监控项类型!'}]}
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
                    name="expression"
                    rules={[{required: true, message: '监控项指标!'}]}
                >
                    <AutoComplete
                        placeholder="监控项指标"
                        allowClear
                        value={monitorItemList.id}
                        onChange={changeExpression}
                        onBlur={() => handleBlur('expression')}
                    >
                        {
                            monitorItemList && monitorItemList.map((item) => (
                                <Option value={item.name} key={item.id}>{item.name}---{item.dataSubclass}</Option>))
                        }
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    label="数据保留时间"
                    name="dataRetentionTime"
                    rules={[{required: true, message: '请输入数据保留时间!'}]}
                >
                    <InputNumber onBlur={() => handleBlur('dataRetentionTime')} min={1}/>
                </Form.Item>
                <Form.Item
                    label="监控状态"
                    name="monitorStatus"
                    rules={[{required: true, message: '请选择监控项指标!'}]}
                >
                    <Select
                        placeholder="请选择监控项状态"
                        allowClear
                        onBlur={() => handleBlur('monitorStatus')}
                    >
                        <Option value={1} key={1}>{"启用"}</Option>))
                        <Option value={2} key={2}>{"关闭"}</Option>))
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default observer(UpdateTemplateMonitor);
