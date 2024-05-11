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

    const {findHomeRecentList, hostRecentList,findDynamicList,dynamicList,updateHostRecent} = homeStore;

    const {findAlarmPage, setNullCondition} = alarmPageStore;

    const host = async (item) => {
        await updateHostRecent(item)
        sessionStorage.setItem("menuKey", "configuration")
        localStorage.setItem("hostId", item.hostId);
        localStorage.setItem('url', `/hostList/${item.hostId}/hostDetails`)
        props.history.push(`/hostList/${item.hostId}/hostDetails`)
    }

    useEffect(async () => {
        await findHomeRecentList();
        setNullCondition();
        await findAlarmPage();
        await findDynamicList();
    }, []);

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
                                        <div className="home-content-detail-item" onClick={() =>host(item)} key={item.id}>
                                            <div className="item-title">
                                                <div className="item-title-png">
                                                    <div className={`user-big-icon mf-icon-${item?.color}`}>{item?.hostName?.substring(0, 1).toUpperCase()}</div>
                                                </div>
                                                <div className="item-title-text">
                                                    <span>{item?.hostName}</span>
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
                                        <div className="home-alarm-table-line" key={item.id}>
                                            <div className="home-alarm-table-div">{item.name}</div>
                                            <div className="home-alarm-table-line">{item.updateTime} </div>
                                        </div>
                                    )
                                })
                            }
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