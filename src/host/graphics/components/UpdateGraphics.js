import {Drawer, Form, Input, Select} from 'antd';
import React, {useEffect} from 'react';
import graphicsStore from "../store/GraphicsStore";
import {observer} from "mobx-react";

const {Option} = Select

const UpdateGraphics = (props) => {

    const {form, isModalOpen, setIsModalOpen, columnData} = props;

    const {
        updateGraphics,
        findGraphics,
        setSearchCondition,
        monitorList
    } = graphicsStore;

    const handleOk = () => {
        form.validateFields().then(async res => {
            await updateGraphics({
                id: columnData.graphicsId,
                describe: res.describe,
                name: res.name,
                monitorIds: res.monitorIds
            })

            await setSearchCondition({
                hostId: localStorage.getItem("hostId")
            })

            await findGraphics();
        })
        setIsModalOpen(false);
    };

    const conversionMonitorType = (type) => {

        switch (type) {
            case 1:
                return "主机";
            case 2:
                return "模板";
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
            contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
            maskStyle={{background: "transparent"}}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                form={form}
                layout="vertical"
                labelAlign={"left"}
            >
                <Form.Item
                    label="图表名称"
                    name="name"
                    rules={[{required: true, message: '请输入图表名称!'}]}
                >
                    <Input/>
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
                    >
                        {
                            monitorList && monitorList.map(item => (
                                <Option key={item.id} value={item.id}>{item.name}{"  来源  "}{conversionMonitorType(item.source)}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="问题描述"
                    name="describe"
                    rules={[{required: false, message: '问题描述!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default observer(UpdateGraphics);