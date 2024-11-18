import {AutoComplete, Drawer, Form, Input, InputNumber, message, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/InMonitorStore";

const {Option} = Select

const InUpdateMonitor = (props) => {


    const {isModalOpen, setIsModalOpen, form, columnData} = props;

    const {
        updateMonitor,
        findMonitorPage,
        findItemList
    } = monitorStore;

    const [monitorItemList, setMonitorItemList] = useState([]);

    const [itemId, setItemId] = useState();

    useEffect(async () => {
        const res = await findItemList({internetType: localStorage.getItem("internetType"), isOptional: 1})
        setMonitorItemList(res)
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    function onSecondCityChange(value, option) {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    }

    const handleBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    internetId: localStorage.getItem("internetId"),
                    id: columnData.id,
                    monitorItemId: itemId,
                };
                obj[field] = values[field];

                await updateMonitor(obj);

                await findMonitorPage();
            })
        } catch (errorInfo) {
            message.warning("修改失败")
        }
    };

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
                name="basic"
                autoComplete="off"
                form={form}
                layout="vertical"
                labelAlign={"left"}
                preserve={false}
            >
                <Form.Item
                    label="监控项名称"
                    name="name"
                    rules={[{required: true, message: '监控项名称!'}]}
                >
                    <Input onBlur={() => handleBlur('name')}/>
                </Form.Item>

                <Form.Item
                    label="监控指标"
                    name="expression"
                    rules={[{required: true, message: '监控项指标!'}]}
                >
                    <AutoComplete
                        placeholder="监控项指标"
                        allowClear
                        value={monitorItemList.id}
                        onChange={onSecondCityChange}
                        onBlur={() => handleBlur('expression')}
                    >
                        {
                            monitorItemList && monitorItemList.map(item => (
                                <Option value={item.expression} key={item.id}>{item.expression}({item.describe})</Option>
                            ))
                        }
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    label="数据保留时间"
                    name="retentionTime"
                    rules={[{required: true, message: '请输入数据保留时间!'}]}
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

export default InUpdateMonitor;