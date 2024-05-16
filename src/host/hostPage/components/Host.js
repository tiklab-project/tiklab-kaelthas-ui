import React, {useEffect, useState} from "react";
import "./Host.scss"
import {Col, Input, Row, Table, Tag} from "antd";
import configurationStore from "../store/ConfigurationStore";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";


const Host = (props) => {

    const {
        findPageHost,
        setSearchCondition,
        total,
        setHostState,
        hostState,
        resultData,
        setNullCondition,
        searchCondition,
        createHostRecent
    } = configurationStore;

    const {setNullConditionByMonitoring} = alarmPageStore;

    useEffect(async () => {
        setNullCondition()
        await findPageHost()

    }, []);

    const searchName = async (e) => {
        const name = e.target.value;
        setSearchCondition({name: name})
        await findPageHost()
    };

    const host = async (record) => {
        localStorage.setItem('hostId', record.id);
        localStorage.setItem("hostName", record.name);
        localStorage.setItem("url", `/hostList/${record.id}/monitoring`)
        //添加到临时表当中

        await createHostRecent({
            hostId: record.id
        })
        props.history.push(`/hostList/${record.id}/monitoring`);
    }

    function converType(record) {

        if (record.usability === 2) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1){
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message})</span>
                </div>
            }
            if (record.alarmNum > 1){
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

    async function hrefAlarmPage(record) {
        setNullConditionByMonitoring({
            hostName: record.name,
            status: 2
        })

        sessionStorage.setItem("menuKey", "hostAlarm")
        props.history.push(`/alarm`);
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <div style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</div>,
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '主机状态',
            dataIndex: 'usability',
            key: 'usability',
            render: (usability, record) => <div style={{cursor: "pointer"}}
                                                onClick={() => host(record)}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefAlarmPage(record)}>{conversionColor(text)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    const changePage = async (pagination, filters, sorter) => {

        setSearchCondition({
            pageParam: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
            }
        })

        await findPageHost()
    };

    const checkTab = async (value) => {
        setHostState(value)

        if (value === 0) {
            value = null
        }

        setSearchCondition({
            usability: value,
            name: ""
        });
        await findPageHost()
    };

    const availabilityTab = [
        {
            title: '全部',
            key: 0,
            icon: "allHost"
        },
        {
            title: '可用',
            key: 1,
            icon: "availableHost"
        },
        {
            title: '不可用',
            key: 2,
            icon: "noAvailableHost"
        }
    ]

    function hrefAddHost() {
        props.history.push('/configuration/addHost');
    }

    return (
        <Row className='box-configuration-body'>
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-configuration-body-item">
                    <div className="box-configuration-body--title">
                        <div className="box-configuration-title-left">
                            配置
                        </div>
                        <div className="box-configuration-title-right" onClick={() => hrefAddHost()}>
                            新建主机
                        </div>
                    </div>


                    <div className="box-configuration-body-type">
                        <div className="box-configuration-body-tabs">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`box-configuration-body-tabs-item ${hostState === item.key ? "box-configuration-tabs" : ""}`}
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
                                placeholder="主机名称"
                                className="box-configuration-body-search"
                                onPressEnter={(event) => searchName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={resultData}
                            onChange={changePage}
                            scroll={{
                                x: 300,
                            }}
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
    )
}

export default withRouter(observer(Host));