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
    const {match:{params}} = props;

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
            internetId: params.id,
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
                <div className="in-graphics-kind-options">
                    <div className="in-box-graphics-title-div">
                            <Input placeholder="图形名称"
                                   className="graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                    </div>
                    <div className="in-graphics-top-right">
                        <AddGraphics {...params} internetId={params.id}/>
                    </div>
                </div>
                <div className="box-graphics-table">
                    <>
                        <UpdateGraphics form={form} isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        columnData={columnData}
                                        internetId={params.id}
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
