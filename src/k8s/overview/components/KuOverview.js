import React, {useEffect} from 'react';
import "./KuOverview.scss"
import {withRouter} from "react-router-dom";
import {Col, Empty, Row, Timeline, Tooltip} from "antd";
import {observer} from "mobx-react";
import kuOverviewStore from "../store/KuOverviewStore";

const KuOverview = () => {

    const {
        findKuOverviewTotal,
        kuOverView
    } = kuOverviewStore;

    useEffect(async () => {
        const kuId = localStorage.getItem("kuId");
        await findKuOverviewTotal(kuId);
    }, []);

    return (
        <Row className="ku-right">
            <Col span={24}>

                <div className="ku-body-head">
                    {
                        kuOverView?.mapTotal.length !== 0 ?

                            <div className="ku-details">
                                {
                                    kuOverView?.mapTotal && kuOverView?.mapTotal.map((item, index) => {
                                        return (
                                            <div className="ku-margin-details" key={index}>
                                                <div className="ku-margin-div">
                                                    <div className="ku-details-text">
                                                        <div className="ku-item-top">{item?.reportData}</div>
                                                        <div className="ku-item-bottom">{item?.name}</div>
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
                        kuOverView?.mapStatus.length !== 0 ?

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
                                                                                {i}
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
                            :
                            <Empty/>
                    }
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(KuOverview));