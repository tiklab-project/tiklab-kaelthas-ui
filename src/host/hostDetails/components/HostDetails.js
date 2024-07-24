import React, {useEffect, useState} from 'react';
import "./HostDetails.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row} from "antd";
import hostStore from "../store/HostStore";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";

const HostDetails = (props) => {

    const {findHostById, findHostDynamicPage, hostDynamicList, setNullCondition} = hostStore;

    const [dataList, setDataList] = useState({});

    useEffect(async () => {
        const hostId = localStorage.getItem("hostId");

        setNullCondition({
            pageParam: {
                pageSize: 10,
                currentPage: 1,
            },
            hostId: hostId
        })

        await findHostDynamicPage();

        const resData = await findHostById(hostId)

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

        setDataList({...resData})
    }, [localStorage.getItem("hostId")]);

    function goDynamicList() {
        props.history.push(`/hostList/${localStorage.getItem("hostId")}/hostDynamic`)
    }

    return (
        <Row className="box-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-host-survey">
                    <div className="box-host-body-head">
                        <span className="box-host-title">主机详情</span>
                        <div className="box-host-details">
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                <span className={`user-big-icon mf-icon-${dataList?.color}`}>{dataList?.name?.substring(0, 1).toUpperCase()}</span>
                                    <div className="box-host-details-text">
                                        <div className="item-top">{dataList?.name}</div>
                                        <div className="item-bottom">主机名称</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostIp"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top">{dataList?.ip}</div>
                                        <div className="item-bottom">主机ip</div>
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
                                        <div className="item-bottom">主机状态</div>
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
                            <div className="box-host-margin-details">
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
                            </div>
                        </div>
                    </div>
                    <div className="box-host-body">
                        <div className="host-news">
                            <div>主机最新动态</div>
                            <div className="more" onClick={() => goDynamicList()}>
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>
                        </div>
                        <div className="host-news-List">
                            {
                                hostDynamicList.dataList && hostDynamicList.dataList.length > 0 ? hostDynamicList.dataList.map(item => {
                                        return (
                                            <div className="host-news-Line" key={item.id}>
                                                <div>{item.name}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        )
                                    })
                                    :
                                    <Empty /*images="src/assets/images/nodata.png"*/ description="暂时没有动态~"/>
                            }
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(HostDetails));