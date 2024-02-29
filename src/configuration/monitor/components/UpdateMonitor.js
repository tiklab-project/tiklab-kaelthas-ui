import {Button, Modal, Form, Input, Select, InputNumber} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/MonitorStore";

const {Option} = Select

const UpdateMonitor = (props) => {
    const {setListData, listData} = props;

    const {form} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {columnData, setColumnData} = props;

    const {updateMonitorById, findMonitorItemByName, findMonitorCondition,findMonitorItemAll} = monitorStore;

    const [monitorItemList, setMonitorItemList] = useState([]);

    // form.setFieldsValue(columnData)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const handleOk = () => {
        setIsModalOpen(false);

        form.validateFields().then(async res => {

            await updateMonitorById({
                hostId:localStorage.getItem("hostId"),
                id: columnData.id,
                name: res.name,
                type: res.monitorType,
                monitorItemId: res.expression,
                intervalTime: res.intervalTime,
                dataRetentionTime: res.dataRetentionTime,
                monitorSource: columnData.monitorSource,
                monitorStatus: res.monitorStatus
            });

            const resData = await findMonitorCondition();
            setListData([...resData.dataList])
        })

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('监控项修改成功')
    }

    const onMonitorChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setMonitorItemList([...resData])
    };

    useEffect(async () => {
        const resData = await findMonitorItemAll()

        setMonitorItemList([...resData])
    }, []);


    return (
        <>
            <Modal title="编辑" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定" afterClose={addDataForMonitor}>
                <div className="UpdateMonitorForm">
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
                        onFinishFailed={onFinishFailed}
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
                                onChange={onMonitorChange}
                                allowClear
                            >
                                <Option value={"CPU"} key={1}>{"CPU"}</Option>
                                <Option value={"IO"} key={2}>{"IO"}</Option>
                                <Option value={"memory"} key={3}>{"memory"}</Option>
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
                                /*onChange={onGenderChange}*/
                                allowClear
                            >
                                {
                                    monitorItemList && monitorItemList.map(item => (
                                        <Option value={item.id} key={item.id}>{item.dataSubclass}</Option>
                                    ))
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
                            <InputNumber min={1} defaultValue={1}/>
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
                            <InputNumber min={1} defaultValue={1}/>
                        </Form.Item>

                        <Form.Item
                            label="监控项状态"
                            name="monitorStatus"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择监控项状态!',
                                },
                            ]}
                        >

                            <Select
                                placeholder="请选择您的监控项状态"
                                onChange={onMonitorChange}
                                allowClear
                            >
                                <Option value={1} key={1}>{"开启"}</Option>
                                <Option value={2} key={2}>{"关闭"}</Option>
                            </Select>

                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default UpdateMonitor;