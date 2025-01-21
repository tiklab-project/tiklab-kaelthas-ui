import {Modal, Form, Input, Select, InputNumber, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import dbMonitorStore from "../store/DbMonitorStore";

const {Option} = Select


const DbAddMonitor = (props) => {
    const {dbId}=props
    const {
        findItemListByType,
        createDbMonitor,
        findDbMonitorPage,
        expression
    } = dbMonitorStore;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        const fieldsValue = await form.validateFields();
        fieldsValue.dbId = dbId;
        await createDbMonitor(fieldsValue).then(res=>{
            if (res.code===0){
                message.success("创建成功")
                findDbMonitorPage();
            }else {
                message.success("创建失败")
            }
        })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };





    return (
        <>
            <div onClick={showModal}>
                新建监控项
            </div>
            <Modal
                destroyOnClose={true}
                title="新建监控项"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                okText="确定"
                cancelText="取消"
                centered
                bodyStyle={{maxHeight: '400px', overflowY: 'auto'}}
            >
                <Form
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    preserve={false}
                    initialValues={{status: 1}}
                >
                    <Form.Item
                        label="监控项名称"
                        name="name"
                        rules={[{required: true, message: '请输入监控项名称!'}]}
                    >
                        <Input allowClear={true} placeholder="监控项名称"/>
                    </Form.Item>

                    <Form.Item
                        label="采集数据库名称"
                        name="datName"
                        rules={[{required: false, message: '请输入采集数据库名称!'}]}
                    >
                        <Input allowClear={true} placeholder="不输入默认采集所有数据库总和指标"/>
                    </Form.Item>
                    <Form.Item
                        label="监控指标"
                        name="dbItemId"
                        rules={[{required: true, message: '监控项指标'}]}
                    >
                        <Select
                            placeholder="监控项指标"
                            allowClear
                            value={expression.id}
                        >
                            {
                                expression && expression.map((item) => (
                                    <Option value={item.id}
                                            key={item.id}>{item.expression}({item.describe})</Option>))
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="数据保留时间"
                        name="retentionTime"
                        rules={[{required: true, message: '数据保留时间!'}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    <Form.Item
                        label="监控项状态"
                        name="status"
                        rules={[{required: true, message: '请选择监控项状态!'}]}
                    >
                        <Select
                            placeholder="请选择您的监控项状态"
                            allowClear
                        >
                            <Option value={1} key={1}>{"开启"}</Option>
                            <Option value={2} key={2}>{"关闭"}</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(DbAddMonitor);
