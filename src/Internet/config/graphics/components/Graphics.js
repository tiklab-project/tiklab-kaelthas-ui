import React, {useEffect, useState} from 'react';
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Col, Form, Input, Row, Space, Table, Tag} from "antd";
import graphicsStore from "../store/GraphicsStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UpdateGraphics from "./UpdateGraphics";
import HideDelete from "../../../../common/hideDelete/HideDelete";

const Graphics = (props) => {

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        findGraphicsPage,
        
        setSearchCondition,
        deleteGraphics,
        findMonitorListById,
        graphicsList,
        total,
        searchCondition,
        findMonitorIds
    } = graphicsStore;

    useEffect(async () => {
        await setSearchCondition({
            internetId: localStorage.getItem("internetId"),
        })

        await findGraphicsPage();

        await findMonitorListById();

    }, []);

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        await findGraphicsPage();
    };

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        await findGraphicsPage();
    }

    const deleteByGraphics = async (id) => {
        await deleteGraphics(id);
        await findGraphicsPage();
    };

    const updateGraphicsColumn = async (record) => {

        //点击的时候查询当前图形的监控项ids
        const monitorList = await findMonitorIds(record.id);

        record.monitorIds = monitorList;

        setColumnData(record)
        form.setFieldsValue(record);

        setIsModalOpen(true);

    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'name',
            id: 'name',
            width:"30%",
            ellipsis: true,
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: '监控数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
            width:"20%",
            ellipsis: true,
            render: (text, record) => (
                <Tag>
                    {record.monitorNum}
                </Tag>
            )
        },
        {
            title: '监控描述',
            dataIndex: 'describe',
            id: 'describe',
            width:"30%",
            ellipsis: true,
        },
        {
            title: '操作',
            id: 'action',
            width:"10%",
            ellipsis: true,
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteByGraphics(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },
    ];

    return (
        <Row className="box-graphics-right">
            <Col>
                <div className="box-graphics-title">

                </div>
                <div className="graphics-kind-options">
                    <div className="box-graphics-title-text">
                        图形的数量:<span className="count-graphics">{total}</span>
                    </div>
                    <div className="box-graphics-title-div">
                        <div>
                            <Input placeholder="图形名称"
                                   className="graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="graphics-top-right">
                            <AddGraphics/>
                        </div>
                    </div>
                </div>
                <div className="box-graphics-table">
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

export default withRouter(observer(Graphics));