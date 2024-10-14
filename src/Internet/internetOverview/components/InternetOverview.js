import React, {useEffect, useState} from 'react';
import "./InternetOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline, Tooltip} from "antd";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";
import internetOverviewStore from "../store/InternetOverviewStore";

const InternetOverview = (props) => {

    const {
        findInternetOverview,
        internetOverview
    } = internetOverviewStore;

    const internetId = localStorage.getItem("internetId");

    useEffect(async () => {
        await findInternetOverview(internetId);
    }, [localStorage.getItem("internetId")]);


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
        <Row className="in-right">
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className="in-body-head">
                    {
                        internetOverview?.podInfo !== null ?

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
            </Col>
        </Row>
    );
};

export default withRouter(observer(InternetOverview));