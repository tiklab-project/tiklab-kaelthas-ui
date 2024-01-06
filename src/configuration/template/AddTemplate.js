import {Button, Form, Modal} from 'antd';
import React, {useState} from 'react';
import AddTemplateForm from "./AddTemplateForm";

const AddMonitor = (props) => {

    const {dataList,setDataList} = props;

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        form.validateFields().then(res=>{

            dataList.push({
                key: Math.random(),
                templateName: res.templateName,
                monitorNum: Math.floor(Math.random()*10 + 5),
                triggerNum: Math.floor(Math.random()*5),
            })

            setDataList([...dataList]);
        })

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
                        <AddTemplateForm dataList={dataList} setDataList={setDataList} form={form}/>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;