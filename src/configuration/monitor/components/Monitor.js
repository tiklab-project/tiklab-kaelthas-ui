import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Form, Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import LeftMenu from "../../common/components/LeftMenu";

const Monitor = (props) => {

    const {findMonitorCondition, setSearchCondition,data} = monitorStore;

    const [listData, setListData] = useState([])

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({name: value})
        const resData = await findMonitorCondition();
    };


    const monitorList = async (monitorSource) => {
        //条件筛选
        setSearchCondition({
            monitorSource: monitorSource,
            name: null
        })
        const resData = await findMonitorCondition();
    }

    return (
        <div>
            <div className="box-monitor">
                <LeftMenu/>
                <div className="box-monitor-right">
                    <div className="box-monitor-title">
                        <div className="box-monitor-title-text">监控项</div>
                        <div className="monitor-top-right">
                            <div>
                                <AddMonitor setListData={setListData} listData={listData}/>
                            </div>
                        </div>
                    </div>
                    <div className="monitor-kind-options">
                        <div className="monitor-kind-options-tabs">
                            <div className="monitor-kind-options-tabs-text"
                                 onClick={() => monitorList(null)}>
                                全部
                            </div>
                            <div className="monitor-kind-options-tabs-text"
                                 onClick={() => monitorList(2)}>
                                模板监控项
                            </div>
                            <div className="monitor-kind-options-tabs-text"
                                 onClick={() => monitorList(1)}>
                                主机监控项
                            </div>
                        </div>
                        <div className="monitor-kind-search">
                            <Input placeholder="请输入监控项名称" onPressEnter={(event) => searchName(event)}/>
                        </div>
                    </div>
                    <div className="box-monitor-table">
                        <MonitorList listData={data} setListData={setListData}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Monitor);