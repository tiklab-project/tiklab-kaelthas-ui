import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import graphicsStore from "../store/GraphicsStore";

const {Option} = Select
const AddGraphics = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {addGraphicsStore, findMonitorListById, getGraphicsStoreList} = graphicsStore;

    const {dataList, setDataList} = props;

    const [monitorData, setMonitorData] = useState([]);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        setIsModalOpen(false);

        form.validateFields().then(async res => {

            await addGraphicsStore({
                hostId: localStorage.getItem("hostId"),
                name: res.name,
                width: res.width,
                height: res.height,
                describe: res.describe,
                monitorId: res.monitorId
            });

            getGraphicsStoreList().then((res) => {
                setDataList([...res.dataList])
            })

        })

    };

    useEffect(async () => {
        const resMonitorList = await findMonitorListById(localStorage.getItem("hostId"));
        setMonitorData([...resMonitorList])
    }, []);


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建图形
            </Button>
            <Modal title="新建图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定"
                   destroyOnClose={true}
            >
                <div className="addMonitorForm">
                    <Form
                        name="addMonitorForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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
                            <Input/>
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
                            <Input/>
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
                                placeholder="请选择监控项"
                                /*onChange={onGenderChange}*/
                                allowClear
                            >
                                {
                                    monitorData && monitorData.map(item => (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
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
            </Modal>
        </>
    );
};

export default AddGraphics;