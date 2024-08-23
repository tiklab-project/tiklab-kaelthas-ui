import {Modal, Form, Input, Select, InputNumber} from 'antd';
import React, {useState} from 'react';
import {observer} from "mobx-react";
import dbMonitorStore from "../store/DbMonitorStore";

const {Option} = Select


const DbAddMonitor = (props) => {

    const {
        findItemListByType,
        createDbMonitor,
        findDbMonitorPage
    } = dbMonitorStore;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = [{name: 'Postgres', value: 1}, {name: 'MYSQL', value: 2}, {name: '自定义', value: 3}];

    const [expression, setExpression] = useState([]);

    const dbId = localStorage.getItem("dbId");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        const fieldsValue = await form.validateFields();
        fieldsValue.dbId = dbId;
        await createDbMonitor(fieldsValue);
        await findDbMonitorPage();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleProvinceChange = async (value) => {
        switch (value) {
            case 1:
                const postgresql = await findItemListByType({
                    dbType:"Postgresql"
                });
                setExpression(postgresql)
                break
            case 2:
                const mysql = await findItemListByType({
                    dbType:"MYSQL"
                });
                setExpression(mysql)
                break
            case 3:
                break

        }
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
                        label="监控类型"
                        name="monitorType"
                        rules={[{required: true, message: '监控项类型'}]}
                    >
                        <Select
                            placeholder="监控类型"
                            allowClear
                            onChange={handleProvinceChange}
                        >
                            {
                                provinceData && provinceData.map(item => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))
                            }
                        </Select>
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