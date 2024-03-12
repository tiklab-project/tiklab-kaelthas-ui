import {Provider} from "mobx-react";
import {withRouter} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Breadcrumb, DatePicker, Select, Tabs} from "antd";
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

    const {route} = props;

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    const [graphics, setGraphics] = useState([]);

    const [descTime, setDescTime] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllInformationByHostId,
        findAllMonitor,
        findInformationByLine
    } = monitorLayoutStore;

    const [reportData, setReportData] = useState([]);

    const dom = useRef(null);


    async function checkTabGraphics(activeKey) {

        setSearchCondition({
            beginTime: null,
            endTime: null
        })

        if (activeKey === "2") {

            const monitors = await findAllMonitor()
            setMonitorList([...monitors])

            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            setSearchCondition({
                hostId: localStorage.getItem("hostIdForMonitoring"),
                monitorId: monitors[0].id,
                source: monitors[0].monitorSource
            })

            const resData = await findInformationByLine();
            // setGraphics([...resData])

            const times = await findDescGatherTime();
            // setDescTime([...times])

            if (dom) {

                const chartDom = dom.current

                const myChart = echarts.init(chartDom);

                const option = {
                    title: {
                        text: "主机名称:" + localStorage.getItem("hostName")
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    /*legend: {
                        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                    },*/
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: times
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: resData
                };

                option && myChart.setOption(option);
            }

        }

        if (activeKey === "3") {
            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            const hostId = localStorage.getItem("hostIdForMonitoring");
            setSearchCondition({
                hostId: hostId,
                reportType: 1
            })
            const resData = await findAllInformationByHostId()
            setReportData([...resData])
            const descTime = await findDescGatherTime();
            setDescTime([...descTime])

        }


    }

    const onChange = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1]
        })
        const resData = await findInformationByLine();

        const times = await findDescGatherTime();

        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: "主机名称:" + localStorage.getItem("hostName")
                },
                tooltip: {
                    trigger: 'axis'
                },
                /*legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },*/
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: times
                },
                yAxis: {
                    type: 'value'
                },
                series: resData
            };

            option && myChart.setOption(option);
        }
    };
    useEffect(async () => {
        //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
        const hostId = localStorage.getItem("hostIdForMonitoring");
        setSearchCondition({
            hostId: hostId,
            reportType: 1
        })
        const resData = await findAllInformationByHostId()
        setReportData([...resData])
        const descTime = await findDescGatherTime();
        setDescTime([...descTime])
    }, []);


    async function onCheckMonitor(value, options) {
        if (value !== undefined) {
            setSearchCondition({
                hostId: localStorage.getItem("hostIdForMonitoring"),
                monitorId: value[1],
                source: value[2]
            })
        }


        const resData = await findInformationByLine();
        setGraphics([...resData])

        const times = await findDescGatherTime();
        setDescTime([...times])

        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: "主机名称:" + localStorage.getItem("hostName")
                },
                tooltip: {
                    trigger: 'axis'
                },
                /*legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },*/
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: descTime
                },
                yAxis: {
                    type: 'value'
                },
                series: resData
            };

            option && myChart.setOption(option);
        }

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
                                    <Breadcrumb.Item onClick={goBackHome}>
                                        <span style={{cursor: "pointer"}}>Home</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="details-table-title">
                                    <Tabs defaultActiveKey="3"  onTabClick={(activeKey) => checkTabGraphics(activeKey)}>
                                        <Tabs.TabPane tab="列表展示" key="1">
                                            <MonitoringDetails/>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="单个监控展示" key="2">
                                            <div className="details-tabs-wrap">
                                                <Select
                                                    placeholder="请选择您的监控项"
                                                    allowClear
                                                    autoClearSearchValue
                                                    onChange={(value, options) => onCheckMonitor(value, options)}
                                                    options={monitorList && monitorList.map(item => ({
                                                        label: item.monitorItem.dataSubclass,
                                                        key: item.id,
                                                        value: [item.monitorItem.dataSubclass, item.id, item.monitorSource],
                                                    }))}
                                                >
                                                </Select>
                                                <RangePicker
                                                    format="YYYY-MM-DD"
                                                    onChange={onChange}
                                                />
                                                <div id="scatter" className='chart' ref={dom}
                                                     style={{width: 1000, height: 800, margin: 30}}>
                                                </div>
                                            </div>
                                        </Tabs.TabPane>

                                        <Tabs.TabPane tab="整体展示" key="3">
                                            <div className="details-tabs-wrap">
                                                {
                                                    reportData && reportData.map((item, index) => {
                                                        return (
                                                            <MonitoringItem reportType={index} index={index}
                                                                            key={index} condition={item} /*descTime={descTime}*//>
                                                        )
                                                    })
                                                }
                                            </div>
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
    )
        ;
};

export default withRouter(MonitorLayout);