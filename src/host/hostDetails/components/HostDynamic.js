import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {Col, Empty, Pagination, Row, Timeline} from "antd";
import "./hostDynamic.scss"
import Breadcumb from "../../common/components/Breadcrumb";
import hostStore from "../store/HostStore";
import {observer} from "mobx-react";
const HostDynamic = (props) => {

    const {
        setNullCondition,
        setSearchCondition,
        findHostDynamicPage,
        hostDynamicList,
        searchCondition
    } = hostStore;

    useEffect(async () => {
        setNullCondition({
            hostId:localStorage.getItem("hostId")
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
            <Col className="host-Dynamic-col" sm={24} md={24} lg={{span: 24}} xl={{span: "18", offset: "3"}} xxl={{span: "18", offset: "3"}}>
                <div className="host-Dynamic-list-page">
                    <div className="host-Dynamic-list-top">
                        <Breadcumb
                            {...props}
                            firstText="主机动态"
                            secondText="最新动态"
                        />
                    </div>
                    <div className="host-Dynamic-list">
                        {/*{
                            hostDynamicList.dataList && hostDynamicList.dataList.length > 0 ? hostDynamicList.dataList.map(item => {
                                    return (
                                        <div className="host-Dynamic-list-item" key={item.id}>
                                            <div>{item.name}</div>
                                            <div>{item.time}</div>
                                        </div>
                                    )
                                })
                                :
                                <Empty description="暂时没有动态~"/>
                        }
*/}
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
                    {
                        hostDynamicList.dataList && hostDynamicList.dataList.length > 0 && <div className="host-Dynamic-pagination">
                            <Pagination
                                onChange={onPageChange}
                                defaultCurrent={1}
                                defaultPageSize={20}
                                total={hostDynamicList.totalRecord}
                                showSizeChanger={true}
                                current={searchCondition.pageParam.currentPage}
                                pageSize={searchCondition.pageParam.pageSize}
                            />
                        </div>
                    }
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(HostDynamic));