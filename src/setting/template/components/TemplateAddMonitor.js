import {Button, Modal, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../host/monitor/store/MonitorStore";
import templateStore from "../../../host/template/store/TemplateStore";
import {withRouter} from "react-router";
import templateSettingStore from "../store/TemplateSettingStore";

const {Option} = Select


const TemplateAddMonitor = (props) => {

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [expression, setExpression] = useState([]);

    const {findMonitorItemByName} = monitorStore;

    const {addTemplateMonitor} = templateStore;

    const {findTemplateMonitorByTemplateId} = templateSettingStore;

    const {rowData,monitorList,setMonitorList} = props;

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {

        form.validateFields().then(async res => {
            await addTemplateMonitor({
                name: res.monitorName,
                type: res.monitorType,
                monitorItemId: res.monitorExpression,
                intervalTime: res.interval,
                dataRetentionTime: res.dataRetentionPeriod,
                monitorSource: 2,
                monitorStatus: 1,
                templateId: rowData.id
            })

            const resData = await findTemplateMonitorByTemplateId(rowData.id);

            setMonitorList([...resData.data])

        })

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('监控项添加成功')
    }


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
            <Button type="primary" onClick={showModal}>
                新建监控项
            </Button>
            <Modal title="新建监控项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
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
                            name="monitorName"
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
                                // value={expression.id}
                                onChange={onSecondCityChange}
                            >
                                {
                                    expression && expression.map((item) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>))
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
                            <Input/>
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
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="监控状态"
                            name="monitorStatus"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择是否启用!',
                                },
                            ]}
                        >

                            <Select
                                placeholder="请选择是否启用"
                                allowClear
                                onChange={onSecondCityChange}
                            >

                                <Option value={1} key={1}>{"启用"}</Option>))
                                <Option value={2} key={2}>{"关闭"}</Option>))

                            </Select>

                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default withRouter(TemplateAddMonitor);