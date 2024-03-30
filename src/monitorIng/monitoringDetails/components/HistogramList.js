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
import {observer} from "mobx-react";

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
const HistogramList = (props) => {

    const dom = useRef(null);

    const series = [];

    const nameList = [];

    const {descTime, condition, index} = props;

    async function showHistogram() {

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
            if (myChart) {
                myChart.clear()
            }
            myChart.setOption(option);
        }
    }

    useEffect(async () => {
        await showHistogram();
    }, [dom, condition, descTime]);

    return (
        <div className="item-tabs-item" key={`histogram-${index}`} id={`histogram-${index}`}>
            <div key="chartsone" ref={dom}
                 style={{
                     width: "100%",
                     height: 300, margin: 30
                 }}
            >

            </div>
        </div>
    );
};

export default observer(HistogramList);