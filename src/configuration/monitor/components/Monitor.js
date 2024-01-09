import React, {useEffect, useState} from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../../common/LeftMenu";
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";

const Monitor = (props) => {


    const {findMonitorByName} = monitorStore;

    const [listData, setListData] = useState()

    const searchName = async (name) => {
        debugger

        const resData = await findMonitorByName({name});

        console.log('使用输入框模拟的数据', resData)
    };


    const Search = () => {
        return (
            <Input placeholder="请输入监控项名称" onPressEnter={() => searchName(value)}/>
        )
    }

    const monitorTemplateList = () => {
        props.history.push("/Configuration/Host/MonitorTemplateList")
    }

    const monitorList = () => {
        props.history.push("/Configuration/Host/Monitor")
    }

    const monitorHostList = () => {
        props.history.push("/Configuration/Host/MonitorHostList")
    }

    return (
        <div>
            <TopList/>
            <div>
                <div className="box-monitor">
                    <LeftMenu setListData={setListData} listData={listData}/>
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
                                     onClick={monitorList}>
                                    全部
                                </div>
                                <div className="monitor-kind-options-tabs-text"
                                     onClick={monitorTemplateList}>
                                    模板监控项
                                </div>
                                <div className="monitor-kind-options-tabs-text"
                                     onClick={monitorHostList}>
                                    主机监控项
                                </div>
                            </div>
                            <div className="monitor-kind-search">
                                <Search/>
                            </div>
                        </div>
                        <div className="box-monitor-table">
                            <MonitorList listData={listData} setListData={setListData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Monitor);