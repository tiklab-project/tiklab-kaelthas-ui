import React, {useEffect, useRef} from 'react';
import * as echarts from "echarts/core";
import monitorLayoutStore from "../store/MonitorLayoutStore";


const DiscountedList = (props) => {

    const dom = useRef(null);

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllInformationByHostId
    } = monitorLayoutStore;

    const {index, condition,descTime} = props;

    const nameList = [];

    const rendingView = async () => {
        const hostId = localStorage.getItem("hostIdForMonitoring");
        setSearchCondition({
            hostId: hostId,
            reportType: 4
        })
        const resData = await findAllInformationByHostId()

        const descTime = await findDescGatherTime();

        condition.map(item =>{
            nameList.push(item.name)
        })

        if (dom) {
            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: "主机名称:" + localStorage.getItem("hostName")
                },
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
                series: condition
            };

            option && myChart.setOption(option);
        }
    };

    useEffect(() => {
        rendingView()
    }, [dom]);


    return (
        <div>
            <div className="item-tabs-item">
                <div key="chartsone" ref={dom}
                     style={{width: "100%",
                         height: 300, margin: 30}}
                >

                </div>
            </div>
        </div>
    );
};

export default DiscountedList;