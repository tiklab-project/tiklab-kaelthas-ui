import {Button, Modal, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../../../configuration/monitor/store/MonitorStore";
import templateStore from "../../../configuration/template/store/TemplateStore";
import {withRouter} from "react-router";

const {Option} = Select


const TemplateAddMonitor = (props) => {
    const {setListData, listData} = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = ['CPU', 'IO', 'memory'];

    const [expression, setExpression] = useState([]);

    const {findMonitorItemByName} = monitorStore;

    const {addTemplateMonitor} = templateStore;

    const {rowData} = props;

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {
        form.validateFields().then(res => {
            addTemplateMonitor({
                name: res.monitorName,
                type: res.monitorType,
                monitorItemId: res.monitorExpression,
                intervalTime: res.interval,
                dataRetentionTime: res.dataRetentionPeriod,
                monitorSource: 2,
                monitorStatus: 1,
                templateId:rowData.id
            })

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
                    <div>
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
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
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
                                    options={provinceData && provinceData.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                >
                                    {/*<Option value="CPU信息监控">CPU信息监控</Option>*/}
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
                                            <Option value={item.id}>{item.name}</Option>))
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

                        </Form>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default withRouter(TemplateAddMonitor);