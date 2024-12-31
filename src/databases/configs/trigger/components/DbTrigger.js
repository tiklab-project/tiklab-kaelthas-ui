import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./DbTrigger.scss"
import DbAddTrigger from "./DbAddTrigger";
import {Col, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import triggerStore from "../store/DbTriggerStore";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UpdateTrigger from "./DbUpdateTrigger";
import HideDelete from "../../../../common/hideDelete/HideDelete";

const DbTrigger = (props) => {
    const {match:{params}} = props;

    const {
        findDbTriggerPage,
        deleteDbTrigger,
        setSearchCondition,
        total,
        triggerList,
        mediumList,
        searchCondition
    } = triggerStore;


    const [rowData, setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(async () => {
        setSearchCondition({
            dbId: params.id
        })
        await findDbTriggerPage();
    }, []);

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        await findDbTriggerPage();
    };

    const deleteTrigger = async (id) => {
        await deleteDbTrigger(id);
        await findDbTriggerPage();
    }

    const rowEcho = (record) => {
        const split = record.mediumId.split(",");
        record.mediumType = split
        form.setFieldsValue(record)
        setRowData(record)
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'name',
            id: 'name',
            width:"15%",
            ellipsis:"true",
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => rowEcho(record)}>{text}</span>,
        },
        {
            title: '关系表达式',
            dataIndex: 'expression',
            id: 'expression',
            width:"20%",
            ellipsis:"true",
            render: (name) => <span>{name}</span>
        },
        {
            title: '触发方案',
            dataIndex: 'scheme',
            id: 'scheme',
            width:"10%",
            ellipsis:"true",
            render: (mediumType) => {
                let config = {
                    1: "last(最近一个值)",
                    2: "avg(平均值)",
                    3: "percentage(百分比)",
                }
                return config[mediumType];
            }
        },
        {
            title: '消息通知方案',
            dataIndex: 'mediumId',
            id: 'mediumId',
            width:"15%",
            ellipsis:"true",
            render: (mediumId) => {
                if (mediumId == null){
                    return null;
                }
                const mediumIds = mediumId.split(",");
                return (
                    <span>
                    {
                        mediumIds && mediumIds.map(tag => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                let config = {
                                    1: "APP",
                                    2: "企业微信",
                                    3: "站内信",
                                    4: "邮件通知",
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {config[tag]}
                                    </Tag>
                                );
                            }
                        )
                    }
                </span>
                );
            }
        },
        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            id: 'severityLevel',
            width:"10%",
            ellipsis:"true",
            render: (severityLevel) => {
                let config = {
                    1: "灾难",
                    2: "严重",
                    3: "一般严重",
                    4: "告警",
                    5: "信息",
                    6: "未分类",
                }
                return config[severityLevel];
            }
        },
        {
            title: '描述',
            dataIndex: 'describe',
            id: 'describe',
            width:"10%",
            ellipsis:"true",
            render: (name) => <span>{name}</span>
        },
        {
            title: '操作',
            id: 'action',
            width:"10%",
            ellipsis:"true",
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteTrigger(record.id)}
                        operation={"删除"}
                    ></HideDelete>
                </Space>
            ),
        },

    ];

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        await findDbTriggerPage();
    }

    return (
        <Row className="box-trigger-right">
            <Col>
                <div className="db-box-trigger-title">
                    <div className="db-trigger-kind-search-div">
                        <div>
                            <Input
                                onPressEnter={(event) => searchName(event)}
                                className="trigger-kind-search"
                                placeholder="触发器名称"
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="db-trigger-top-right">
                        <DbAddTrigger {...props} dbId={params.id}/>
                    </div>
                </div>
                <div className="box-trigger-table">
                    <UpdateTrigger form={form}
                                   rowData={rowData} setRowData={setRowData}
                                   isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                   mediumList={mediumList}
                                   dbId={params.id}
                    />
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={triggerList}
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
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(DbTrigger));
