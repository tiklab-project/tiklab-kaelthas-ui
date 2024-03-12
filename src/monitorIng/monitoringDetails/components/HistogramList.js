import React, {useEffect, useRef, useState} from 'react';
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
import {LineChart, PieChart, ScatterChart, BarChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import monitorLayoutStore from "../store/MonitorLayoutStore";
import {DatePicker, Select} from "antd";

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
    PieChart,
    BarChart
]);

const {RangePicker} = DatePicker;
const HistogramList = (props) => {

    const dom = useRef(null);

    const [monitorList, setMonitorList] = useState([]);

    const series = [];

    const nameList = [];

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllInformationByHostId,
        findAllMonitor,
        findInformationByLine
    } = monitorLayoutStore;

    const {reportData} = props;

    const {index, condition, descTime} = props;

    async function showHistogram() {
        const hostId = localStorage.getItem("hostIdForMonitoring");
        setSearchCondition({
            hostId: hostId,
            reportType: 3
        })
        const descTime = await findDescGatherTime();

        condition.map(item => {
            series.push({
                data: item.data,
                name: item.name,
                type: "bar"
            })
            nameList.push(item.name)
        })

        if (dom) {
            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: nameList
                },
                xAxis: {
                    type: 'category',
                    data: descTime
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            };


            option && myChart.setOption(option);
        }
    }

    useEffect(async () => {
        const monitors = await findAllMonitor()
        setMonitorList([...monitors])
        await showHistogram();
    }, [dom]);


    async function onCheckMonitor(value, options) {

        if (value !== undefined) {
            setSearchCondition({
                hostId: localStorage.getItem("hostIdForMonitoring"),
                monitorId: value[1],
                source: value[2]
            })
        }


        const resData = await findInformationByLine();

        const times = await findDescGatherTime();

        if (dom) {

            const current = dom.current;

            const myChart = echarts.init(current);

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: times
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: resData[0].name,
                        type: "bar",
                        data: resData[0].data
                    }
                ]
            };
            myChart.clear()
            option && myChart.setOption(option);
        }

    }

    const onChange = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1],
            monitorId: monitorList[0].id,
            source: monitorList[0].monitorSource
        })
        const resData = await findInformationByLine();

        const times = await findDescGatherTime();

        if (dom) {

            const current = dom.current;

            const myChart = echarts.init(current);

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: times
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: resData[0].name,
                        type: "bar",
                        data: resData[0].data
                    }
                ]
            };
            myChart.clear()
            option && myChart.setOption(option);
        }
    };

    return (
        <div>
            <div className="item-tabs-item">
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
                <div key="chartsone" ref={dom}
                     style={{width: "100%",
                         height: 300, margin: 30}}
                >

                </div>
            </div>
        </div>
    );
};

export default HistogramList;