import React, {useEffect, useRef, useState} from "react";

import "./HomePage.scss";
import "../../host/hostPage/components/Host";
import {Col, Empty, Image, Layout, Row, Table} from "antd";
import homeStore from "../store/HomeStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent
} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    DataZoomComponent
]);

const HomePage = (props) => {

    const {
        findHomeRecentList,
        hostRecentList,
        findDynamicList,
        dynamicList,
        updateHostRecent,
        getAlertCategory,
        leave
    } = homeStore;

    const {setNullCondition} = alarmPageStore;

    const dom = useRef(null);

    const leaveList = ['灾难', '严重', '一般严重', '告警', '信息', '未分类']

    const series = [];

    const host = async (item) => {
        await updateHostRecent(item)
        sessionStorage.setItem("menuKey", "configuration")
        localStorage.setItem("hostId", item.hostId);
        localStorage.setItem('url', `/hostList/${item.hostId}/hostDetails`)
        props.history.push(`/hostList/${item.hostId}/hostDetails`)
    }

    useEffect(async () => {
        await findHomeRecentList();
        setNullCondition();
        // await findAlarmPage();
        await findDynamicList();
    }, []);

    useEffect(async () => {
        const resData = await getAlertCategory();
        resData?.leaveList.map((item, index) => {
            let colorTag;
            switch (index) {
                case 0:
                    colorTag = 'red'
                    break
                case 1:
                    colorTag = '#e97659'
                    break
                case 2:
                    colorTag = 'orange'
                    break
                case 3:
                    colorTag = 'yellow'
                    break
                case 4:
                    colorTag = 'blue'
                    break
                case 5:
                    colorTag = 'grey'
                    break
            }
            if (item.length !== 0) {
                series.push({
                    name: leaveList[index],
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        color: colorTag
                    },
                    data: item
                })
            }
        })
        showGraphics();
    }, [dom?.current]);


    function showGraphics() {
        if (dom?.current) {
            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: leave?.nameList
                },
                yAxis: {
                    type: 'value',
                },
                dataZoom: [
                    {
                        type: 'slider', // 显示为滑动条
                        start: 0,       // 起始位置（百分比）
                        end: 100        // 结束位置（百分比）
                    },
                    {
                        type: 'inside', // 鼠标滚轮缩放
                        start: 0,
                        end: 100
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


    return (

        <Row className="home">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="home-body">
                    <div className="home-content">
                        <div className="home-content-title">
                            <div className="home-content-title-text">
                                常用主机
                            </div>
                        </div>
                        {
                            hostRecentList.length > 0 ?
                                <div className="home-content-detail">
                                    {
                                        hostRecentList && hostRecentList.map(item => {
                                            return (
                                                <div className="home-content-detail-item" onClick={() => host(item)}
                                                     key={item.id}>
                                                    <div className="item-title">
                                                        <div className="item-title-png">
                                                            <div
                                                                className={`user-big-icon mf-icon-${item?.color}`}>{item?.hostName?.substring(0, 1).toUpperCase()}</div>
                                                        </div>
                                                        <div className="item-title-text">
                                                            <span>{item?.hostName}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item-work">
                                                        <div className="item-work-item">
                                                            <span className="item-work-label"
                                                                  style={{color: "#999"}}>告警数量</span>
                                                            <span>{item?.alarmNum}</span>
                                                        </div>
                                                        <div className="item-work-item">
                                                            <span className="item-work-label"
                                                                  style={{color: "#999"}}>主机状态</span>
                                                            <span>{item?.state === 1 ? "已启用" : "未启用"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <Empty/>
                        }

                    </div>
                    <div className="host-graphics">
                        <div className="home-graphics-title">主机状况</div>
                        {
                            leave?.nameList && leave.nameList.length>0?
                                <Col key="chartsShow" ref={dom}
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
                                :
                                <Empty/>
                        }

                    </div>
                    <div className="home-dynamic-table">
                        <div className="home-table-title">动态信息</div>
                        {
                            dynamicList.length > 0 ?
                                <div className="home-alarm-table-list">
                                    {
                                        dynamicList && dynamicList.map(item => {
                                            return (
                                                <div className="home-alarm-table-line" key={item.id}>
                                                    <div className="home-alarm-table-div">{item.name}</div>
                                                    <div className="home-alarm-table-line">{item.updateTime} </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <Empty/>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default observer(HomePage);