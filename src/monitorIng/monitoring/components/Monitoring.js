import React, {useEffect, useState} from 'react';
import {Form, Input, Pagination, Table, Tabs} from "antd";
import "./MonitorIng.scss"
import monitoringStore from "../store/MonitoringStore";
import {withRouter} from "react-router-dom";
import MonitoringDetails from "../../monitoringDetails/components/MonitoringDetails";

const Monitoring = (props) => {

    const [listData, setListData] = useState([]);

    const [monitorData, setMonitorData] = useState([]);

    const {
        findHostPage, findInformationByMonitorId, setSearchCondition,
        searchCondition, total,
        findPageHost
    } = monitoringStore;

    const host = (record) => {
        console.log("路由跳转到监控项详情中")
        props.history.push(`/monitoringList/${record.id}/monitoringDetails`);
        localStorage.setItem('hostIdForMonitoring', record.id);
        localStorage.setItem("hostName",record.name)
        localStorage.setItem("ip",record.ip)
    }

    useEffect(async () => {

        const resData = await findHostPage();
        setListData([...resData])

    }, []);


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
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
        },
        {
            title: '可用性',
            dataIndex: 'usability',
            key: 'usability',
            render: (usability) => {
                let config = {
                    1: "可用",
                    2: "不可用",
                    3: "未知"
                }
                return config[usability];
            }
        },
        /*{
            title: '模板数量',
            dataIndex: 'templateNum',
            key: 'templateNum',
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            key: 'monitorNum',
        },*/
        {
            title: '监控数据数量',
            dataIndex: 'countMonitor',
            key: 'countMonitor',
        },
        /*{
            title: '图形数量',
            dataIndex: 'graphicNum',
            key: 'graphicNum',
        },*/
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];


    async function checkTabHost(value) {

        switch (value) {
            case "1":
                value = 1
                break
            case "2":
                value = 2
                break
            case "3":
                value = null
                break
        }
        setSearchCondition({
            usability: value,
            name: ""
        });
        const resData = await findHostPage()

        setListData([...resData])
    }

    async function checkPage(page, pageSize) {
        setSearchCondition({
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            },
            monitorName: ""
        })

        const newVar = await findInformationByMonitorId();

        setMonitorData([...newVar])
    }

    async function searchByName(event) {
        setSearchCondition({
            hostName: event.target.value
        })
        const newVar = await findHostPage();

        setListData([...newVar])
    }

    return (

        <div className="monitoring">
            <div className="monitoring-body">
                {/*<div className="monitoring-content">
                    <div className="monitoring-content-title">

                    </div>
                </div>*/}
                <div className="monitoring-alarm-table">
                    <Tabs defaultActiveKey="3" onTabClick={(activeKey) => checkTabHost(activeKey)}>
                        <Tabs.TabPane tab="全部" key="3">
                            <div className="monitoring-table-title">主机列表</div>
                            <div className="monitoring-search">
                                <div>
                                    <Input placeholder="根据主机名称进行查询" onPressEnter={(event) => searchByName(event)}/>
                                </div>
                            </div>
                            <div className="monitoring-alarm-table-list">
                                <Table
                                    rowKey={record => record.id}
                                    columns={columns}
                                    dataSource={listData}
                                    pagination={false}
                                />
                                <div className="details-pagination">
                                    <Pagination
                                        current={searchCondition.pageParam.currentPage}
                                        pageSize={searchCondition.pageParam.pageSize}
                                        showSizeChanger={true}
                                        total={total}
                                        onChange={(page, pageSize) => checkPage(page, pageSize)}
                                    />
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="可用" key="1">
                            <div className="monitoring-table-title">主机列表</div>
                            <div className="monitoring-search">
                                <div>
                                    <Input placeholder="根据主机名称进行查询" onPressEnter={(event) => searchByName(event)}/>
                                </div>
                            </div>
                            <div className="monitoring-alarm-table-list">
                                <Table rowKey={record => record.id} columns={columns} dataSource={listData}/>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="不可用" key="2">
                            <div className="monitoring-table-title">主机列表</div>
                            <div className="monitoring-search">
                                <div>
                                    <Input placeholder="根据主机名称进行查询" onPressEnter={(event) => searchByName(event)}/>
                                </div>
                            </div>
                            <div className="monitoring-alarm-table-list">
                                <Table rowKey={record => record.id} columns={columns} dataSource={listData}/>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
};

export default withRouter(Monitoring);