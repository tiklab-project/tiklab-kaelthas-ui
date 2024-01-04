import { Button, Modal } from 'antd';
import React, { useState } from 'react';
const AddHost = () => {
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
                新建主机
            </Button>
            <Modal title="新建主机" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};
export default AddHost;