import {AutoComplete, Drawer, Form, Input, InputNumber, message, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/DbMonitorStore";

const {Option} = Select

const DbUpdateMonitor = (props) => {

    const provinceData = [{name: '系统指标', value: 1}, {name: '自定义', value: 2}];

    const {isModalOpen, setIsModalOpen, form, columnData} = props;

    const {
        updateDbMonitor,
        findDbMonitorPage,
        findMonitorItemAll
    } = monitorStore;

    const [expression, setExpression] = useState([]);

    useEffect(async () => {
        const newVar = await findMonitorItemAll();
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
                    dbId: localStorage.getItem("dbId"),
                    id: columnData.id
                };
                obj[field] = values[field];

                await updateDbMonitor(obj);
                await findDbMonitorPage();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    };

    async function handleChange(value) {
        switch (value) {
            case 1:
                const newVar = await findMonitorItemAll();
                setExpression(newVar)
                break
            case 2:
                /*form.setFieldsValue({
                    dbItemId:null
                })*/
                setExpression([])
                break

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
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background: "transparent"}}
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
                    name="dbItemId"
                    rules={[{required: true, message: '监控项指标'}]}
                >
                    <Select
                        placeholder="监控项指标"
                        allowClear
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

export default DbUpdateMonitor;