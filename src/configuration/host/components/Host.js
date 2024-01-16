import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import "./Host.scss"
import {withRouter} from "react-router-dom";
import {Table} from "antd";
import hostStore from "../store/HostStore";


const data = [
    /*{
        key: '1',
        name: 'host1创建监控项 主机已用内存',
        time: '2023/12/15  18：43',
    },
    {
        key: '2',
        name: 'host1创建触发器 CPU空闲利用率超过80%的处理',
        time: '2023/12/15  15：43',
    },
    {
        key: '3',
        name: 'host1创建监控项 主机已用内存',
        time: '2023/12/14    9：27',
    },
    {
        key: '4',
        name: 'host1创建监控项 监控CPU空间利用率',
        time: '2023/12/13  13：22',
    },*/

];

const Host = (props) => {

    const {findHostById,} = hostStore;

    const [dataList,setDataList] = useState({});

    useEffect(async () => {
        const resData = await findHostById(localStorage.getItem("hostId"))
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
        <div>
            <div className="box">
                <LeftMenu/>
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
                                    pagination={{
                                        position: ["bottomCenter"],
                                    }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Host);