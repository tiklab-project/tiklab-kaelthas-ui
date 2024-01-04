import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import AddMonitorForm from "./AddMonitorForm";

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
                新建监控项
            </Button>
            <Modal title="新建监控项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <div className="addMonitorForm">
                    <div>
                        <AddMonitorForm/>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;