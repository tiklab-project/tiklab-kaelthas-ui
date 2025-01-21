import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./InTrigger.scss"
import InAddTrigger from "./InAddTrigger";
import {Col, Form, Input, Row, Space, Table, Tag, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import inTriggerStore from "../store/InTriggerStore";
import InUpdateTrigger from "./InUpdateTrigger";

const InTrigger = (props) => {
    const {match:{params}} = props;

    const {
        findTriggerPage,
        deleteTrigger,
        setSearchCondition,
        getMediumAllList,
        total,
        triggerList,
        mediumList,
        searchCondition
    } = inTriggerStore;


    const [rowData, setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        setSearchCondition({
            internetId: params.id
        })
        await findTriggerPage();
        await getMediumAllList();
    }, []);

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        await findTriggerPage();
    };

    const deleteByTrigger = async (id) => {
        await deleteTrigger(id);
        await findTriggerPage();
    }

    const rowEcho = (record) => {

        if (record?.mediumId === null) {
            return
        }
        record.mediumIds = record?.mediumId?.split(",")
        form.setFieldsValue(record)
        setRowData(record)
        setIsModalOpen(true);
    };

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'name',
            id: 'name',
            width: "15%",
            ellipsis: "true",
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => rowEcho(record)}>{text}</span>,
        },
        {
            title: '关系表达式',
            dataIndex: 'expression',
            id: 'expression',
            width: "20%",
            ellipsis: "true",
            render: (name) => <span>{name}</span>
        },
        {
            title: '触发方案',
            dataIndex: 'scheme',
            id: 'scheme',
            width: "10%",
            ellipsis: "true",
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
            width: "15%",
            ellipsis: "true",
            render: (mediumId) => {
                if (mediumId === null || mediumId === undefined) {
                    return <Tag>
                        无
                    </Tag>
                } else {
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
            }
        },
        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            id: 'severityLevel',
            width: "10%",
            ellipsis: "true",
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
            width: "10%",
            ellipsis: "true",
            render: (name) => <span>{name}</span>
        },
        {
            title: '操作',
            id: 'action',
            width: "10%",
            ellipsis: "true",
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteByTrigger(record.id)}
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

        await findTriggerPage();
    }

    return (
        <Row className="box-in-trigger-right">
            <Col>
                <div className='in-trigger-title'>
                    <div className='in-trigger-title-text'>触发器</div>
                    <div className="in-trigger-top-right">
                        <InAddTrigger {...props} internetId={params.id}/>
                    </div>
                </div>
                <div className="box-in-trigger-title">
                    <div className="in-trigger-kind-search-div">
                            <Input
                                onPressEnter={(event) => searchName(event)}
                                className="in-trigger-kind-search"
                                placeholder="触发器名称"
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                    </div>

                </div>
                <div className="box-in-trigger-table">
                    <InUpdateTrigger form={form}
                                   rowData={rowData} setRowData={setRowData}
                                   isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                   mediumList={mediumList}
                                     internetId={params.id}
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

export default withRouter(observer(InTrigger));
