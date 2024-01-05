import React, {useState} from 'react';
import TopList from "../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import {observable, autorun} from "mobx"

const Monitor = (props) => {

    const data = [
        {
            key: '1',
            monitorName: '内核占用CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression:'system.cpu(internal,time)',
            interval:'10s',
            dataRetentionPeriod:'36d',
            status:'启动',
            failureInformation:'监控项无法识别'
        },
        {
            key: '2',
            monitorName: '用户态进程占用CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression:'system.cpu(process,time)',
            interval:'20s',
            dataRetentionPeriod:'40d',
            status:'启动',
            failureInformation:'不存在这个监控项'
        },
        {
            key: '3',
            monitorName: '改变过优先级的进程占用CPU的百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression:'system.cpu(process,c)',
            interval:'20s',
            dataRetentionPeriod:'50d',
            status:'启动',
            failureInformation:'监控项无法识别'
        },
        {
            key: '4',
            monitorName: '空闲CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression:'system.cpu(idle,c)',
            interval:'30s',
            dataRetentionPeriod:'30d',
            status:'启动',
            failureInformation:'监控成功'
        },
    ];

    const [listData, setListData] = useState(data)

    const Search = () => <Input placeholder="请输入监控项名称"/>;

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
                    <LeftMenu/>
                    <div className="box-monitor-right">
                        <div className="box-monitor-title">
                            <div className="box-monitor-title-text">监控项</div>
                            <div className="monitor-top-right">
                                <div>
                                    <AddMonitor setListData = {setListData} listData = {listData}/>
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
                            <MonitorList  listData = {listData} setListData = {setListData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Monitor);