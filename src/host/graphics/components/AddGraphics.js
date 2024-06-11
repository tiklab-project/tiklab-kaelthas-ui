import {Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import graphicsStore from "../store/GraphicsStore";
import {observer} from "mobx-react";

const {Option} = Select
const AddGraphics = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        addGraphics,
        monitorList,
        findGraphics,
        setSearchCondition
    } = graphicsStore;

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        form.validateFields().then(async res => {
            await addGraphics({
                hostId: localStorage.getItem("hostId"),
                name: res.name,
                describe: res.describe,
                monitorIds: res.monitorIds,
            });

            await setSearchCondition({
                hostId: localStorage.getItem("hostId")
            })

            await findGraphics();
        })

        setIsModalOpen(false);
    };

    const handleCancel = () => {
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
        <>
            <div onClick={showModal}>
                新建图形
            </div>
            <Modal title="新建图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定"
                   destroyOnClose={true}
            >
                <div className="addMonitorForm">
                    <Form
                        name="addMonitorForm"
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
                        labelAlign={"left"}
                        layout="vertical"
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
                                        <Option key={item.id}
                                                value={item.id}>{item.name}{"  来源--"}{conversionMonitorType(item.source)}{" 数据类型--"}{item?.monitorItem.reportType}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="问题描述"
                            name="describe"
                            rules={[{required: false,message: '问题描述!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default observer(AddGraphics);