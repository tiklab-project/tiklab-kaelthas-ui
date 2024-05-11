import React, {useEffect, useState} from "react";
import AddHost from "./AddHost";
import "./Configuration.scss"
import {Col, Input, Pagination, Row, Table, Tag} from "antd";
import configurationStore from "../store/ConfigurationStore";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";


const Configuration = (props) => {

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
        console.log("路由跳转到host")
        props.history.push(`/hostList/${record.id}/hostDetails`);
        localStorage.setItem('hostId', record.id);
        localStorage.setItem("url", `/hostList/${record.id}/hostDetails`)

        //添加到临时表当中
        await createHostRecent({
            hostId: record.id
        })
    }

    function checkTemplate(record) {
        localStorage.setItem("url", `/hostList/${record.id}/template`)
        localStorage.setItem('hostId', record.id);
        props.history.push(`/hostList/${record.id}/template`)
    }

    function checkMonitor(record) {
        localStorage.setItem("url", `/hostList/${record.id}/monitor`)
        localStorage.setItem('hostId', record.id);
        props.history.push(`/hostList/${record.id}/monitor`)
    }

    function checkTrigger(record) {
        localStorage.setItem("url", `/hostList/${record.id}/trigger`)
        localStorage.setItem('hostId', record.id);
        props.history.push(`/hostList/${record.id}/trigger`)
    }

    function checkGraphic(record) {
        localStorage.setItem("url", `/hostList/${record.id}/graphics`)
        localStorage.setItem('hostId', record.id);
        props.history.push(`/hostList/${record.id}/graphics`)
    }

    function converType(usability) {

        /*let colorTag;

        let textTag;

        switch (usability) {
            case 1:
                colorTag = "blue"
                textTag = "主机连通"
                break
            case 2:
                colorTag = "red"
                textTag = "主机不可用"
                break
            case 3:
                colorTag = "#ebebeb"
                textTag = "未知"
                break
            case 4:
                colorTag = "red"
                textTag = "异常"
                break

        }
        return <Tag color={colorTag}>{textTag}</Tag>*/


        if (usability === 1){
            return <Tag color={"blue"}>正常</Tag>
        }

        if (usability === 2){
            return <div>
                <Tag color={"red"}>异常</Tag><span>(暂时无法连接)</span>
            </div>
        }

    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <div style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</div>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        /*{
            title: '主机状态',
            dataIndex: 'state',
            key: 'state',
            render: (state) => {
                let config = {
                    1: "启用",
                    2: "未启用",
                }
                return config[state];
            }
        },*/
        {
            title: '主机状态',
            dataIndex: 'usability',
            key: 'usability',
            render: (usability, record) => <div style={{cursor: "pointer"}}
                                                onClick={() => host(record)}>{converType(usability)}</div>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            key: 'monitorNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => checkMonitor(record)}>{text}</div>,
        },
        {
            title: '触发器数量',
            dataIndex: 'triggerNum',
            key: 'triggerNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => checkTrigger(record)}>{text}</div>,
        },
        {
            title: '模板数量',
            dataIndex: 'templateNum',
            key: 'templateNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => checkTemplate(record)}>{text}</div>,
        },
        {
            title: '图形数量',
            dataIndex: 'graphicNum',
            key: 'graphicNum',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => checkGraphic(record)}>{text}</div>,
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
                            主机配置
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
                                placeholder="根据主机名称进行查询"
                                className="box-configuration-body-search"
                                onPressEnter={(event) => searchName(event)}
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

export default withRouter(observer(Configuration));