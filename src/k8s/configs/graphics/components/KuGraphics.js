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
    const {match:{params}} = props;
    const {
        findKuGraphicsPage,
        findKuMonitor,
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
            kuId: params.id
        })

        await findKuMonitor(params.id);

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
        const monitorList = await findMonitorIds({graphicsId: record.id});

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
        <Row className="ku-box-graphics-right">
            <Col>
                <div className="ku-graphics-kind-options">
                    <div className="ku-box-graphics-title-div">
                            <Input placeholder="图形名称"
                                   className="ku-graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                    </div>
                    <div className="ku-graphics-top-right">
                        <AddGraphics {...props} kuId={params.id}/>
                    </div>
                </div>
                <div className="ku-box-graphics-table">
                    <>
                        <UpdateGraphics form={form} isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        columnData={columnData}
                                        kuId={params.id}
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
