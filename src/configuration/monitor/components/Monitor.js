import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Form, Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import TopList from "../../../home/common/components/TopList";
import LeftMenu from "../../common/LeftMenu";

const Monitor = (props) => {

    const {findMonitorByName} = monitorStore;

    const [listData, setListData] = useState([])

    const searchName = async (e) => {

        const value = e.target.value;

        const resData = await findMonitorByName(value);

        setListData([...resData])
    };


    const Search = () => {
        return (
            <Input placeholder="请输入监控项名称"  onPressEnter={(event) => searchName(event)}/>
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