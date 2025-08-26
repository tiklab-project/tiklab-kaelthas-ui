import {Drawer, Form, Input, message, Select} from 'antd';
import React, {useEffect} from 'react';
import graphicsStore from "../store/DbGraphicsStore";
import {observer} from "mobx-react";

const {Option} = Select

const DbUpdateGraphics = (props) => {

    const {form, isModalOpen, setIsModalOpen, columnData,dbId} = props;

    const {
        updateGraphics,
        findGraphicsPage,
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
                    dbId:dbId
                };
                obj[field] = values[field];

                await updateGraphics(obj).then(res=>{
                    if (res.code===0){
                        //message.success("修改成功")
                        setSearchCondition({hostId: dbId})
                        findGraphicsPage();
                    }else {
                        console.error('Validation failed:', res.msg);
                        message.warning("修改失败")
                    }
                })
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
                                    {item.name}
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

export default observer(DbUpdateGraphics);
