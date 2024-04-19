import React, {useEffect, useState} from 'react';
import "./Host.scss"
import {withRouter} from "react-router-dom";
import {Col, Row, Table} from "antd";
import hostStore from "../store/HostStore";
import "../../../common/styles/_tabStyle.scss"

const data = [];

const Host = (props) => {

    const {findHostById,} = hostStore;

    const [dataList, setDataList] = useState({});

    useEffect(async () => {
        const resData = await findHostById(localStorage.getItem("hostId"))

        switch (resData.state) {
            case 1:
                resData.state = "启用";
                break;
            case 2:
                resData.state = "未启用";
                break;
            default:
                resData.state = "未知";
        }

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
    }, [localStorage.getItem("hostId")]);
    const columns = [
        {
            title: '动态名称',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <span style={{cursor:"pointer"}} onClick={host}>{text}</span>,
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },

    ];

    return (
        <Row className="box-right">
            <Col sm={24} md={24} lg={{ span: 24 }} xl={{ span: "18", offset: "3" }} xxl={{ span: "18", offset: "3" }}>
                <div className="box-host-survey">
                    <div className="box-host-body-head">
                        <div className="box-host-details">
                            <div className="box-host-title">{dataList?.name}</div>
                            <div className="box-host-margin-details">
                                <span className={`user-big-icon mf-icon-${dataList?.color}`}>{dataList?.name?.substring(0, 1).toUpperCase()}</span>
                                <div className="box-host-details-text">
                                    <div className="item-top">{dataList?.ip}</div>
                                    <div className="item-bottom">主机ip</div>
                                </div>
                            </div>
                            <div className="box-host-margin-details">
                                <svg className="status-img" aria-hidden="true">
                                    <use xlinkHref="#icon-hostState"></use>
                                </svg>
                                <div className="box-host-details-text">
                                    <div className="item-top">{dataList?.state}</div>
                                    <div className="item-bottom">主机状态</div>
                                </div>
                            </div>
                            <div className="box-host-margin-work">
                                <div className="host-layout-item">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-monitorNum"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top" style={{textAlign:"center"}}>{dataList?.monitorNum}</div>
                                        <div className="item-bottom">监控项数量</div>
                                    </div>
                                </div>
                                <div className="host-layout-item">
                                    <svg className="status-img" aria-hidden="true">
                                        <use xlinkHref="#icon-triggerNum"></use>
                                    </svg>
                                    <div className="box-host-details-text">
                                        <div className="item-top" style={{textAlign:"center"}}>{dataList?.triggerNum}</div>
                                        <div className="item-bottom">触发器数量</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-host-body-head-graphics">

                        </div>
                    </div>
                    <div className="box-host-body">
                        <div className="host-news">
                            主机最新动态
                        </div>
                        <div className="host-news-List">
                            <Table
                                rowKey={record => record.id}
                                columns={columns}
                                dataSource={data}
                                className="custom-table"
                                pagination={{
                                    position: ["bottomCenter"],
                                }
                                }
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(Host);