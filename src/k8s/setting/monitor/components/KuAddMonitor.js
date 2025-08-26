import {Modal, Form, Input, Select, InputNumber, AutoComplete} from 'antd';
import React, {useState} from 'react';
import {observer} from "mobx-react";
import kuMonitorStore from "../store/KuMonitorStore";

const {Option} = Select


const KuAddMonitor = (props) => {
    const {kuId}=props

    const {findItemList, createKuMonitor, findKuMonitorPage} = kuMonitorStore;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const provinceData = [
        {name: 'all', value: 1},
        {name: 'cluster', value: 2},
        {name: 'node', value: 3},
        {name: 'service', value: 4}
    ];

    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();



    const showModal = async () => {
        const itemList = await findItemList({});
        setExpression(itemList)
        setIsModalOpen(true);
    };

    const handleOk = async () => {

        const fieldsValue = await form.validateFields();
        fieldsValue.kuId = kuId;
        fieldsValue.kuItemId = itemId;
        await createKuMonitor(fieldsValue);
        await findKuMonitorPage();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleProvinceChange = async (value) => {
        switch (value) {
            case 1:
                const all = await findItemList();
                setExpression(all)
                break
            case 2:
                const cluster = await findItemList({
                    kubernetesType: "cluster"
                });
                setExpression(cluster)
                break
            case 3:
                const node = await findItemList({
                    kubernetesType: "node"
                });
                setExpression(node)
                break
            case 4:
                const service = await findItemList({
                    kubernetesType: "service"
                });
                setExpression(service)
                break

        }
    };


    function onChangeItem(value, option) {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    }

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
                    initialValues={{status: 1, monitorType: 1}}
                >
                    <Form.Item
                        label="监控项名称"
                        name="name"
                        rules={[{required: true, message: '请输入监控项名称!'}]}
                    >
                        <Input allowClear={true} placeholder="监控项名称"/>
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
                        name="expression"
                        rules={[{required: true, message: '监控项指标'}]}
                    >
                        <AutoComplete
                            placeholder="监控项指标"
                            allowClear
                            value={expression.id}
                            onChange={onChangeItem}
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
                        <InputNumber min={1} max={31536000}/>
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

export default observer(KuAddMonitor);
