import {AutoComplete, Drawer, Form, Input, InputNumber, message, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import kuMonitorStore from "../store/KuMonitorStore";

const {Option} = Select

const KuUpdateMonitor = (props) => {

    const provinceData = [
        {name: 'all', value: 1},
        {name: 'cluster', value: 2},
        {name: 'node', value: 3},
        {name: 'service', value: 4}
    ];

    const {isModalOpen, setIsModalOpen, form, columnData,kuId} = props;

    const {
        updateKuMonitor,
        findKuMonitorPage,
        findItemList
    } = kuMonitorStore;

    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();

    useEffect(async () => {
        const newVar = await findItemList({dbType: null});
        setExpression(newVar)
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    kuId: kuId,
                    id: columnData.id,
                    kuItemId: itemId
                };
                obj[field] = values[field];

                await updateKuMonitor(obj);
                await findKuMonitorPage();
            })
        } catch (errorInfo) {
            message.warning("修改失败")
        }
    };

    async function handleChange(value) {
        switch (value) {
            case 1:
                const all = await findItemList({
                    kubernetesType: "all"
                });
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
            case "4":
                const service = await findItemList({
                    kubernetesType: "service"
                });
                setExpression(service)
                break;

            default:
                const itemList = await findItemList({
                    kubernetesType: null
                });
                setExpression(itemList)
                break

        }
    }

    function updateChangeItem(value, option) {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    }

    return (
        <Drawer
            title="编辑监控项"
            placement="right"
            onClose={handleOk}
            open={isModalOpen}
            visible={isModalOpen}
            width={500}
            maskStyle={{background: "transparent"}}
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
                    <Input onBlur={() => handleBlur('name')}/>
                </Form.Item>

                <Form.Item
                    label="监控类型"
                    name="monitorType"
                    rules={[{required: true, message: '监控项类型'}]}
                >
                    <Select
                        placeholder="监控类型"
                        allowClear
                        onChange={handleChange}
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
                    onChange={updateChangeItem}
                >
                    <AutoComplete
                        placeholder="监控项指标"
                        allowClear
                        onBlur={() => handleBlur('expression')}
                    >
                        {
                            expression && expression.map((item) => (
                                <Option value={item.expression} key={item.id}>{item.expression}({item.describe})</Option>))
                        }
                    </AutoComplete>
                </Form.Item>

                <Form.Item
                    label="数据保留时间"
                    name="retentionTime"
                    rules={[{required: true, message: '数据保留时间!'}]}
                >
                    <InputNumber onBlur={() => handleBlur('retentionTime')} min={1}/>
                </Form.Item>
                <Form.Item
                    label="监控项状态"
                    name="status"
                    rules={[{required: true, message: '请选择监控项状态!'}]}
                >
                    <Select
                        placeholder="请选择您的监控项状态"
                        allowClear
                        onBlur={() => handleBlur('status')}
                    >
                        <Option value={1} key={1}>{"开启"}</Option>
                        <Option value={2} key={2}>{"关闭"}</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default KuUpdateMonitor;
