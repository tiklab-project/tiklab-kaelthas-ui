import {Form, Input, message, Modal, Select} from 'antd';
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

    function changeDataType(value, option) {
        const dataType = [];
        option && option.map(item => {
            dataType.push(item?.children[4])
        })
        const set = [...new Set(dataType)]
        if (set.length !== 1) {
            message.warning('选择了不同数据类型的监控项')
        }
    }

    return (
        <>
            <div onClick={showModal}>
                新建图形
            </div>
            <Modal
                destroyOnClose={true}
                title="新建图形"
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
                        label="图表名称"
                        name="name"
                        rules={[{required: true, message: '请输入图形名称!'}]}
                    >
                        <Input allowClear={true} placeholder="图形名称"/>
                    </Form.Item>
                    <Form.Item
                        label="监控项"
                        name="monitorIds"
                        rules={[{required: true, message: '监控项!'}]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="监控项多选只能配置同种数据类型"
                            allowClear
                            showSearch
                            maxTagCount={"responsive"}
                            onChange={changeDataType}
                        >
                            {
                                monitorList && monitorList.map(item => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}{"(来源 "}{item.source === 1 ? "主机" : "模板"}{" 数据类型 "}{item?.monitorItem.reportType}{")"}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="问题描述"
                        name="describe"
                        rules={[{required: false, message: '问题描述!'}]}
                    >
                        <Input allowClear={true} placeholder="问题描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(AddGraphics);