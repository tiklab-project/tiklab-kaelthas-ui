import {Button, Modal, Form} from 'antd';
import React, {useState} from 'react';
import AddMonitorForm from "./AddMonitorForm";

const AddMonitor = (props) => {
    const {setListData, listData} = props;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        form.validateFields().then(res => {
            listData.push(
                {
                    key: Math.random(),
                    dataRetentionPeriod: res.dataRetentionPeriod,
                    monitorName: res.monitorName,
                    monitorType: res.monitorType,
                    isTemplate: '否',
                    interval: res.interval,
                    monitorExpression:res.monitorExpression,
                    status:'启动',
                }
            )

            setListData([...listData])

        })

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addDataForMonitor = () => {
        console.log('监控项添加成功')
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新建监控项
            </Button>
            <Modal title="新建监控项" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定" afterClose={addDataForMonitor}>
                <div className="addMonitorForm">
                    <div>
                        <AddMonitorForm setListData={setListData} listData={listData} form={form}/>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default AddMonitor;