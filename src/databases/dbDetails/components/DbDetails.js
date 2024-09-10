import React, {useEffect} from 'react';
import "./DbDetails.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline} from "antd";
import dbDetailsStore from "../sotre/DbDetailsStore";
import {observer} from "mobx-react";

const DbDetails = () => {

    const {findDbInfoById,dbObj} = dbDetailsStore;

    useEffect(async () => {
        //根据dbId查询数据库信息
        await findDbInfoById(localStorage.getItem("dbId"))
    }, []);

    return (<Row className="db-box-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-db-survey">
                    <div className="box-db-body-head">
                        <span className="box-db-title">数据库概况</span>
                        <div className="box-db-details">
                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <span className={`user-big-icon mf-icon-1`}>{"pgsql".substring(0, 1).toUpperCase()}</span>
                                    <div className="box-db-details-text">
                                        <div className="item-top">{dbObj?.name}</div>
                                        <div className="item-bottom">数据源名称</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-dbType"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top">{dbObj?.dbType}</div>
                                        <div className="item-bottom">数据库类型</div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-dbState"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top">{dbObj?.state === 1 ? "正常":"异常"}</div>
                                        <div className="item-bottom">数据库状态</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-monitorNum"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{dbObj?.monitorNum}</div>
                                        <div className="item-bottom">监控项数量</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-triggerNum"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{dbObj?.triggerNum}</div>
                                        <div className="item-bottom">触发器数量</div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-alarmNum"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top"
                                             style={{textAlign: "center"}}>{dbObj?.alarmNum}</div>
                                        <div className="item-bottom">告警数量</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-db-body">
                        <div className="db-news">
                            <div>主机最新动态</div>
                            <div className="more">
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>
                        </div>
                        {/*<div className="db-news-List">
                            <div className="db-news-Line">
                                <div>添加监控项</div>
                                <div>2024-05-10 15:04:54</div>
                            </div>
                            {
                                hostDynamicList.dataList && hostDynamicList.dataList.length > 0 ? hostDynamicList.dataList.map(item => {
                                        return (
                                            <div className="db-news-Line" key={item.id}>
                                                <div>{item.name}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div></div>
                            }
                        </div>*/}

                        <div className="db-news-List">
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

export default withRouter(observer(DbDetails));