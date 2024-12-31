import {Drawer, Form, Input, message, Select} from 'antd';
import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import TextArea from "antd/es/input/TextArea";
import customizeStore from "../store/CustomizeStore";

const UpdateCustomize = (props) => {
    const {dbId}=props
    const {form, isModalOpen, setIsModalOpen, columnData} = props;

    const {
        updateCustomize,
        setSearchCondition,
        findCustomizePage
    } = customizeStore;

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

                await updateCustomize(obj);

                message.success("修改成功")

                await setSearchCondition({
                    dbId: dbId
                })
                await findCustomizePage();
            })
        } catch (errorInfo) {
            console.error('Validation failed:', errorInfo);
            message.warning("修改失败")
        }
    }

    return (
        <Drawer
            title="编辑SQL"
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
            >
                <Form.Item
                    label="表达式"
                    name="expression"
                    rules={[{required: true, message: '表达式!'}]}
                >
                    <Input allowClear={true} placeholder="表达式" onBlur={() => handBlur('expression')}/>
                </Form.Item>
                <Form.Item
                    label="SQL语句"
                    name="statementSql"
                    rules={[{required: true, message: 'SQL语句!'}]}
                >
                    <TextArea allowClear={true} placeholder="SQL语句" onBlur={() => handBlur('statementSql')}/>
                </Form.Item>

                <Form.Item
                    label="描述"
                    name="describe"
                    rules={[{required: false, message: '描述!'}]}
                >
                    <Input allowClear={true} placeholder="描述" onBlur={() => handBlur('describe')}/>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default observer(UpdateCustomize);
