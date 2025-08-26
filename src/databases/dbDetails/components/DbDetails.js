import React, {useEffect} from 'react';
import "./DbDetails.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline} from "antd";
import dbDetailsStore from "../sotre/DbDetailsStore";
import {observer} from "mobx-react";
import DbDynamicWidget from "./DbDynamicWidget";

const DbDetails = (props) => {
    const {match:{params}} = props;

    const {findDbInfoById, dbObj} = dbDetailsStore;
    const dbId = params.id

    useEffect(async () => {
        //根据dbId查询数据库信息
        await findDbInfoById(dbId)
    }, [params.id]);

    return (
        <Row className="db-box-right">
            <div className="box-db-survey">
                <div className="box-db-body-head">
                    {/* <span className="box-db-title">数据库概况</span>*/}
                    <div className="box-db-details">

                        <div className="box-db-nav">
                            <div className='box-db-nav-name'>
                                <div className='box-db-nav-name-icon'>
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-db`}></use>
                                    </svg>
                                </div>
                                <div>
                                    <div className='box-db-nav-name-title'>{dbObj?.name}</div>
                                    <div className='box-db-nav-name-text'>{dbObj?.ip}</div>
                                </div>
                            </div>
                            {/*<div className='box-db-nav-data'>
                                <div className='box-db-nav-data-style'>
                                    <span>
                                         <svg className="host-svg-icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-db`}></use>
                                        </svg>
                                    </span>
                                    <span className='box-db-nav-title'>{dbObj?.name}</span>
                                    <span style={{fontSize:"12",color:"#999",paddingLeft:"5px" }}>(名称)</span>
                                </div>
                                <div className='box-db-nav-text box-db-nav-data-name'>
                                    <span className='db-nav-text-desc'>地址</span>
                                    <span>{dbObj?.ip}</span>
                                </div>
                            </div>*/}
                        </div>
                        <div className="box-db-nav">
                            <div className='box-db-nav-data'>
                                <div className='box-db-nav-title'>{"主机状态"}</div>
                                <div className='box-db-nav-text'>
                                    {dbObj?.state === 1 ?
                                        <div className='box-db-nav-text-open'>{"开启"}</div>:
                                        <div className='box-db-nav-text-close'>{"关闭"}</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="box-db-nav">
                            <div className='box-db-nav-data'>
                                <div className='box-db-nav-title'>{"告警数量"}</div>
                                <div className='box-db-nav-text'>{dbObj?.alarmNum}</div>
                            </div>
                        </div>

                        <div className="box-db-nav">
                            <div className='box-db-nav-data'>
                                <div className='box-db-nav-title'>配置</div>
                                <div className='box-db-nav-text'>
                                    <div >
                                        <span className="db-nav-text-desc">监控项</span>
                                        <span >{dbObj?.monitorNum} </span>
                                    </div>
                                    <div >
                                        <span className="db-nav-text-desc">触发器</span>
                                        <span >{dbObj?.triggerNum} </span>
                                    </div>
                                    <div >
                                        <span className="db-nav-text-desc">图形</span>
                                        <span >{dbObj?.graphicsNum} </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*    <div className="box-db-margin-details">
                                <div className="box-db-margin-div">
                                    <span className={`element-big-icon mf-icon-1`}>{"pgsql".substring(0, 1).toUpperCase()}</span>
                                    <div className="box-db-details-text">
                                        <div className="item-top">{dbObj?.name}</div>
                                        <div className="item-bottom">数据源名称</div>
                                    </div>
                                </div>
                            </div>*/}
                        {/* <div className="box-db-margin-details">
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
                                        <use xlinkHref="#icon-hostState"></use>
                                    </svg>
                                    <div className="box-db-details-text">
                                        <div className="item-top">{dbObj?.state === 1 ? "开启":"关闭"}</div>
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
                            </div>*/}

                    </div>
                </div>
                <div className="box-db-body">
                    <div className="db-news">
                        <div>动态信息</div>
                        {/*<div className="more">
                                <svg aria-hidden="true" className="svg-icon">
                                    <use xlinkHref="#icon-rightjump"></use>
                                </svg>
                            </div>*/}
                    </div>

                    <div className="db-news-List">
                        <DbDynamicWidget dbId = {dbId} dbName={dbObj?.name}/>
                    </div>
                </div>
            </div>
        </Row>
    );
};

export default withRouter(observer(DbDetails));
