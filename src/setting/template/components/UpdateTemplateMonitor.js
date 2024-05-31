import {Button, Modal, Form, Input, Select, Drawer, AutoComplete} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../host/monitor/store/MonitorStore";
import templateSettingStore from "../store/TemplateSettingStore";
import {observer} from "mobx-react";

const {Option} = Select


const UpdateTemplateMonitor = (props) => {

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const {form, rowData, isUpdateModalOpen, setIsUpdateModalOpen, monitorId} = props;

    const [monitorItemList, setMonitorItemList] = useState([]);

    const [itemId, setItemId] = useState();

    const {findMonitorItemByName} = monitorStore;

    const {updateTemplateMonitor, findMonitorByTemplateId,setMonitorSearchCondition} = templateSettingStore;

    const handleOk = async () => {
        form.validateFields().then(async res => {
            await updateTemplateMonitor({
                id: monitorId,
                name: res.name,
                hostId: localStorage.getItem("templateId"),
                type: res.monitorType,
                monitorItemId: itemId,
                expression: res.expression,
                intervalTime: res.intervalTime,
                dataRetentionTime: res.dataRetentionTime,
                source: 2,
                monitorStatus: res.monitorStatus
            })

            await setMonitorSearchCondition({
                templateId:localStorage.getItem("templateId")
            })

            await findMonitorByTemplateId();

        })

        setIsUpdateModalOpen(false);
    };

    const handleProvinceChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setMonitorItemList([...resData])

    };

    function changeExpression(value,option) {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    }

    return (
        <>
            <div className="addMonitorForm">
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
                        layout="vertical"
                        labelAlign={"left"}
                    >
                        <Form.Item
                            label="监控项名称"
                            name="name"
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
                            name="expression"
                            rules={[{required: true, message: '请选择监控项指标!'}]}
                        >
                            <AutoComplete
                                placeholder="请选择监控项指标"
                                allowClear
                                value={monitorItemList.id}
                                onChange={changeExpression}
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
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="更新间隔"
                            name="intervalTime"
                            rules={[{required: true, message: '请输入更新间隔!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="监控状态"
                            name="monitorStatus"
                            rules={[{required: true, message: '请选择监控项指标!'}]}
                        >
                            <Select
                                placeholder="请选择监控项状态"
                                allowClear
                            >
                                <Option value={1} key={1}>{"启用"}</Option>))
                                <Option value={2} key={2}>{"未启用"}</Option>))
                            </Select>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        </>
    );
};

export default observer(UpdateTemplateMonitor);