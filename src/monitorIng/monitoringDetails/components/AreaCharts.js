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
import "./MonitoringDetails.scss"
import {Col} from "antd";
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

    let myChart = null;

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
            if (myChart){
                myChart.dispose();
            }

            const chartDom = dom.current

            myChart = echarts.init(chartDom);

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
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: series
            };


            myChart.setOption(option);
        }
    }

    useEffect(async () => {
        await showPei();
    }, [dom, condition, descTime]);
    return (
        <div className="item-tabs-item" key={`area-${index}`} id={`area-${index}`}>
            <Col key="chartstwo" ref={dom}
                 style={{
                     position: "relative",
                     width: 1200,
                     height: 492, margin: "auto",
                     borderWidth: 0,
                     cursor: "default",
                     padding: 20
                 }}
                 xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}
            >

            </Col>
        </div>
    );
};

export default observer(AreaCharts);