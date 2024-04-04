import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts/core";
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent
} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {observer} from "mobx-react";

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);
const AreaCharts = (props) => {

    const dom = useRef(null);

    const series = [];

    const nameList = [];

    const {condition, descTime, index} = props;

    async function showPei() {
        condition.map(item => {
            series.push(
                {
                    name: item.name,
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: item.data
                }
            )
            nameList.push(
                item.name
            )
        })

        if (dom) {
            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: nameList
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: descTime,
                        //inverse:true
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: series
            };

            if (myChart) {
                myChart.clear()
            }
            myChart.setOption(option);
        }
    }

    useEffect(async () => {
        await showPei();
    }, [dom, condition, descTime]);
    return (
        <div className="item-tabs-item" key={`area-${index}`} id={`area-${index}`}>
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

export default observer(AreaCharts);