import React from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
const MonitorHost = (props) => {

    const Search = () => <Input placeholder="Basic usage"/>;

    const monitorTemplateList = () => {
        props.history.push("/Configuration/Host/MonitorTemplateList")
    }

    const monitorList = () => {
        props.history.push("/Configuration/Host/Monitor")
    }
    const monitorHostList = () => {
        props.history.push("/Configuration/Host/MonitorHost")
    }

    return (
        <div>
            <TopList/>
            <div className="host-body" >
                <div className="box-monitor">
                    <LeftMenu/>
                    <div className="box-monitor-right">
                        <div className="box-monitor-title">
                            <div className="box-monitor-title-text">监控项</div>
                            <div className="monitor-top-right">
                                <div>
                                    <AddMonitor/>
                                </div>
                            </div>
                        </div>
                        <div className="monitor-kind-options">
                            <div className="monitor-kind-options-tabs">
                                <div className="monitor-kind-options-tabs-text" onClick={monitorList}>全部</div>
                                <div className="monitor-kind-options-tabs-text" onClick={monitorTemplateList}>模板监控项</div>
                                <div className="monitor-kind-options-tabs-text" onClick={monitorHostList}>主机监控项</div>
                            </div>
                            <div>
                                <Search/>
                            </div>
                        </div>

                        <div className="box-monitor-table">
                            <MonitorList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(MonitorHost);