import {observer, Provider} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import {Breadcrumb, DatePicker, Empty, Select, Tabs} from "antd";
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

    // const [descTime, setDescTime] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllInformationByHostId,
        findAllMonitor,
        findInformationByLine,
        findInformationByGraphics,
        condition,
        descTime,
        setDescTime
    } = monitorLayoutStore;

    const [reportData, setReportData] = useState([]);

    const dom = useRef(null);


    async function checkTabGraphics(activeKey) {

        setSearchCondition({
            beginTime: null,
            endTime: null
        })

        if (activeKey === "1") {

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

                myChart.clear()

                option && myChart.setOption(option);
            }

        }

        if (activeKey === "2") {
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

    useEffect(async () => {

        const monitors = await findAllMonitor()
        setMonitorList([...monitors])

        //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
        const hostId = localStorage.getItem("hostIdForMonitoring");

        setSearchCondition({
            hostId: hostId,
            reportType: 1
        })

        const resData = await findAllInformationByHostId();
        setReportData([...resData])

        const descTime = await findDescGatherTime();
        setDescTime([...descTime])

    }, []);


    const onChange = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1],
        })

        const resData = await findAllInformationByHostId()
        setReportData([...resData])

        const descTime = await findDescGatherTime();
        setDescTime([...descTime])

        /*if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: "主机名称:" + localStorage.getItem("hostName")
                },
                tooltip: {
                    trigger: 'axis'
                },
                /!*legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },*!/
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

            myChart.clear()

            option && myChart.setOption(option);
        }*/

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

        const resData = await findInformationByGraphics();

        setReportData([...resData])

        const times = await findDescGatherTime();
        setDescTime([...times])

        console.log(reportData)

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
                                                reportData[0] && reportData[0].length > 0 ?
                                                    <div className="details-tabs-wrap">
                                                        {
                                                            reportData && reportData.map((item, index) => {
                                                                return (
                                                                    <MonitoringItem reportType={item[0].reportType}
                                                                                    index={index}
                                                                                    key={index} condition={item}
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