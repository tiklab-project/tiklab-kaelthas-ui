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
            <div className="box-host-survey">
                <div className="box-host-body-head">
                 {/*   <span className="box-host-title">主机详情</span>*/}
                    <div className="box-host-details">
                        <div className="box-host-nav">
                            <div className='box-host-nav-name'>
                                <div className='box-host-nav-name-icon'>
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-host`}></use>
                                    </svg>
                                </div>
                                <div>
                                    <div className='box-host-nav-name-title'>{dataList?.name}</div>
                                    <div className='box-host-nav-name-text'>{dataList?.ip}</div>
                                </div>
                            </div>

                        {/*    <div className='box-host-nav-data'>
                                <div>
                                    <span className='box-host-nav-title'>{dataList?.name}</span>
                                    <span style={{fontSize:"12",color:"#999",paddingLeft:"5px" }}>(名称)</span>
                                </div>
                                <div className='box-host-nav-text'>
                                    <span className='host-nav-text-desc'>IP</span>
                                    <span>{dataList?.ip}</span>
                                </div>
                            </div>*/}
                        </div>
                        <div className="box-host-nav">
                            <div className='box-host-nav-data'>
                                <div className='box-host-nav-title'>{"主机状态"}</div>
                                <div className='box-host-nav-text'>
                                    {dataList?.state === 1 ?
                                        <div className='box-host-nav-text-open'>{"开启"}</div>:
                                        <div className='box-host-nav-text-close'>{"关闭"}</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="box-host-nav">
                            <div className='box-host-nav-data'>
                                <div className='box-host-nav-title'>{"告警数量"}</div>
                                <div className='box-host-nav-text'>{dataList?.alarmNum}</div>
                            </div>
                        </div>

                        <div className="box-host-nav">
                            <div className='box-host-nav-data'>
                                <div className='box-host-nav-title'>配置</div>
                                <div className='box-host-nav-text'>
                                    <div >
                                        <span className="host-nav-text-desc">监控项</span>
                                        <span >{`${dataList?.monitorNum}`} </span>
                                    </div>
                                    <div >
                                        <span className="host-nav-text-desc">触发器</span>
                                        <span >{`${dataList?.triggerNum}`} </span>
                                    </div>
                                    <div >
                                        <span className="host-nav-text-desc">图形</span>
                                        <span >{`${dataList?.graphicsNum}`} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-host-body">
                    <div className="host-news">
                        <div>动态信息</div>
                    </div>
                    <div className="host-news-List">
                    </div>
                    <DynamicWidget hostId={params.id} hostName={dataList?.name}/>
                </div>
            </div>
        </Row>
    );
};

export default withRouter(observer(HostDetails));
