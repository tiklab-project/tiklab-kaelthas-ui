import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';

const UpdateGraphics = (props) => {

    const {dataList, setDataList} = props;

    const {isModalOpen, setIsModalOpen} = props;

    const {columnData, setColumnData} = props;

    const {form} = props;

    console.log('columnData:', columnData)

    /*const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };*/

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        dataList.forEach((item, index) => {
            if (item.key === columnData.key) {
                dataList.splice(index, 1)
            }
        })
        setDataList([...dataList])

        form.validateFields().then(res => {

            console.log('图表表单数据:', res)
            console.log("res:", res)

            dataList.push({
                key: Math.random(),
                graphicsName: res.graphicsName,
                width: res.width,
                height: res.height,
            })

            setDataList([...dataList]);
        })


    };


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
                                name="graphicsName"
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
                                    /*onChange={onGenderChange}*/
                                    allowClear
                                >
                                    <Option value="system.cpu(internal,time)">system.cpu(internal,time)</Option>
                                    <Option value="system.cpu(process,time)">system.cpu(process,time)</Option>
                                    <Option value="system.cpu(process,c)">system.cpu(process,c)</Option>
                                    <Option value="system.cpu(idle,c)">system.cpu(idle,c)</Option>
                                    <Option value="system.cpu(IO,c)">system.cpu(IO,c)</Option>
                                </Select>

                            </Form.Item>


                            <Form.Item
                                label="问题描述"
                                name="description"
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