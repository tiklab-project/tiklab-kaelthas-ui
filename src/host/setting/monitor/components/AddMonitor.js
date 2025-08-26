import {Modal, Form, Input, Select, InputNumber, AutoComplete, message} from 'antd';
import React, {useState} from 'react';
import monitorStore from "../store/MonitorStore";
import {observer} from "mobx-react";
import Modals from "../../../../common/modal/Modals";
import Btn from "../../../../common/btn/Btn";

const {Option} = Select


const AddMonitor = (props) => {
    const {hostId,visible,setVisible}=props
    const [form] = Form.useForm();


    const provinceData = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [expression, setExpression] = useState([]);

    const [itemId, setItemId] = useState();

    const {
        findMonitorItemByName,
        createMonitor,
        findMonitorCondition
    } = monitorStore;

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        values.hostId = hostId;
        values.source = 1;
        values.monitorStatus = 1;
        values.monitorItemId = itemId;
        const resData = await createMonitor(values);
        if (resData.data === null) {
            message.warning("已经创建过相同监控项了!")
        }else {
            message.success("添加成功!")
        }

        await findMonitorCondition();

        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };


    const handleProvinceChange = async (value) => {
        //根据名称查询item中的表达式
        const resData = await findMonitorItemByName(value)

        setExpression([...resData])

    };

    const onSecondCityChange = (value, option) => {
        if (option.key !== undefined && option.key !== null) {
            setItemId(option.key)
        }
    };


    const modalFooter = (
        <>
            <Btn onClick={handleCancel} title={'取消'} isMar={true}/>
            <Btn onClick={handleOk} title={'确定'} type={'primary'}/>
        </>
    )

    return (
        <Modals
            visible={visible}
            onCancel={handleCancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"新建监控项"}
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
                    label="监控类型"
                    name="type"
                    rules={[{required: true, message: '监控项类型'}]}
                >
                    <Select
                        placeholder="监控类型"
                        allowClear
                        onChange={handleProvinceChange}
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
                                <Option value={item.name} key={item.id}>{item.name}({item.dataSubclass})</Option>))
                        }
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    label="数据保留时间"
                    name="dataRetentionTime"
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
                        allowClear
                    >
                        <Option value={1} key={1}>{"开启"}</Option>
                        <Option value={2} key={2}>{"关闭"}</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modals>
    );
};

export default observer(AddMonitor);
