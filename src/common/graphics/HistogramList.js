import React, {useEffect, useRef} from 'react';
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
import {BarChart, LineChart, PieChart, ScatterChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {observer} from "mobx-react";
import "../../host/monitoring/components/MonitorGraphics.scss"
import {Col} from "antd";

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

    let title = "ECharts 示例标题";

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
        if (value === null || value === "null"){
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

    let conditionList = [];

    async function showHistogram() {

        title = condition[0]?.graphicsName

        condition.map((item, index) => {
            series.push({
                name: item.name,
                type: "bar",
                data: item.data.map(function (value) {

                    return {
                        value: value,
                        itemStyle: {
                            color: checkListColor(value, item.mapList)
                        }
                    };
                }),
            })
            nameList.push(item.name)
            /*if (item.problem !== null && item.problem !== undefined && item.problem !== ''){
                conditionList.push({
                    name:item.name,
                    problem:item.problem
                })
            }*/
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
            const chartDom = dom.current

            if (echarts.getInstanceByDom(chartDom)) {
                echarts.dispose(chartDom);
            }

            const myChart = echarts.init(chartDom);
            const option = {
                title: {
                    text: title, // 标题文本
                    // subtext: '副标题文本', // 副标题文本（可选）
                    left: 'left', // 标题的位置，可以是 'left', 'center', 'right'
                    top: 'top', // 标题的垂直位置，可以是 'top', 'middle', 'bottom'
                    textStyle: {
                        color: '#333', // 文字颜色
                        fontStyle: 'normal', // 文字风格，可以是 'normal', 'italic', 'oblique'
                        fontWeight: 'bold', // 文字粗细，可以是 'normal', 'bold', 'bolder', 'lighter'
                        fontFamily: 'sans-serif', // 字体系列
                        fontSize: 16 // 文字大小
                    },
                    subtextStyle: {
                        color: '#aaa', // 副标题颜色
                        fontStyle: 'italic', // 副标题风格
                        fontWeight: 'normal', // 副标题粗细
                        fontFamily: 'sans-serif', // 副标题字体系列
                        fontSize: 14 // 副标题大小
                    }
                },
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
                            if (problemName !== ''){
                                textList.push(problemName + '<br/>');
                            }
                        }

                        if (textList.length > 0) {
                            return tooltipContent + '<hr/>' + tagText + textList;
                        }

                        return tooltipContent;
                    }
                },
                legend: {
                    data: nameList,
                    top: 30
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                    top: 100
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
        <div key={`histogram-${index}`} id={`histogram-${index}`}>
            <Col key="chartsthree" ref={dom}
                 style={{
                     position: "relative",
                     width: "100%",
                     height: "100%", margin: "auto",
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

export default observer(HistogramList);