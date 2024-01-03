import {Button, Modal} from 'antd';
import React, {useState} from 'react';

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
                新建触发器
            </Button>
            <Modal title="新建触发器" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default AddMonitor;