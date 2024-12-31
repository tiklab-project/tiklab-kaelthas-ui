import {Drawer, Form, Input, message, Select} from 'antd';
import React, {useEffect} from 'react';
import graphicsStore from "../store/GraphicsStore";
import {observer} from "mobx-react";

const {Option} = Select

const UpdateGraphics = (props) => {

    const {form, isModalOpen, setIsModalOpen, columnData,hostId} = props;

    const {
        updateGraphics,
        findGraphics,
        setSearchCondition,
        monitorList
    } = graphicsStore;

    const handleOk = () => {
        setIsModalOpen(false);
    };


    const handBlur = async (field) => {
        try {
            const values = await form.validateFields([field]);
            // 假设此处调用 API 进行保存
            form.validateFields().then(async () => {
                let obj = {
                    id: columnData.id,
                };
                obj[field] = values[field];

                await updateGraphics(obj);
                message.success("修改成功")

                await setSearchCondition({
                    hostId:hostId
                })
                await findGraphics();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    }

    return (
        <Drawer
            title="编辑图形"
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
            >
                <Form.Item
                    label="图形名称"
                    name="name"
                    rules={[{required: true, message: '请输入图形名称!'}]}
                >
                    <Input onBlur={() =>handBlur('name')}/>
                </Form.Item>
                <Form.Item
                    label="监控项"
                    name="monitorIds"
                    rules={[{required: true, message: '请选择监控项!'}]}
                >
                    <Select
                        mode="multiple"
                        placeholder="请选择监控项"
                        allowClear
                        showSearch
                        maxTagCount={"responsive"}
                        onChange={() => handBlur('monitorIds')}
                    >
                        {
                            monitorList && monitorList.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}{"(来源  "}{item.source === 1 ? "主机" : "模板"}{" 数据类型--"}{item?.monitorItem.reportType}{")"}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="图形描述"
                    name="describe"
                    rules={[{required: false, message: '图形描述!'}]}
                >
                    <Input onBlur={() =>handBlur('describe')}/>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default observer(UpdateGraphics);
