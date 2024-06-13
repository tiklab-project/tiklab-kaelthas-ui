import React, {useEffect} from "react";

import "./HomePage.scss";
import "../../host/hostPage/components/Host";
import {Col, Empty, Image, Layout, Row, Table} from "antd";
import homeStore from "../store/HomeStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";

const HomePage = (props) => {

    const {findHomeRecentList, hostRecentList, findDynamicList, dynamicList, updateHostRecent} = homeStore;

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
                                常用主机
                            </div>
                        </div>
                        {
                            hostRecentList.length > 0 ?
                                <div className="home-content-detail">
                                    {
                                        hostRecentList && hostRecentList.map(item => {
                                            return (
                                                <div className="home-content-detail-item" onClick={() => host(item)}
                                                     key={item.id}>
                                                    <div className="item-title">
                                                        <div className="item-title-png">
                                                            <div
                                                                className={`user-big-icon mf-icon-${item?.color}`}>{item?.hostName?.substring(0, 1).toUpperCase()}</div>
                                                        </div>
                                                        <div className="item-title-text">
                                                            <span>{item?.hostName}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item-work">
                                                        <div className="item-work-item">
                                                            <span className="item-work-label"
                                                                  style={{color: "#999"}}>告警数量</span>
                                                            <span>{item.alarmNum}</span>
                                                        </div>
                                                        <div className="item-work-item">
                                                            <span className="item-work-label"
                                                                  style={{color: "#999"}}>主机状态</span>
                                                            <span>{item?.state === 1 ? "已启用" : "未启用"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <Empty/>
                        }

                    </div>
                    <div className="home-alarm-table">
                        <div className="home-table-title">动态信息</div>
                        {
                            dynamicList.length > 0 ?
                                <div className="home-alarm-table-list">
                                    {
                                        dynamicList && dynamicList.map(item => {
                                            return (
                                                <div className="home-alarm-table-line" key={item.id}>
                                                    <div className="home-alarm-table-div">{item.name}</div>
                                                    <div className="home-alarm-table-line">{item.updateTime} </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <Empty/>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default observer(HomePage);