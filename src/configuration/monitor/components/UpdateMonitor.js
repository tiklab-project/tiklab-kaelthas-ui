import {Button, Modal, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/MonitorStore";

const {Option} = Select

const UpdateMonitor = (props) => {
    const {setListData, listData} = props;

    const {form} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {columnData, setColumnData} = props;

    const {updateMonitorById, findMonitorItemByName, findMonitorCondition} = monitorStore;

    const monitorType = ['CPU监控', 'IO监控', '内存监控'];

    const [monitorItemList, setMonitorItemList] = useState([]);

    /*const showModal = () => {
        setIsModalOpen(true);
    };*/

    // form.setFieldsValue(columnData)
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /*useEffect(() => {
        form.setFieldsValue(columnData)
    }, []);*/

    const handleOk = () => {
        setIsModalOpen(false);

        form.validateFields().then(async res => {

            await updateMonitorById({

                id: columnData.id,
                name: res.name,
                type: res.monitorType,
                monitorItemId: res.expression,
                intervalTime: res.intervalTime,
                dataRetentionTime: res.dataRetentionTime,
                monitorSource: 1,
                monitorStatus: 1
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
                                options={monitorType && monitorType.map((province) => ({
                                    label: province,
                                    value: province,
                                }))}
                            >
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
                                        <Option value={item.id}>{item.name}</Option>
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
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default UpdateMonitor;