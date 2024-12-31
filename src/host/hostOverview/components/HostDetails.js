import React, {useEffect, useState} from 'react';
import "./HostDetails.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline} from "antd";
import hostStore from "../store/HostStore";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";
import DynamicWidget from "./DynamicWidget";

const HostDetails = (props) => {
    const {match:{params}} = props;

    const {findHostById} = hostStore;

    const [dataList, setDataList] = useState({});

    useEffect(async () => {
        const resData = await findHostById(params.id)

        switch (resData.state) {
            case 1:
                resData.state = "开启";
                break;
            case 2:
                resData.state = "关闭";
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
    }, [params.id]);

    function goDynamicList() {
        props.history.push(`/hostList/${params.id}/hostDynamic`)
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
                        </div>
                    </div>
                    <div className="box-host-body">
                        <div className="host-news">
                            <div>最新动态</div>
                        </div>
                        <div className="host-news-List">
                        </div>
                        <DynamicWidget hostId={params.id} hostName={dataList?.name}/>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(HostDetails));
