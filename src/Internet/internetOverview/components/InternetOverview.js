import React, {useEffect, useState} from 'react';
import "./InternetOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline, Tooltip} from "antd";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";
import internetOverviewStore from "../store/InternetOverviewStore";

const InternetOverview = (props) => {
    const {match:{params}} = props;
    const {findInternetOverview,findInternetGeneralize, internetOverview} = internetOverviewStore;

    const internetId = params.id;

    const [inDetails,setInDetails]=useState()

    useEffect(async () => {
        await findInternetOverview(internetId);

        findInternetGeneralize(internetId).then(res=>{
            if (res.code===0){
                setInDetails(res.data)
            }
        })
    }, [params.id]);


    function conversionStatus(status, portName) {

        let state = status;

        const split = portName.split(":");

        if (split.length === 2) {
            if ("copper" === split[1]) {
                state = 2
            }

            if (" fiber" === split[1]) {
                state = 3
            }
        }

        if (state === 1) {
            return (
                <div style={{color: "blue"}}>已接入</div>
            )
        }

        if (state === 2) {
            return (
                <div style={{color: "red"}}>未接入</div>
            )
        }

        if (state === 3) {
            return (
                <div style={{color: "red"}}>端口无法使用</div>
            )
        }
    }

    return (
        <div className="in-right">
            <div className='in-body'>
                <div className="box-in-body-head">
                    {/*  <span className="box-in-title">网络详情</span>*/}
                    <div className="box-in-details">
                        <div className="box-in-nav">
                            <div className='box-in-nav-name'>
                                <div className='box-in-nav-name-icon'>
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-internet`}></use>
                                    </svg>
                                </div>
                                <div>
                                    <div className='box-in-nav-name-title'>{inDetails?.name}</div>
                                    <div className='box-in-nav-name-text'>{inDetails?.ip}</div>
                                </div>
                            </div>
                            {/*<div className='box-in-nav-data'>
                                <div>
                                    <span className='box-in-nav-title'>{inDetails?.name}</span>
                                    <span style={{fontSize:"12",color:"#999",paddingLeft:"5px" }}>(名称)</span>
                                </div>
                                <div className='box-in-nav-text'>
                                    <span className='in-nav-text-desc'>IP</span>
                                    <span>{inDetails?.ip}</span>
                                </div>
                            </div>*/}
                        </div>
                        <div className="box-in-nav">
                            <div className='box-in-nav-data'>
                                <div className='box-in-nav-title'>{"主机状态"}</div>
                                <div className='box-in-nav-text'>
                                    {inDetails?.status === 1 ?
                                        <div className='box-in-nav-text-open'>{"开启"}</div>:
                                        <div className='box-in-nav-text-close'>{"关闭"}</div>
                                    }
                                    </div>
                            </div>
                        </div>
                        <div className="box-in-nav">
                            <div className='box-in-nav-data'>
                                <div className='box-in-nav-title'>{"告警数量"}</div>
                                <div className='box-in-nav-text'>{inDetails?.alarmNum}</div>
                            </div>
                        </div>

                        <div className="box-in-nav">
                            <div className='box-in-nav-data'>
                                <div className='box-in-nav-title'>配置</div>
                                <div className='box-in-nav-text'>
                                    <div >
                                        <span className="in-nav-text-desc">监控项</span>
                                        <span >{`${inDetails?.monitorNum}`} </span>
                                    </div>
                                    <div >
                                        <span className="in-nav-text-desc">触发器</span>
                                        <span >{`${inDetails?.triggerNum}`} </span>
                                    </div>
                                    <div >
                                        <span className="in-nav-text-desc">图形</span>
                                        <span >{`${inDetails?.graphicsNum}`} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="in-body-head">
                <div className="in-title">接口信息</div>

                {
                    internetOverview?.podInfo !== null && internetOverview.podInfo?.length !== 0 ?

                        <div className="in-details">
                            {
                                internetOverview?.podInfo && internetOverview?.podInfo.map((item, index) => {
                                    return (
                                        <div className="in-margin-details" key={index}>
                                            <div className="in-margin-div">
                                                <div className="in-details-text">
                                                    <div className="in-item-top">{item?.portName}</div>
                                                    <div className="in-item-bottom">
                                                        {conversionStatus(item?.status, item?.portName)}
                                                    </div>
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
                {
                    internetOverview?.systemInfo !== null ?
                        <div className="in-body">
                            <div className="in-body-table">
                                <div className="in-table-title">
                                    系统信息
                                </div>
                                <div className="in-table-list">
                                    <div className="in-table-text">
                                        设备描述：
                                    </div>
                                    <div className="in-table-text">
                                        {internetOverview?.systemInfo?.description}
                                    </div>
                                </div>
                                <div className="in-table-list">
                                    <div className="in-table-text">
                                        设备型号：
                                    </div>
                                    <div className="in-table-text">
                                        {internetOverview?.systemInfo?.deviceModel}
                                    </div>
                                </div>
                                <div className="in-table-list">
                                    <div className="in-table-text">
                                        运行时间：
                                    </div>
                                    <div className="in-table-text">
                                        {internetOverview?.systemInfo?.runningTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Empty/>
                }
            </div>
        </div>
    );
};

export default withRouter(observer(InternetOverview));
