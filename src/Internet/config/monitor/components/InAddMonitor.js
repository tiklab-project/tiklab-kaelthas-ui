import {Modal, Form, Input, Select, InputNumber, AutoComplete, message} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/InMonitorStore";
import {observer} from "mobx-react";

const {Option} = Select


const InAddMonitor = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();

    const {
        findItemList,
        createMonitor,
        findMonitorPage
    } = monitorStore;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        const fields = await form.validateFields();

        fields.internetId = localStorage.getItem("internetId");
        fields.internetItemId = itemId;

        const resData = await createMonitor(fields)
        if (resData.data === null) {
            message.warning("已经创建过相同监控项了!")
        } else {
            message.success("添加成功!")
        }
        await findMonitorPage();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(async () => {
        const resData = await findItemList({internetType: localStorage.getItem("internetType"), isOptional: 1})

        setExpression([...resData])
    }, []);

    const onSecondCityChange = (value, option) => {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
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
                >
                    <Form.Item
                        label="监控项名称"
                        name="name"
                        rules={[{required: true, message: '请输入监控项名称!'}]}
                    >
                        <Input allowClear={true} placeholder="监控项名称"/>
                    </Form.Item>
                    <Form.Item
                        label="监控指标"
                        name="expression"
                        rules={[{required: true, message: '监控项指标'}]}
                    >
                        <AutoComplete
                            placeholder="监控项指标"
                            allowClear
                            value={expression.id}
                            onChange={onSecondCityChange}
                        >
                            {
                                expression && expression.map((item) => (
                                    <Option value={item.expression}
                                            key={item.id}>{item.expression}({item.describe})</Option>))
                            }
                        </AutoComplete>
                    </Form.Item>
                    <Form.Item
                        label="数据保留时间"
                        name="retentionTime"
                        rules={[{required: true, message: '数据保留时间!'}]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    <Form.Item
                        label="是否开启"
                        name="status"
                        rules={[{required: true, message: '是否开启!'}]}
                    >
                        <Select
                            placeholder="是否开启"
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

export default observer(InAddMonitor);