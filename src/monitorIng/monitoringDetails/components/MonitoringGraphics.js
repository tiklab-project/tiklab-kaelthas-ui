import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from "react-router-dom";
import * as echarts from "echarts/core";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";

const MonitoringGraphics = (props) => {

    const {resData,descTime} = props;

    const dom = useRef(null);

    const [dataList, setDataList] = useState([]);

    /*useEffect(async () => {


        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: "主机名称:"+localStorage.getItem("hostName")
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
                    // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','1','2','3']
                },
                yAxis: {
                    type: 'value'
                },
                series: resData
            };

            option && myChart.setOption(option);
        }
    }, [dom]);*/

    return (
        <div className='echarts'>
            <div id="scatter" className='chart' ref={dom} style={{width: 1000, height: 800}}>

            </div>
        </div>
    );
};

export default withRouter(MonitoringGraphics);