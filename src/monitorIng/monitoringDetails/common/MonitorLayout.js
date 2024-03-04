import {Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import React from "react";
import {Breadcrumb, Input, Pagination, Select, Table, Tabs} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";
import MonitoringGraphics from "../components/MonitoringGraphics";

const MonitorLayout = (props) => {

    const {route} = props;

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    function checkTabGraphics(activeKey) {

    }

    return (
        <div>
            <Provider>
                <div>
                    <div className="details">
                        <div className="details-body">
                            {/*<div className="details-content">
                                <div className="details-content-title" id="details-content-title">

                                </div>
                            </div>*/}
                            <div className="details-alarm-table">
                                <Breadcrumb>
                                    <Breadcrumb.Item onClick={goBackHome}>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="details-table-title">
                                    <Tabs defaultActiveKey="1" onTabClick={(activeKey) => checkTabGraphics(activeKey)}>
                                        <Tabs.TabPane tab="列表展示" key="1">
                                            <MonitoringDetails/>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="图形展示" key="2">
                                            <MonitoringGraphics/>
                                        </Tabs.TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {renderRoutes(route.routes)}
                    </div>
                </div>
            </Provider>
        </div>
    );
};

export default withRouter(MonitorLayout);