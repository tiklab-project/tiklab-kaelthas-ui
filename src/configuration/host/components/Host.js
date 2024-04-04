import React, {useEffect, useState} from 'react';
import "./Host.scss"
import {withRouter} from "react-router-dom";
import {Table} from "antd";
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
    }, []);
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
        <div className="box-right">
            <div className="box-host-survey">
                <div className="box-host-body-head">
                    <div className="box-host-details">
                        <div className="box-host-title">主机详情</div>
                        <div className="box-host-margin-details">
                            <div className="box-host-details-text">主机名称 {dataList.name}</div>
                            <div className="box-host-details-text">主机描述：{dataList.describe}</div>
                        </div>
                        <div className="box-host-margin-details">
                            <div className="box-host-details-text">主机ip：{dataList.ip}</div>
                            <div className="box-host-details-text">监控项数量：{dataList.monitorNum}</div>
                        </div>
                        <div className="box-host-margin-details">
                            <div className="box-host-details-text">主机状态：{dataList.state}</div>
                            <div className="box-host-details-text">触发器数量：{dataList.triggerNum}</div>
                        </div>
                        <div className="box-host-margin-details">
                            <div className="box-host-details-text">主机是否可用：{dataList.usability}</div>
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
        </div>
    );
};

export default withRouter(Host);