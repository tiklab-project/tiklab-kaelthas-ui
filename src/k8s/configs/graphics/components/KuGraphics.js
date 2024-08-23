import React, {useEffect, useState} from 'react';
import "./KuGraphics.scss"
import AddGraphics from "./KuAddGraphics";
import {Col, Form, Input, Row, Space, Table, Tag} from "antd";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UpdateGraphics from "./KuUpdateGraphics";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import dbGraphicsStore from "../store/KuGraphicsStore";

const KuGraphics = (props) => {

    const {
        findKuGraphicsPage,
        findAllMonitor,
        graphicsList,
        total,
        searchCondition,
        setSearchCondition,
        deleteKuGraphics,
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

        await findKuGraphicsPage();
    }, []);

    const searchName = async (e) => {
        setSearchCondition({
            name: e.target.value
        })
        await findKuGraphicsPage();
    };


    const deleteKuGraphicsById = async (id) => {
        await deleteKuGraphics(id);
        await findKuGraphicsPage();
    };

    const updateGraphicsColumn = async (record) => {
        // 点击的时候查询当前图形的监控项ids
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

        await findKuGraphicsPage();
    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) =>
                <span style={{cursor: "pointer"}} onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: '监控数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
            render: (monitorNum) => (
                <Tag>
                    {monitorNum}
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
                        deleteFn={() => deleteKuGraphicsById(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },
    ];

    return (
        <Row className="db-box-graphics-right">
            <Col style={{marginLeft: 10}}>
                <div className="db-box-graphics-title">

                </div>
                <div className="db-graphics-kind-options">
                    <div className="db-box-graphics-title-text">
                        图形的数量:{total}
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

export default withRouter(observer(KuGraphics));