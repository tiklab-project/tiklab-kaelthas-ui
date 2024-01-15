import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Form, Input} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import LeftMenu from "../../common/compnoents/LeftMenu";

const Monitor = (props) => {

    const {findMonitorCondition,setSearchCondition} = monitorStore;

    const [listData, setListData] = useState([])

    useEffect(async () => {

        let hostId = localStorage.getItem(`hostId`);

        await setSearchCondition({hostId: hostId});

        const resData = await findMonitorCondition();
        console.log(resData);


    }, []);

    const searchName = async (e) => {

        const value = e.target.value;

        const resData = await findMonitorCondition(value);

        // setListData([...resData])
    };


    const Search = () => {
        return (
            <Input placeholder="请输入监控项名称"  onPressEnter={(event) => searchName(event)}/>
        )
    }

    const monitorList = () => {
        //条件筛选
    }

    return (
        <div>
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
                                     onClick={() => monitorList(null)}>
                                    全部
                                </div>
                                <div className="monitor-kind-options-tabs-text"
                                     onClick={() => monitorList(1)}>
                                    模板监控项
                                </div>
                                <div className="monitor-kind-options-tabs-text"
                                     onClick={() => monitorList(2)}>
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