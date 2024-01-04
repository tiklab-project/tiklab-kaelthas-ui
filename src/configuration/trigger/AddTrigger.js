import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import AddTriggerForm from "./AddTriggerForm";

const AddTrigger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建/编辑 触发器
            </Button>
            <Modal title="新建/编辑 触发器" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <div className="addMonitorForm">
                    <div>
                        <AddTriggerForm/>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddTrigger;