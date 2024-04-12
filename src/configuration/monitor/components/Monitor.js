import React, {useEffect, useState} from 'react';
import "./Monitor.scss"
import AddMonitor from "./AddMonitor";
import {Col, Form, Input, Row} from "antd";
import MonitorList from "./MonitorList";
import {withRouter} from "react-router-dom";
import monitorStore from "../store/MonitorStore";
import {SearchOutlined} from "@ant-design/icons";

const Monitor = (props) => {

    const {findMonitorCondition, setSearchCondition, data} = monitorStore;

    const [listData, setListData] = useState([])

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({name: value})
        const resData = await findMonitorCondition();
    };


    const monitorList = async (monitorSource) => {
        setMonitorSource(monitorSource)
        //条件筛选
        setSearchCondition({
            monitorSource: monitorSource,
            name: null
        })
        const resData = await findMonitorCondition();
    }

    const [monitorSource, setMonitorSource] = useState(null);

    const availabilityTab = [
        {
            title: '全部',
            key: null,
            icon: "allHost"
        },
        {
            title: '模板监控项',
            key: 1,
            icon: "availableHost"
        },
        {
            title: '主机监控项',
            key: 2,
            icon: "noAvailableHost"
        }
    ]

    return (
        <Row className="box-monitor-right">
            <Col sm={24} md={24} lg={{ span: 24 }} xl={{ span: "22", offset: "1" }} xxl={{ span: "18", offset: "3" }}>
                <div className="box-monitor-title">
                    <div className="box-monitor-title-text">监控项</div>
                    <div className="monitor-top-right">
                        <AddMonitor setListData={setListData} listData={listData}/>
                    </div>
                </div>
                <div className="monitor-kind-options">
                    <div className="monitor-kind-options-tabs">
                        {
                            availabilityTab.map(item => {
                                return <div
                                    key={item.title}
                                    className={`monitor-kind-options-tabs-text ${item.key === monitorSource ? "monitor-select" : ""}`}
                                    onClick={() => monitorList(item.key)}>
                                    {item.title}
                                </div>
                            })
                        }
                    </div>
                    <div>
                        <Input
                            placeholder="请输入监控项名称"
                            className="monitor-kind-search"
                            onPressEnter={(event) => searchName(event)}
                            prefix={<SearchOutlined />}
                        />
                    </div>
                </div>
                <div className="box-monitor-table">
                    <MonitorList listData={data} setListData={setListData}/>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(Monitor);