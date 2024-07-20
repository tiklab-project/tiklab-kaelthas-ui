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

    useEffect(async () => {

    }, []);

    const searchName = async (e) => {
    };


    const deleteGraphics = async (id) => {

    };

    const updateGraphicsColumn = async (record) => {

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
            dataIndex: 'monitorNum',
            id: 'monitorNum',
            render: (text, record) => (
                <Tag>
                    {record.monitorIds.length}
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
                        deleteFn={() => deleteGraphics(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },
    ];

    return (
        <Row className="box-graphics-right">
            <Col style={{marginLeft:10}}>
                <div className="box-graphics-title">

                </div>
                <div className="graphics-kind-options">
                    <div className="box-graphics-title-text">
                        图形的数量:{0}
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
                               // dataSource={graphicsList}
                               className="custom-table"
                               // onChange={changePage}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: 10,
                                   showSizeChanger: true,
                                   pageSize: 10,
                                   current: 1,
                               }}
                        />
                    </>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Graphics));