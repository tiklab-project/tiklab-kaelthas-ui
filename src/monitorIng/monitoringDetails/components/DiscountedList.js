import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts/core";
import monitorLayoutStore from "../store/MonitorLayoutStore";
import {observer} from "mobx-react";


const DiscountedList = (props) => {

    const dom = useRef(null);

    const {
        findDescGatherTime
    } = monitorLayoutStore;

    const {condition,descTime} = props;

    const series = [];

    const nameList = [];

    const rendingView = async () => {

        // const descTime = await findDescGatherTime();

        condition.map(item => {
            series.push({
                data: item.data,
                name: item.name,
                type: "line"
            })
            nameList.push(item.name)
        })


        if (dom) {
            const chartDom = dom.current

            // chartDom.removeAttribute('_echarts_instance_')

            const myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: nameList
                },
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
                series: series
            };
            if (myChart) {
                myChart.clear()
            }
            myChart.setOption(option);
        }
    };

    useEffect(async () => {
        console.log("DiscountedList中:",condition)
        await rendingView()
    }, [dom,condition,descTime]);


    return (
        <div>
            <div className="item-tabs-item">
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

export default observer(DiscountedList);