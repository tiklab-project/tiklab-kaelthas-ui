import React, {useEffect} from 'react';
import "./KuOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline} from "antd";
import {observer} from "mobx-react";

const KuOverview = () => {



    return (<Row className="db-ku-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="ku-host-survey">
                    <div className="ku-host-body-head">
                        <span className="ku-host-title">数据库概况</span>
                        <div className="ku-host-details">
                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <span className={`user-big-icon mf-icon-1`}>{"pgsql".substring(0, 1).toUpperCase()}</span>
                                    <div className="ku-host-details-text">
                                        <div className="item-top">{333}</div>
                                        <div className="item-bottom">数据源名称</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-dbType"></use>
                                    </svg>
                                    <div className="ku-host-details-text">
                                        <div className="item-top">{333}</div>
                                        <div className="item-bottom">数据库类型</div>
                                    </div>
                                </div>
                            </div>

                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostState"></use>
                                    </svg>
                                    <div className="ku-host-details-text">
                                        <div className="item-top">{333 === 1 ? "正常":"异常"}</div>
                                        <div className="item-bottom">数据库状态</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-monitorNum"></use>
                                    </svg>
                                    <div className="ku-host-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{333}</div>
                                        <div className="item-bottom">监控项数量</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-triggerNum"></use>
                                    </svg>
                                    <div className="ku-host-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{333}</div>
                                        <div className="item-bottom">触发器数量</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ku-host-margin-details">
                                <div className="ku-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-alarmNum"></use>
                                    </svg>
                                    <div className="ku-host-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{333}</div>
                                        <div className="item-bottom">告警数量</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ku-host-body">
                        <div className="host-news">
                            <div>主机最新动态</div>
                            <div className="more">
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>
                        </div>
                        <div className="host-news-List">
                            <Timeline>
                                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                            </Timeline>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(KuOverview));