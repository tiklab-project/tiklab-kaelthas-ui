import React, {useEffect, useState} from 'react';
import "./DbGraphics.scss"
import AddGraphics from "./DbAddGraphics";
import {Col, Form, Input, Row, Space, Table, Tag} from "antd";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UpdateGraphics from "./DbUpdateGraphics";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import dbGraphicsStore from "../store/DbGraphicsStore";

const DbGraphics = (props) => {

    const {
        findGraphicsPage,
        findAllMonitor,
        graphicsList,
        total,
        searchCondition,
        setSearchCondition,
        deleteGraphics,
        findMonitorIds
    } = dbGraphicsStore;

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        setSearchCondition({
            dbId: localStorage.getItem("dbId")
        })

        await findAllMonitor();

        await findGraphicsPage();
    }, []);

    const searchName = async (e) => {
        setSearchCondition({
            name: e.target.value
        })
        await findGraphicsPage();
    };


    const deleteGraphicsById = async (id) => {
        await deleteGraphics(id);
        await findGraphicsPage();
    };

    const updateGraphicsColumn = async (record) => {
        //点击的时候查询当前图形的监控项ids
        const monitorList = await findMonitorIds({id:record.id});

        record.monitorIds = monitorList
        setColumnData(record)
        form.setFieldsValue(record)
        setIsModalOpen(true)
    };

    const changePage = async (pagination, filters, sorter) => {
        setSearchCondition({
            pageParam: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
            }
        })

        await findGraphicsPage();
    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: '监控数量',
            dataIndex: 'monitorSum',
            id: 'monitorSum',
            render: (text, record) => (
                <Tag>
                    {record.monitorSum}
                </Tag>
            )
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
                        deleteFn={() => deleteGraphicsById(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },
    ];

    return (
        <Row className="db-box-graphics-right">
            <Col>
                <div className="db-box-graphics-title">

                </div>
                <div className="db-graphics-kind-options">
                    <div className="db-box-graphics-title-text">
                        图形的数量：{total}
                    </div>
                    <div className="db-box-graphics-title-div">
                        <div>
                            <Input placeholder="图形名称"
                                   className="db-graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="db-graphics-top-right">
                            <AddGraphics/>
                        </div>
                    </div>
                </div>
                <div className="db-box-graphics-table">
                    <>
                        <UpdateGraphics form={form} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                        columnData={columnData}
                        />

                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={graphicsList}
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

export default withRouter(observer(DbGraphics));