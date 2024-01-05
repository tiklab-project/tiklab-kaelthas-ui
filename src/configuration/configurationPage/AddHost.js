import {Button, Form, Modal} from 'antd';
import React, {useState} from 'react';
import AddHostForm from "./AddHostForm";

const AddHost = (props) => {

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
                    name: res.name,
                    ip: res.ip,
                    status: res.status,
                    availability: '可用',
                    templateCount: 3,
                    monitorCount: 3,
                    triggerCount: 1,
                    graphics: 1,
                    createTime: '三天前',
                }
            )

            setDataList([...dataList])
        });


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
            <Modal title="新建主机" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定">
                <div className="addHostForm">
                    <AddHostForm form={form} setDataList={setDataList} dataList={dataList}/>
                </div>
            </Modal>
        </>
    );
};
export default AddHost;