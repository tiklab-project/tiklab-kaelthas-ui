import {Form, Input, message, Modal, Select} from 'antd';
import React, {useState} from 'react';
import {observer} from "mobx-react";
import customizeStore from "../store/CustomizeStore";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select
const AddCustomize = (props) => {
    const {dbId}=props
    const {
        createCustomize,
        findCustomizePage,
        setSearchCondition
    } = customizeStore;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        values.dbId = dbId

        await createCustomize(values)

        await setSearchCondition({
            dbId: dbId
        })
        await findCustomizePage();

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function changeDataType(value, option) {

    }

    return (
        <>
            <div onClick={showModal}>
                新建SQL
            </div>
            <Modal
                destroyOnClose={true}
                title="新建SQL"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
            >
                <Form
                    name="addMonitorForm"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                    layout="vertical"
                    preserve={false}
                >
                    <Form.Item
                        label="表达式"
                        name="expression"
                        rules={[{required: true, message: '表达式!'}]}
                    >
                        <Input allowClear={true} placeholder="表达式"/>
                    </Form.Item>
                    <Form.Item
                        label="SQL语句"
                        name="statementSql"
                        rules={[{required: true, message: 'SQL语句!'}]}
                    >
                        <TextArea allowClear={true} placeholder="SQL语句"/>
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="describe"
                        rules={[{required: false, message: '描述!'}]}
                    >
                        <Input allowClear={true} placeholder="描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(AddCustomize);
