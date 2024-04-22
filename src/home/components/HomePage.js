import React, {useEffect} from "react";
import computerPng from "../../assets/image/dataComputer.png"

import "./HomePage.scss";
import "../../configuration/configurationPage/components/Configuration";
import {connect} from "thoughtware-plugin-core-ui";
import {UserVerify} from "thoughtware-eam-ui";
import {Col, Image, Layout, Row, Table} from "antd";
import {observer} from "mobx-react";
import homeStore from "../store/HomeStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";

const HomePage = (props) => {

    const {findHomeRecentList, hostRecentList,findDynamicList,dynamicList} = homeStore;

    const {findAlarmPage, setNullCondition, alarmPage, total} = alarmPageStore;

    const host = () => {
        props.history.push('/configuration/host')
    }

    function jumpToMonitor(record) {
        localStorage.setItem("hostIdForMonitoring", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "monitoring")
        props.history.push(`/monitoringList/${record.hostId}/monitoringDetails`)
    }

    const columns = [
        {
            title: '主机名称',
            dataIndex: 'hostName',
            /*ellipsis: true,
            width: "20%",*/
            key: 'hostName',
            render: (hostName, record) => <div onClick={() => jumpToMonitor(record)}
                                               style={{cursor: "pointer"}}>{hostName}</div>
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
            key: 'triggerName',
        },
        {
            title: '告警类型',
            dataIndex: 'severityLevel',
            key: 'severityLevel',
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
            title: '告警时间',
            dataIndex: 'alertTime',
            key: 'alertTime',
        },
        {
            title: '解决时间',
            dataIndex: 'resolutionTime',
            key: 'resolutionTime',
        },
        {
            title: '持续时间',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => <div style={{cursor: "pointer"}}>{status === 1 ? "已解决" : "问题"}</div>
        },
    ];

    const dynamicColumns = [
        {
            title: '动态名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
    ]
    useEffect(async () => {
        await findHomeRecentList();
        setNullCondition();
        await findAlarmPage();
        await findDynamicList();
    }, []);

    async function changePage(pagination) {
        setNullCondition(
            {
                pageParam: {
                    pageSize: pagination.pageSize,
                    currentPage: pagination.current,
                }
            }
        )
        await findAlarmPage();
    }

    return (

        <Row className="home">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="home-body">
                    <div className="home-content">
                        <div className="home-content-title">
                            <div className="home-content-title-text">
                                常用主机列表
                            </div>
                        </div>
                        <div className="home-content-detail">
                            {
                                hostRecentList && hostRecentList.map(item => {
                                    return (
                                        <div className="home-content-detail-item" key={item.id}>
                                            <div className="item-title">
                                                <div className="item-title-png">
                                                    <div className={`user-big-icon mf-icon-${item?.color}`}>{item?.hostName?.substring(0, 1).toUpperCase()}</div>
                                                </div>
                                                <div className="item-title-text">
                                                    <span onClick={host}>{item?.hostName}</span>
                                                </div>
                                            </div>
                                            <div className="item-work">
                                                <div className="item-work-item">
                                                    <span className="item-work-label" style={{color: "#999"}}>告警数量</span>
                                                    <span>{item.alarmNum}</span>
                                                </div>
                                                <div className="item-work-item">
                                                    <span className="item-work-label" style={{color: "#999"}}>主机状态</span>
                                                    <span>{item?.state === 1 ? "已启用" : "未启用"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/*<div className="home-alarm-table">
                        <div className="home-table-title">告警信息</div>
                        <div className="home-alarm-table-list">
                            <Table rowKey={record => record.id}
                                   columns={columns}
                                   dataSource={alarmPage}
                                   className="custom-table"
                                   scroll={{
                                       x: 300,
                                   }}
                                   onChange={changePage}
                                   pagination={false}
                            />
                        </div>
                    </div>*/}
                    <div className="home-alarm-table">
                        <div className="home-table-title">动态信息</div>
                        <div className="home-alarm-table-list">
                            {
                                dynamicList&&dynamicList.map(item =>{
                                    return(
                                        <div className="home-alarm-table-line">
                                            <div className="home-alarm-table-div">{item.name}</div>
                                            <div className="home-alarm-table-line">{item.updateTime} </div>
                                        </div>
                                    )
                                })
                            }
                            {/*<Table rowKey={record => record.id}
                                   columns={dynamicColumns}
                                   dataSource={dynamicList}
                                   className="custom-table"
                                   scroll={{
                                       x: 300,
                                   }}
                                   pagination={false}
                            />*/}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const HomeLayout = UserVerify(Layout, '/')

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(observer(HomePage));