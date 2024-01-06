import {Button, Form, Modal} from 'antd';
import React, {useState} from 'react';
import AddGraphicsForm from "./AddGraphicsForm";

const AddGraphics = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        form.validateFields().then(res =>{

            console.log("res:",res)
            dataList.push({
                key: Math.random(),
                graphicsName: res.graphicsName,
                width: res.width,
                height: res.height,
            })

            setDataList([...dataList]);
        })

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {dataList,setDataList} = props;

    const [form] = Form.useForm();

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建图形
            </Button>
            <Modal title="新建图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} cancelText="取消" okText="确定">
                <div className="addMonitorForm">
                    <div>
                        <AddGraphicsForm dataList={dataList} setDataList={setDataList} form={form}/>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddGraphics;