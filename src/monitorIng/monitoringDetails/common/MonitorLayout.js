import {observer, Provider} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import {Breadcrumb, DatePicker,  Empty, Select, Tabs} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";
import * as echarts from "echarts/core";
import {
    GridComponent,
    LegendComponent,
    TimelineComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent
} from 'echarts/components';
import {LineChart, PieChart, ScatterChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import monitorLayoutStore from "../store/MonitorLayoutStore";
import MonitoringItem from "./MonitoringItem";

echarts.use([
    TimelineComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    ScatterChart,
    CanvasRenderer,
    UniversalTransition,
    LegendComponent,
    LineChart,
    ToolboxComponent,
    PieChart
]);
const {RangePicker} = DatePicker;

const MonitorLayout = (props) => {

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    const [descTime, setDescTime] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllMonitor,
        findInformationByGraphics,
        condition,
        setSearchNull
    } = monitorLayoutStore;


    async function checkTabGraphics(activeKey) {



        if (activeKey === "1") {

            const monitors = await findAllMonitor()
            setMonitorList([...monitors])

            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            setSearchNull({
                hostId: localStorage.getItem("hostIdForMonitoring"),
                monitorId: monitors[0].id,
                source: monitors[0].monitorSource
            })
        }

        if (activeKey === "2") {

            const monitors = await findAllMonitor()
            setMonitorList([...monitors])

            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            setSearchNull({
                hostId:localStorage.getItem("hostIdForMonitoring"),
                reportType: 1,
                data: []
            })

            await findInformationByGraphics()

            const descTime = await findDescGatherTime();
            setDescTime([...descTime])

        }

    }

    const onChange = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1],
        })

        await findInformationByGraphics()

        const descTime = await findDescGatherTime();
        setDescTime([...descTime])

    };

    async function onCheckMonitor(value, options) {

        const data = [];
        value.map(item => {
            data.push(item[0] + ":" + item[1])
        })

        setSearchCondition({
            hostId: localStorage.getItem("hostIdForMonitoring"),
            data: data
        })

        await findInformationByGraphics();

        const times = await findDescGatherTime();
        setDescTime([...times])

    }


    return (
        <div>
            <Provider>
                <div>
                    <div className="details">
                        <div className="details-body">
                            <div className="details-breadcrumb-table">
                                <Breadcrumb>
                                    <Breadcrumb.Item onClick={goBackHome}>
                                        <span style={{cursor: "pointer"}}>Home</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="details-table-title">
                                    <Tabs defaultActiveKey="1" onTabClick={(activeKey) => checkTabGraphics(activeKey)}>
                                        <Tabs.TabPane tab="列表展示" key="1">
                                            <MonitoringDetails/>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="图表展示" key="2">
                                            <div className="details-search">
                                                <div className="details-div">
                                                    <Select
                                                        mode="multiple"
                                                        style={{
                                                            width: '200px',
                                                        }}
                                                        placeholder="请选择您的监控项"
                                                        allowClear
                                                        onChange={(value, options) => onCheckMonitor(value, options)}
                                                        options={monitorList && monitorList.map(item => ({
                                                            label: item.name,
                                                            key: item.id,
                                                            value: [item.id, item.monitorSource],
                                                        }))}
                                                    >
                                                    </Select>
                                                </div>
                                                <div className="details-div">
                                                    <RangePicker
                                                        format="YYYY-MM-DD"
                                                        onChange={onChange}
                                                    />
                                                </div>
                                            </div>

                                            {
                                                condition && condition.length > 0 ?
                                                    <div className="details-tabs-wrap">
                                                        {
                                                            condition.map((item) => {
                                                                return (
                                                                    <MonitoringItem reportType={item[0].reportType}
                                                                                    condition={item}
                                                                                    descTime={descTime}/>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <Empty>
                                                        <span>没有数据</span>
                                                    </Empty>
                                            }
                                        </Tabs.TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div>
                        {renderRoutes(route.routes)}
                    </div>*/
                    }
                </div>
            </Provider>
        </div>
    );
};

export default observer(MonitorLayout);