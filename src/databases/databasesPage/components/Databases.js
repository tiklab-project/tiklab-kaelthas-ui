import React, {useState} from 'react';
import {Button, Col, Input, Row, Table, Tag} from "antd";
import "./Databases.scss"
import {SearchOutlined} from "@ant-design/icons";
import TestMonitor from "./TestMonitor";

const Databases = (props) => {

    const [state, setState] = useState(1);

    const availabilityTab = [
        {
            title: '全部',
            key: 0,
            icon: "all"
        },
        {
            title: '可用',
            key: 1,
            icon: "available"
        },
        {
            title: '不可用',
            key: 2,
            icon: "noAvailable"
        }
    ];

    const resultData = [
        {
            id: 1,
            name: "pgsql",
            dbType: "PostgreSQL",
            state: 2,
            alarmNum: 3,
            updateTime: "2024-04-24 20:04:41",
            driverName: "org.postgresql.Driver",
            driverUrl: "jdbc:postgresql://127.0.0.1:5432/xmonitor",
            password: "root",
            testSQL: "select version()",
            username: "root",
            isOpen: "1",
        }
    ]

    function hrefDatabases(record) {
        localStorage.setItem('dbId', record.id);
        localStorage.setItem("url", `/databasesList/${record.id}/databasesDetails`)
        props.history.push(`/databasesList/${record.id}/databasesDetails`);
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
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },

    ];

    function converType(record) {

        if (record.usability === 2) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message})</span>
                </div>
            }
            if (record.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message}...)</span>
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

    function checkTab(key) {
        if (2 === key){
            props.history.push('/testMonitor');
        }
    }

    function hrefAddDatabases() {
        if (location.pathname !== '/databases/addDatabases') {
            props.history.push('/databases/addDatabases');
        }
    }

    const [hostType, setHostType] = useState(1);

    function checkType(number) {
        setHostType(number)
    }

    return (
        <Row className="db-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>

                <div className="db-body">
                    <div className="db-title">
                        <div className="db-title-text">数据库配置</div>
                        <div className="db-title-add-button" onClick={() => hrefAddDatabases()}>新建数据</div>
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
                            {/*<div className="db-type-text" onClick={() => checkTab(1)}>数据库</div>*/}
                            {/*<div className="db-type-text" onClick={() => checkTab(2)}>监控项</div>*/}
                        </div>
                        <div>
                            <Input
                                placeholder="主机名称"
                                className="box-configuration-body-search"
                                // onPressEnter={(event) => searchName(event)}
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
                            dataSource={resultData}
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
                </div>
            </Col>
        </Row>
    );
};

export default Databases;