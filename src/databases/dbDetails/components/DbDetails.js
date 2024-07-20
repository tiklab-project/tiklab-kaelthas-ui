import React from 'react';
import "./DbDetails.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row} from "antd";

const DbDetails = () => {

    return (<Row className="box-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-host-survey">
                    <div className="box-host-body-head">
                        <span className="box-host-title">数据库概况</span>
                        <div className="box-host-details">
                            {/*<div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                <span className={`user-big-icon mf-icon-${dataList?.color}`}>{dataList?.name?.substring(0, 1).toUpperCase()}</span>
                                    <div className="box-host-details-text">
                                        <div className="item-top">{dataList?.name}</div>
                                        <div className="item-bottom">主机名称</div>
                                    </div>
                                </div>
                            </div>*/}
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    {/*<svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostIp"></use>
                                    </svg>*/}
                                    <div className="box-host-details-text">
                                        <div className="item-top">Postgresql</div>
                                        <div className="item-bottom">数据库类型</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <div className="box-host-details-text">
                                        <div className="item-top">pgsql</div>
                                        <div className="item-bottom">数据库名称</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-hostState"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top">正常</div>
                                        <div className="item-bottom">数据库状态</div>
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
                                             style={{textAlign: "center"}}>{2}</div>
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
                                             style={{textAlign: "center"}}>{1}</div>
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
                                             style={{textAlign: "center"}}>{3}</div>
                                        <div className="item-bottom">告警数量</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-host-body">
                        <div className="host-news">
                            <div>主机最新动态</div>
                            <div className="more">
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>
                        </div>
                        <div className="host-news-List">
                            <div className="host-news-Line">
                                <div>添加监控项</div>
                                <div>2024-05-10 15:04:54</div>
                            </div>
                            {/*{
                                hostDynamicList.dataList && hostDynamicList.dataList.length > 0 ? hostDynamicList.dataList.map(item => {
                                        return (
                                            <div className="host-news-Line" key={item.id}>
                                                <div>{item.name}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        )
                                    })
                            }*/}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(DbDetails);