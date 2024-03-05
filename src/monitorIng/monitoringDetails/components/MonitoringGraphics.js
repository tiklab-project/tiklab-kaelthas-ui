import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from "react-router-dom";
import * as echarts from "echarts/core";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";

const MonitoringGraphics = (props) => {

    const {findInformationByGraphics, findDescGatherTime, setSearchCondition} = monitoringDetailsStore;

    const dom = useRef(null);

    const [dataList, setDataList] = useState([]);

    useEffect(async () => {

        //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
        const hostId = localStorage.getItem("hostIdForMonitoring");
        const resData = await findInformationByGraphics(hostId);

        setSearchCondition({
            hostId: hostId
        })

        const descTime = await findDescGatherTime();


        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: '主机下数据折线图'
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
                    // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','1','2','3']
                },
                yAxis: {
                    type: 'value'
                },
                series: resData
            };

            option && myChart.setOption(option);
        }
    }, [dom]);

    return (
        <div className='echarts'>
            <div id="scatter" className='chart' ref={dom} style={{width: 1000, height: 800}}>

            </div>
        </div>
    );
};

export default withRouter(MonitoringGraphics);