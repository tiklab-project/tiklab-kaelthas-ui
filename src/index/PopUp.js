import {Button, Modal} from 'antd';
import React, {useState} from 'react';

const PopUp = () => {
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
            <Modal title="新建主机" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default PopUp;