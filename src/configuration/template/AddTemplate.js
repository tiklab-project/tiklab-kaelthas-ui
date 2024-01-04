import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import AddTemplateForm from "./AddTemplateForm";

const AddMonitor = () => {
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
                添加模板
            </Button>
            <Modal title="添加模板" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <div className="addMonitorForm">
                    <div>
                        <AddTemplateForm/>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;