import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row, Table, Tag, Tooltip} from "antd";
import "./Databases.scss"
import {SearchOutlined} from "@ant-design/icons";
import databasesStore from "../store/DatabasesStore";
import {observer} from "mobx-react";

const Databases = (props) => {


    const {
        findDbInfoPage,
        updateDbInfo,
        dbPage,
        total,
        searchCondition,
        setSearchCondition,
        setNullCondition
    } = databasesStore

    const [state, setState] = useState(2);

    const availabilityTab = [
        {
            title: '全部',
            key: 2,
            icon: "all"
        },
        {
            title: '可用',
            key: 1,
            icon: "available"
        },
        {
            title: '不可用',
            key: 0,
            icon: "noAvailable"
        }
    ];

    useEffect(async () => {
        setNullCondition();
        await findDbInfoPage()
    }, []);

    async function hrefDatabases(record) {
        props.history.push(`/db/${record.id}/monitoring`);
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefDatabases(record)}>{text}</div>,
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '数据库类型',
            dataIndex: 'dbType',
            key: 'dbType',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (usability, record) => <div style={{cursor: "pointer"}}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (text, record) => <div style={{cursor: "pointer"}}>{conversionColor(text)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    function converType(record) {

        if (record.usability === 0) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1) {
                let messageText;
                if (record.message.length>10){
                    messageText = record.message.substring(0,10)
                    return <div>
                        <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({messageText}...)</Tooltip>
                    </div>
                }
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({record.message})</Tooltip>
                </div>
            }
            if (record.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({record.message}...)</Tooltip>
                </div>
            }
        }

        if (record.usability === 1) {
            return <Tag color={"blue"}>正常</Tag>
        }

    }

    function conversionColor(text) {
        if (text === 0 || text === null) {
            return <Tag color={"blue"}>{0}</Tag>
        } else {
            return <Tag color={"red"}>{text}</Tag>
        }
    }

    async function checkTab(value) {
        setState(value)

        if (value === 2) {
            value = null
        }

        setSearchCondition({
            usability: value,
            name: ""
        });
        await findDbInfoPage();
    }

    function hrefAddDatabases() {
        if (location.pathname !== '/db/addDatabases') {
            props.history.push('/db/addDatabases');
        }
    }

    async function searchDbName(e) {
        const name = e.target.value;
        setSearchCondition({name: name})
        await findDbInfoPage();
    }

    const changePage = async (pagination, filters, sorter) => {

        setSearchCondition({
            pageParam: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
            }
        })

        await findDbInfoPage()
    };

    return (
        <Row className="db-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>

                <div className="db-body">
                    <div className="db-title">
                        <div className="db-title-text">数据库</div>
                        <div className="db-title-add-button" onClick={() => hrefAddDatabases()}>新建数据库</div>
                    </div>
                    <div className="db-type-search">
                        <div className="db-type">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`db-type-text ${state === item.key ? "db-type-text-button-color" : ""}`}
                                        key={item.key}
                                        onClick={() => checkTab(item.key)}
                                    >
                                        {item.title}
                                    </div>
                                })
                            }
                        </div>
                        <div>
                            <Input
                                placeholder="数据源名称"
                                className="box-configuration-body-search"
                                onPressEnter={(event) => searchDbName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="db-table">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={dbPage}
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
                </div>
            </Col>
        </Row>
    );
};

export default observer(Databases);
