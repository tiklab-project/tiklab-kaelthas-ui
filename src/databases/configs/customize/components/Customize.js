import React, {useEffect, useState} from 'react';
import {Col, Form, Input, Row, Space, Table, Tag} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import "./Customize.scss"
import AddCustomize from "./AddCustomize";
import UpdateCustomize from "./UpdateCustomize";
import customizeStore from "../store/CustomizeStore";
import {observer} from "mobx-react";

const Customize = () => {

    const {
        findCustomizePage,
        customizePage,
        total,
        searchCondition,
        setSearchCondition,
        deleteCustomize
    } = customizeStore;

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        await findCustomizePage();

    }, []);

    const searchName = async (e) => {
        setSearchCondition({
            describe: e.target.value
        })
        await findCustomizePage();
    };


    const deleteGraphics = async (id) => {
        await deleteCustomize(id)
        await findCustomizePage()
    };

    const updateGraphicsColumn = async (record) => {
        form.setFieldsValue(record)
        setColumnData(record)
        setIsModalOpen(true)
    };

    const changePage = async (pagination, filters, sorter) => {

        setSearchCondition({
            pageParam: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
            }
        })

        await findCustomizePage();
    };

    const columns = [
        {
            title: '监控键值',
            dataIndex: 'expression',
            id: 'expression',
             render: (text, record) =>
                 <span style={{cursor: "pointer"}}
                       onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: 'SQL语句',
            dataIndex: 'statementSql',
            id: 'statementSql'
        },
        {
            title: '监控描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteGraphics(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },
    ];


    return (
        <Row className="box-graphics-right">
            <Col style={{marginLeft: 10}}>
                <div className="box-graphics-title">

                </div>
                <div className="graphics-kind-options">
                    <div className="box-graphics-title-text">
                        自定义SQL数量:{total}
                    </div>
                    <div className="box-graphics-title-div">
                        <div>
                            <Input placeholder="SQL描述"
                                   className="graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="graphics-top-right">
                            <AddCustomize/>
                        </div>
                    </div>
                </div>
                <div className="box-graphics-table">
                    <>
                        <UpdateCustomize form={form} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                         columnData={columnData}
                        />

                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={customizePage}
                               className="custom-table"
                               onChange={changePage}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: total,
                                   showSizeChanger: true,
                                   pageSize: searchCondition.pageParam.pageSize,
                                   current: searchCondition.pageParam.currentPage,
                               }}
                        />
                    </>
                </div>
            </Col>
        </Row>
    );
};

export default observer(Customize);