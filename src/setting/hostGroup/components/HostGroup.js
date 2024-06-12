import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Col, Drawer, Form, Input, InputNumber, Modal, Row, Select, Space, Table} from "antd";
import {observer} from "mobx-react";
import "./HostGroup.scss"
import {SearchOutlined} from "@ant-design/icons";
import hostGroupStore from "../store/HostGroupStore";

const HostGroup = (props) => {

    const {
        searchCondition,
        hostGroupData,
        setSearchCondition,
        setNullCondition,
        findHostGroupPage,
        total,
        createHostGroup,
        deleteHostGroup,
        updateHostGroup
    } = hostGroupStore;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const [hostGroupId, setHostGroupId] = useState();

    useEffect(async () => {
        setNullCondition();
        await findHostGroupPage();
    }, []);

    async function selectHostGroupName(e) {

        setSearchCondition({
            name: e.target.value
        })

        await findHostGroupPage();
    }

    const [open, setOpen] = useState(false);

    const onClose = () => {
        form.validateFields().then(async res => {
            await updateHostGroup({
                id: hostGroupId,
                name: res.name,
                describe: res.describe
            });

            await findHostGroupPage();
        })
        setOpen(false);
    };

    async function selectPage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        await findHostGroupPage();
    }

    const handleOk = () => {
        form.validateFields().then(async res => {
            await createHostGroup({
                name: res.name,
                describe: res.describe,
            })
            await findHostGroupPage();
        })
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    async function deleteHostGroupById(record) {
        await deleteHostGroup(record.id);
        await findHostGroupPage();
    }

    function updateHostGroupById(record) {
        form.setFieldsValue({
            name: record.name,
            describe: record.describe
        })
        setHostGroupId(record.id);
        setOpen(true);
    }

    const columns = [
        {
            title: '主机组名称',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => updateHostGroupById(record)}>{name}</div>
        },
        {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (<Space size="middle">
                    <div style={{cursor: "pointer"}} onClick={() => deleteHostGroupById(record)}>删除</div>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Row className="host-group">
                <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}
                     className="host-group-col">
                    <div className="host-group-head">
                        <div className="host-group-title">主机组</div>
                        <div className="host-group-add" onClick={showModal}>添加主机组</div>
                    </div>
                    <div className="host-group-search">
                        <Input
                            className="host-group-search-input"
                            placeholder="主机组名称"
                            onPressEnter={(e) => selectHostGroupName(e)}
                            allowClear={true}
                            prefix={<SearchOutlined/>}
                        />
                    </div>
                    <div className="host-group-table">
                        <Table rowKey={record => record.id}
                               columns={columns}
                               className="custom-table"
                               dataSource={hostGroupData}
                               onChange={() => selectPage()}
                               scroll={{
                                   x: 400,
                               }}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: total,
                                   showSizeChanger: true,
                                   pageSize: searchCondition.pageParam.pageSize,
                                   current: searchCondition.pageParam.currentPage,
                               }}
                        />
                    </div>
                </Col>
            </Row>

            <Modal title="新建主机组" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                   cancelText="取消" okText="确定" width={800}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                >
                    <Form.Item
                        label="主机组名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '主机组名称!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="主机组名称"/>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="describe"
                        rules={[
                            {
                                required: false,
                                message: '描述!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="描述"/>
                    </Form.Item>

                </Form>
            </Modal>
            <Drawer
                title="修改主机组"
                placement="right"
                onClose={onClose}
                open={open}
                visible={open}
                width={500}
                contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
                maskStyle={{background: "transparent"}}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    labelAlign={"left"}
                >
                    <Form.Item
                        label="主机组名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '主机组名称!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="主机组名称"/>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="describe"
                        rules={[
                            {
                                required: false,
                                message: '描述!',
                            },
                        ]}
                    >
                        <Input allowClear={true} placeholder="描述"/>
                    </Form.Item>

                </Form>
            </Drawer>
        </>
    );
};

export default withRouter(observer(HostGroup));