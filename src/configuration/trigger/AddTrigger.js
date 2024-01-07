import {Button, Form, Modal} from 'antd';
import React, {useState} from 'react';
import AddTriggerForm from "./AddTriggerForm";

const AddTrigger = (props) => {
    const {dataList, setDataList} = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        form.validateFields().then(res => {
            dataList.push(
                {
                    key: Math.random(),
                    triggerName: res.triggerName,
                    isTemplate: '否',
                    triggerExpression: res.triggerExpression,
                    messageType: res.messageType,
                    alarmType: res.alarmType,
                    description: res.description,
                }
            )
            setDataList([...dataList])
        })

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建触发器
            </Button>
            <Modal
                title="新建/编辑 触发器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={isModalOpen}
                cancelText="取消"
                okText="确定"
            >
                <div className="addMonitorForm">
                    <div>
                        <AddTriggerForm form={form} dataList={dataList} setDataList={setDataList}/>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddTrigger;