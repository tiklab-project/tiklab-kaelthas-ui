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

    const conditionList = [];

    const {condition, descTime, index} = props;

    function checkColor(value, threshold, operator) {

        switch (operator) {
            case '>':
                return threshold == null ? null : (value > threshold ? 'red' : null);
            case '>=':
                return threshold == null ? null : (value >= threshold ? 'red' : null);
            case '<':
                return threshold == null ? null : (value < threshold ? 'red' : null);
            case '<=':
                return threshold == null ? null : (value <= threshold ? 'red' : null);
            case '!=':
                return threshold == null ? null : (value !== threshold ? 'red' : null);
            case '==':
                return threshold == null ? null : (value === threshold ? 'red' : null);
            default:
                return null;
        }
    }

    function checkListColor(value, mapList) {
        if (value === null || value === "null") {
            return null
        }
        let color = null
        mapList.map(item => {
            let red = checkColor(Number(value), Number(item.value), item.operator);
            if (red != null) {
                color = red;
            }
        })
        return color;
    }

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
                    data: item.data.map(function (value) {
                        return {
                            value: value,
                            itemStyle: {
                                // color: item.reportData == null ? null : (value > item.reportData ? 'red' : null)
                                color: checkListColor(value, item.mapList)

                            }
                        };
                    }),
                }
            )
            nameList.push(item.name)
            if (item.mapList.length > 0) {
                item.mapList.map(trigger => {
                    conditionList.push({
                        name: item.name,
                        problem: trigger.problem,
                        value: trigger.value,
                        operator: trigger.operator
                    })
                })
            }
        })

        if (dom) {
            if (myChart) {
                myChart.dispose();
            }

            const chartDom = dom.current

            myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let tagText = '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' + 'red' + '"></span>' + '告警:'
                        let textList = [];
                        let tooltipContent = params[0].name + '<br/>'; // 显示 X 轴的值
                        // 遍历每个数据项，构建对应的信息
                        params.forEach(function (item) {
                            // 添加颜色点
                            tooltipContent += '<span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:' + item.color + '"></span>';
                            tooltipContent += item.seriesName + ':' + item.value + '<br/>'; // 显示系列名
                            if (item.color === 'red') {
                                conTypeList(conditionList, item.seriesName, item.value); // 添加其他内容
                            }
                        });


                        function conTypeList(conditionList, seriesName, value) {
                            let problemName = ''

                            // 使用 filter 方法过滤非空元素
                            const nonEmptyElements = conditionList.filter(function (element) {
                                // 如果元素不为空，则返回 true，保留该元素
                                return element !== null && element !== undefined && element !== '';
                            });

                            if (nonEmptyElements.length === 0) {
                                return ''
                            }

                            conditionList.map(item => {
                                if (item.name === seriesName) {
                                    const red = checkColor(Number(value), Number(item.value), item.operator);
                                    if (red != null) {
                                        problemName += item?.problem + '<br/>'
                                    }
                                }
                            })
                            if (problemName != null) {
                                textList.push(problemName + '<br/>');
                            }
                        }

                        if (textList.length > 0) {
                            return tooltipContent + '<hr/>' + tagText + textList;
                        }

                        return tooltipContent;
                    }
                },
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
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
            <Col key="chartstwo" ref={dom}
                 style={{
                     position: "relative",
                     width: 1000,
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