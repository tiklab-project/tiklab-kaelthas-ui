import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {Col, Empty, Pagination, Row, Timeline} from "antd";
import "./hostDynamic.scss"
import Breadcrumb from "../../common/components/Breadcrumb";
import hostStore from "../store/HostStore";
import {observer} from "mobx-react";

const HostDynamic = (props) => {

    const {
        setNullCondition,
        setSearchCondition,
        findHostDynamicPage,
        hostDynamicList,
    } = hostStore;

    useEffect(async () => {
        setNullCondition({
            hostId: localStorage.getItem("hostId")
        })
        await findHostDynamicPage()
    }, []);

    const onPageChange = async (page, pageSize) => {
        setSearchCondition({
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        })

        await findHostDynamicPage()
    };

    return (
        <Row className="host-Dynamic">
            <div className="host-Dynamic-list-page">
                <div className="host-Dynamic-list-top">
                    <Breadcrumb
                        {...props}
                        firstText="主机动态"
                        secondText="最新动态"
                    />
                </div>
                <div className="host-Dynamic-list">
                    <Timeline>
                        {
                            hostDynamicList.dataList && hostDynamicList.dataList.length > 0 ? hostDynamicList.dataList.map(item => {
                                    return (
                                        <Timeline.Item>
                                            <div className="host-Dynamic-list-item" key={item.id}>
                                                <div>{item.time}</div>
                                                <div className="Dynamic-list-name">{item.name}</div>
                                            </div>
                                        </Timeline.Item>
                                    )
                                })
                                :
                                <Empty /*images="src/assets/images/nodata.png"*/ description="暂时没有动态~"/>
                        }
                    </Timeline>
                </div>
            </div>
        </Row>
    );
};

export default withRouter(observer(HostDynamic));