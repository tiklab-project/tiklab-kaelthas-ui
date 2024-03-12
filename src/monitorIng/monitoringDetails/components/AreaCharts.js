import React, {useEffect, useRef} from 'react';
import monitorLayoutStore from "../store/MonitorLayoutStore";
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
import {DatePicker} from "antd";

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

const {RangePicker} = DatePicker;
const AreaCharts = (props) => {

    const dom = useRef(null);

    const series = [];

    const nameList = [];

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllInformationByHostId
    } = monitorLayoutStore;

    const {index, condition} = props;

    async function showPei() {
        const hostId = localStorage.getItem("hostIdForMonitoring");
        setSearchCondition({
            hostId: hostId,
            reportType: 1
        })
        const resData = await findAllInformationByHostId()
        const descTime = await findDescGatherTime();

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
                title: {
                    text: '主机名称:' + localStorage.getItem("hostName")
                },
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
                        data: descTime
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: series
                /*[
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                ]*/
            };

            option && myChart.setOption(option);
        }
    }

    const onChangeAll = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1]
        })
        const resData = await findAllInformationByHostId();

        const times = await findDescGatherTime();


    };

    useEffect(() => {
        showPei();
    }, [dom]);
    return (
        <div>
            <div className="item-tabs-item">
                {/*<RangePicker
                    format="YYYY-MM-DD"
                    onChange={onChangeAll}
                />*/}
                <div key="chartsone" ref={dom}
                     style={{
                         width: "100%",
                         height: 300, margin: 30
                     }}
                >

                </div>
            </div>
        </div>
    );
};

export default AreaCharts;