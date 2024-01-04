import {Button, Modal} from 'antd';
import React, {useState} from 'react';
import AddGraphicsForm from "./AddGraphicsForm";

const AddGraphics = () => {
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
                新建/编辑 图形
            </Button>
            <Modal title="新建/编辑 图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <div className="addMonitorForm">
                    <div>
                        <AddGraphicsForm/>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddGraphics;