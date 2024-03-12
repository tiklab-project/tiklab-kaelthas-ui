import {Button, Form, Input, InputNumber, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import graphicsStore from "../store/GraphicsStore";

const {Option} = Select

const UpdateGraphics = (props) => {

    const {dataList, setDataList} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {columnData, setColumnData} = props;

    const {form} = props;

    const [monitorList, setMonitorList] = useState([]);

    const {updateGraphicsStoreById, getGraphicsStoreList, findMonitorListById,setSearchCondition} = graphicsStore;

    useEffect(async () => {
        setSearchCondition({
            hostId: localStorage.getItem("hostId"),
            reportType: 2
        })
        const resMonitorList = await findMonitorListById()
        setMonitorList([...resMonitorList])
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        form.validateFields().then(async res => {

            await updateGraphicsStoreById({
                id: columnData.id,
                width: res.width,
                height: res.height,
                describe: res.describe,
                name: res.name,
                monitorId: res.monitorId,
                source:res.source
            })

            getGraphicsStoreList().then((res) => {
                setDataList([...res.dataList])
            })
        })


    };

    const conversionMonitorType = (type) => {

        switch (type) {
            case 1:
                return "主机";
            case 2:
                return "模板";
        }

    }

    async function onGenderChange(value) {
        const resMonitorList = await findMonitorListById({
            hostId: localStorage.getItem("hostId"),
            monitorSource: value
        })
        setMonitorList([...resMonitorList])
    }

    return (
        <>
            <Modal title="编辑图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
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
                                label="图表名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入图表名称!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="图表宽度"
                                name="width"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入图表宽度!',
                                    },
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>

                            <Form.Item
                                label="图表高度"
                                name="height"
                                rules={[
                                    {
                                        required: true,
                                        message: '' +
                                            '请输入图表高度!',
                                    },
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>

                            <Form.Item
                                label="监控项"
                                name="monitorId"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择监控项!',
                                    },
                                ]}
                            >

                                <Select
                                    mode="multiple"
                                    placeholder="请选择监控项"
                                    // onChange={onGenderChange}
                                    allowClear
                                    showSearch
                                >

                                    {
                                        monitorList && monitorList.map(item => (
                                            <Option key={item.id} value={[item.id,item.monitorSource]}>{item.name}{"  来源  "}{conversionMonitorType(item.monitorSource)}</Option>
                                        ))
                                    }

                                </Select>

                            </Form.Item>


                            <Form.Item
                                label="问题描述"
                                name="describe"
                                rules={[
                                    {
                                        required: false,
                                        message: '问题描述!',
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

export default UpdateGraphics;