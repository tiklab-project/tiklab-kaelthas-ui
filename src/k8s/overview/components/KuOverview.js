import React, {useEffect,useState} from 'react';
import "./KuOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Tag, Timeline, Tooltip} from "antd";
import {observer} from "mobx-react";
import kuOverviewStore from "../store/KuOverviewStore";

const KuOverview = (props) => {
    const {match:{params}} = props;


    const {findKuOverviewTotal,findKuGeneralize, kuOverView} = kuOverviewStore;

    const [kuDetails,setKuDetails]=useState();

    useEffect(async () => {
        await findKuOverviewTotal(params.id);

        findKuGeneralize(params.id).then(res=>{
            if (res.code===0){
                setKuDetails(res.data)
            }
        })
    }, []);

    function givesColor(i) {
        if ("Running" === i || "True" === i || "Succeeded" === i) {
            return (
                <div style={{color:"green"}}>{i}</div>
            )
        }
        if ("False" === i){
            return (
                <div style={{color:"red"}}>{i}</div>
            )
        }

        return i;
    }

    return (
        <Row className="ku-right">
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className='ku-body'>
                    <div className="box-ku-body-head">
                     {/*   <span className="box-ku-title">K8s详情</span>*/}
                        <div className="box-ku-details">
                            <div className="box-ku-nav">
                                <div className='box-ku-nav-name'>
                                    <div className='box-ku-nav-name-icon'>
                                        <svg className="host-svg-icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-kubernetes`}></use>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className='box-ku-nav-name-title'>{kuDetails?.name}</div>
                                        <div className='box-ku-nav-name-text'>{kuDetails?.ip}</div>
                                    </div>
                                </div>

                                {/*<div className='box-ku-nav-data'>
                                    <div>
                                        <span className='box-ku-nav-title'>{kuDetails?.name}</span>
                                        <span style={{fontSize:"12",color:"#999",paddingLeft:"5px" }}>(名称)</span>
                                    </div>
                                    <div className='box-ku-nav-text'>
                                        <span className='ku-nav-text-desc'>IP</span>
                                        <span>{kuDetails?.ip}</span>
                                    </div>
                                </div>*/}
                            </div>
                            <div className="box-ku-nav">
                                <div className='box-ku-nav-data'>
                                    <div className='box-ku-nav-title'>{"主机状态"}</div>
                                    <div className='box-ku-nav-text'>
                                        {kuDetails?.status === 1 ?
                                            <div className='box-ku-nav-text-open'>
                                                {"开启"}
                                            </div>:
                                            <div className='box-ku-nav-text-close'>
                                                {"关闭"}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="box-ku-nav">
                                <div className='box-ku-nav-data'>
                                    <div className='box-ku-nav-title'>{"告警数量"}</div>
                                    <div className='box-ku-nav-text'>{kuDetails?.alarmNum}</div>
                                </div>
                            </div>

                            <div className="box-ku-nav">
                                <div className='box-ku-nav-data'>
                                    <div className='box-ku-nav-title'>配置</div>
                                    <div className='box-ku-nav-text'>
                                        <div >
                                            <span className="ku-nav-text-desc">监控项</span>
                                            <span >{`${kuDetails?.monitorNum}`} </span>
                                        </div>
                                        <div >
                                            <span className="ku-nav-text-desc">触发器</span>
                                            <span >{`${kuDetails?.triggerNum}`} </span>
                                        </div>
                                        <div >
                                            <span className="ku-nav-text-desc">图形</span>
                                            <span >{`${kuDetails?.graphicsNum}`} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="ku-body-server">
                    <div className='ku-body-server-title'>K8s服务器详情</div>
                    {
                        kuOverView?.mapTotal.length !== 0 &&

                            <div className="ku-details">
                                {
                                    kuOverView?.mapTotal && kuOverView?.mapTotal.map((item, index) => {
                                        return (
                                            <div className="ku-margin-details" key={index}>
                                                <div className="ku-margin-div">
                                                    <div className="ku-details-text">
                                                        <div className="ku-item-top">{item?.reportData}</div>
                                                        <div className="ku-item-bottom">{item?.kubernetesItem?.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                    {
                        kuOverView?.mapStatus.length !== 0 &&

                            <div className="ku-body">
                                {
                                    kuOverView?.mapStatus && kuOverView?.mapStatus.map((item, index) => {
                                        return (
                                            <div className="ku-body-table" key={index}>
                                                <div className="ku-table-title" key={index}>
                                                    {item?.name}
                                                </div>
                                                {
                                                    item?.data && item?.data.map((status, index2) => {
                                                        return (
                                                            <div className="ku-table-list" key={index2}>
                                                                {
                                                                    status && status?.map((i, index3) => {
                                                                        return (
                                                                            <Tooltip className="ku-table-text" key={index3}
                                                                                     title={i}>
                                                                                {givesColor(i)}
                                                                            </Tooltip>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>

                    }

                    {
                        kuOverView?.mapTotal.length === 0&&kuOverView?.mapStatus.length === 0  &&
                        <Empty/>
                    }
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(KuOverview));
