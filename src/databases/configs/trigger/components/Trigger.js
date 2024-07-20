import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Col, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import triggerStore from "../store/TriggerStore";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import UpdateTrigger from "./UpdateTrigger";
import HideDelete from "../../../../common/hideDelete/HideDelete";

const Trigger = (props) => {

    const {
        getTriggerList,
        deleteTriggerById,
        setSearchCondition,
        total,
        triggerList,
        getMediumAllList,
        mediumList,
        searchCondition
    } = triggerStore;


    const [rowData, setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(async () => {

    }, []);

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        await getTriggerList();
    };

    const deleteTrigger = async (id) => {

    }

    const rowEcho = (record) => {

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
            dataIndex: 'mediumIds',
            id: 'mediumIds',
            width:"15%",
            ellipsis:"true",
            render: (mediumIds) => (
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
            )
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

        await getTriggerList();
    }

    return (
        <Row className="box-trigger-right">
            <Col style={{marginLeft:10}}>
                <div className="box-trigger-title">
                    <div className="box-trigger-title-text">
                        触发器数量:{0}
                    </div>
                    <div className="trigger-kind-search-div">
                        <div>
                            <Input
                                onPressEnter={(event) => searchName(event)}
                                className="trigger-kind-search"
                                placeholder="触发器名称"
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="trigger-top-right">
                            <AddTrigger/>
                        </div>
                    </div>
                </div>
                <div className="box-trigger-table">
                    <UpdateTrigger form={form}
                                   rowData={rowData} setRowData={setRowData}
                                   isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                   mediumList={mediumList}
                    />
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        // dataSource={triggerList}
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
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Trigger));