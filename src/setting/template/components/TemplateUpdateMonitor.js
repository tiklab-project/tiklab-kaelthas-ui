import {Button, Modal, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../host/monitor/store/MonitorStore";
import {withRouter} from "react-router";
import templateSettingStore from "../store/TemplateSettingStore";
import {observer} from "mobx-react";

const {Option} = Select


const TemplateAddMonitor = (props) => {

    const {form, rowData, isUpdateModalOpen, setIsUpdateModalOpen, monitorId} = props;

    const [monitorItemList, setMonitorItemList] = useState([]);

    const {findMonitorItemByName} = monitorStore;

    const {updateTemplateMonitor, findMonitorByTemplateId} = templateSettingStore;

    const handleOk = async () => {
        form.validateFields().then(async res => {
            await updateTemplateMonitor({
                id: monitorId,
                name: res.name,
                templateId: rowData.id,
                type: res.monitorType,
                monitorItemId: res.expression,
                intervalTime: res.intervalTime,
                dataRetentionTime: res.dataRetentionTime,
                source: 1,
                monitorStatus: res.monitorStatus
            })
            await findMonitorByTemplateId(rowData.id);
        })

        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('监控项添加成功')
    }


    const handleProvinceChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setMonitorItemList([...resData])

    };
    const onSecondCityChange = (value) => {
        console.log(value)
    };

    return (
        <>
            <Modal title="编辑监控项" open={isUpdateModalOpen} onOk={handleOk} onCancel={handleCancel}
                   visible={isUpdateModalOpen}
                   cancelText="取消" okText="确定" afterClose={addDataForMonitor}>
                <div className="addMonitorForm">
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
                    >
                        <Form.Item
                            label="监控项名称"
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
                            >
                                <Option value="CPU" key={1}>CPU</Option>
                                <Option value="IO" key={2}>IO</Option>
                                <Option value="memory" key={3}>memory</Option>
                            </Select>

                        </Form.Item>

                        <Form.Item
                            label="监控指标"
                            name="expression"
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
                            >
                                {
                                    monitorItemList && monitorItemList.map((item) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="数据保留时间"
                            name="dataRetentionTime"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入数据保留时间!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="更新间隔"
                            name="intervalTime"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入更新间隔!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="监控状态"
                            name="monitorStatus"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择监控项指标!',
                                },
                            ]}
                        >

                            <Select
                                placeholder="请选择监控项状态"
                                allowClear
                                onChange={onSecondCityChange}
                            >

                                <Option value={1} key={1}>{"启用"}</Option>))
                                <Option value={2} key={2}>{"未启用"}</Option>))

                            </Select>

                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default withRouter(observer(TemplateAddMonitor));