import {AutoComplete, Drawer, Form, Input, InputNumber, message, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import monitorStore from "../store/MonitorStore";

const {Option} = Select

const UpdateMonitor = (props) => {

    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const {isModalOpen, setIsModalOpen, form, columnData} = props;

    const {updateMonitorById, findMonitorItemByName, findMonitorCondition, findMonitorItemAll} = monitorStore;

    const [monitorItemList, setMonitorItemList] = useState([]);

    const [itemId, setItemId] = useState();


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const onMonitorChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)
        setMonitorItemList([...resData])
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
                    hostId: localStorage.getItem("hostId"),
                    id: columnData.id,
                    source: 1,
                    monitorItemId: itemId,
                };
                obj[field] = values[field];

                await updateMonitorById(obj);
                await findMonitorCondition();
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
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
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
                    label="监控类型"
                    name="monitorType"
                    rules={[{required: true, message: '监控项类型!'}]}
                >
                    <Select
                        placeholder="请选择您的监控类型"
                        allowClear
                        onChange={onMonitorChange}
                        options={provinceData && provinceData.map((province) => ({
                            label: province,
                            value: province,
                        }))}
                    >
                    </Select>
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
                        onBlur={()=>handleBlur('expression')}
                    >
                        {
                            monitorItemList && monitorItemList.map(item => (
                                <Option value={item.name} key={item.id}>{item.name}({item.dataSubclass})</Option>
                            ))
                        }
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    label="数据保留时间"
                    name="dataRetentionTime"
                    rules={[{required: true, message: '请输入数据保留时间!'}]}
                >
                    <InputNumber onBlur={() => handleBlur('dataRetentionTime')} min={1}/>
                </Form.Item>
                <Form.Item
                    label="监控项状态"
                    name="monitorStatus"
                    rules={[{required: true, message: '请选择监控项状态!'}]}
                >
                    <Select
                        placeholder="请选择您的监控项状态"
                        allowClear
                        onBlur={()=>handleBlur('monitorStatus')}
                    >
                        <Option value={1} key={1}>{"开启"}</Option>
                        <Option value={2} key={2}>{"关闭"}</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default UpdateMonitor;