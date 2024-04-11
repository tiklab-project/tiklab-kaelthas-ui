import {Button, Drawer, Form, Input, InputNumber, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import graphicsStore from "../store/GraphicsStore";

const {Option} = Select

const UpdateGraphics = (props) => {

    const {isModalOpen, setIsModalOpen} = props;

    const {columnData, setColumnData} = props;

    const {form} = props;

    const [monitorList, setMonitorList] = useState([]);

    const {updateGraphicsStoreById, getGraphicsStoreList, findMonitorListById, setSearchCondition} = graphicsStore;

    useEffect(async () => {
        setSearchCondition({
            hostId: localStorage.getItem("hostId"),
            reportType: 2
        })
        const resMonitorList = await findMonitorListById()
        setMonitorList([...resMonitorList])
    }, []);

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
                source: res.source
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

    return (
        <Drawer
            title="编辑图形"
            placement="right"
            onClose={handleOk}
            open={isModalOpen}
            visible={isModalOpen}
            width={500}
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background:"transparent"}}
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
                        allowClear
                        showSearch
                    >

                        {
                            monitorList && monitorList.map(item => (
                                <Option key={item.id}
                                        value={[item.id, item.monitorSource]}>{item.name}{"  来源  "}{conversionMonitorType(item.monitorSource)}</Option>
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
        </Drawer>
    );
};

export default UpdateGraphics;