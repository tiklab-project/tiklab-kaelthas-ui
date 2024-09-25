import React, {useEffect, useState} from 'react';
import "./InternetOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline} from "antd";
import hostStore from "../store/InternetOverviewStore";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";
import DynamicWidget from "./DynamicWidget";

const InternetOverview = (props) => {

    const {findHostById, findHostDynamicPage, hostDynamicList, setNullCondition} = hostStore;

    const hostId = localStorage.getItem("internetId");
    const hostName = localStorage.getItem("internetName");

    const [dataList, setDataList] = useState({});

    useEffect(async () => {

        /*setNullCondition({
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            },
            hostId: hostId
        })

        await findHostDynamicPage();*/

        /*const resData = await findHostById(hostId)

        switch (resData.state) {
            case 1:
                resData.state = "启用";
                break;
            case 2:
                resData.state = "未启用";
                break;
            default:
                resData.state = "未知";
        }

        switch (resData.usability) {
            case 1:
                resData.usability = "可用";
                break;
            case 2:
                resData.usability = "不可用";
                break;
            case 3:
                resData.usability = "未知";
                break;
            default:
                resData.usability = "未知";
        }

        setDataList({...resData})*/
    }, [localStorage.getItem("internetId")]);

    function goDynamicList() {
        props.history.push(`/hostList/${localStorage.getItem("hostId")}/hostDynamic`)
    }

    function subStringTime(time) {
        return time.split(' ')[1];
    }

    return (
        <Row className="box-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-host-survey">
                    <div className="box-host-body-head">
                        <span className="box-host-title">网络详情</span>
                        <div className="box-host-details">
                            {/*<div className="box-host-margin-details">
                            <div className="box-host-margin-div">
                                    <span
                                        className={`user-big-icon mf-icon-${dataList?.color}`}>{dataList?.name?.substring(0, 1).toUpperCase()}</span>
                                <div className="box-host-details-text">
                                    <div className="item-top">{dataList?.name}</div>
                                    <div className="item-bottom">主机名称</div>
                                </div>
                            </div>
                        </div>*/}
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostIp"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top">{dataList?.ip}</div>
                                        <div className="item-bottom">网络ip</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostState"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top">{dataList?.state}</div>
                                        <div className="item-bottom">网络状态</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-monitorNum"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{dataList?.monitorNum}</div>
                                        <div className="item-bottom">监控项数量</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-triggerNum"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{dataList?.triggerNum}</div>
                                        <div className="item-bottom">触发器数量</div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="box-host-margin-details">
                            <div className="box-host-margin-div">
                                <svg className="status-img" aria-hidden="true">
                                    <use xlinkHref="#icon-alarmNum"></use>
                                </svg>
                                <div className="box-host-details-text">
                                    <div className="item-top"
                                         style={{textAlign: "center"}}>{dataList?.alarmNum === null ? 0 : dataList?.alarmNum}</div>
                                    <div className="item-bottom">告警数量</div>
                                </div>
                            </div>
                        </div>*/}
                        </div>
                    </div>
                    <div className="box-host-body">
                        <div className="host-news">
                            <div>最新动态</div>
                            {/*<div className="more" onClick={() => goDynamicList()}>
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>*/}
                        </div>
                        <div className="host-news-List">
                            {/*<Timeline>
                            {
                                hostDynamicList.data && hostDynamicList.data ? hostDynamicList.data.map(item => {
                                        return (
                                            <Timeline.Item key={item.id}>
                                                <div className="host-news-Line">
                                                    <div>{item.time}</div>
                                                    <div className="host-news-name">{item.name}</div>
                                                </div>
                                            </Timeline.Item>
                                        )
                                    })
                                    :
                                    <Empty description="暂时没有动态~"/>
                            }
                        </Timeline>*/}
                            {/*<Timeline>
                                {
                                    hostDynamicList && hostDynamicList ? Object.entries(hostDynamicList).map(([key, value]) => {
                                            return (
                                                <div key={key}>
                                                    <div className="host-news-title">
                                                        <Timeline.Item>
                                                            <div className="host-news-title-text">
                                                                {key}
                                                            </div>
                                                        </Timeline.Item>
                                                    </div>
                                                    {
                                                        value && value.map((valueLine, index) => {
                                                            return (
                                                                <Timeline.Item color="gray" key={index}>
                                                                    <div className="host-news-Line">
                                                                        <div className="host-line-time">{subStringTime(valueLine.time)}</div>
                                                                        <div className="host-news-name">{valueLine.name}</div>
                                                                    </div>
                                                                </Timeline.Item>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                        :
                                        <Empty/>
                                }
                            </Timeline>*/}
                        </div>
                        {/*<DynamicWidget hostId={hostId} hostName={hostName}/>*/}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(InternetOverview));