import React, {useEffect, useRef, useState} from "react";

import "./HomePage.scss";
import "../../host/hostPage/components/Host";
import {Col, Empty, Progress, Row} from "antd";
import homeStore from "../store/HomeStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components';
import {PieChart, BarChart} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    GridComponent,
    BarChart
]);

const HomePage = (props) => {

    const {
        findHomeRecentList,
        hostRecentList,
        findDynamicList,
        dynamicList,
        updateHostRecent,
        findAlarmTypeNum,
        leave,
        findHostUsage,
        findTypeDistribution,
        distributionList
    } = homeStore;

    const {setNullCondition} = alarmPageStore;

    const dom = useRef(null);

    const dom2 = useRef(null);

    const leveObj = {"1": "灾难", "2": "严重", "3": "一般严重", "4": "告警", "5": "信息", "6": "未分类"};

    const [homeObj, setHomeObj] = useState([]);

    const series = [];

    let series2 = [];

    let hName = [];

    const host = async (item) => {
        await updateHostRecent(item)
        sessionStorage.setItem("menuKey", "host")
        localStorage.setItem("hostId", item.hostId);
        localStorage.setItem('url', `/hostList/${item.hostId}/hostDetails`)
        props.history.push(`/hostList/${item.hostId}/hostDetails`)
    }

    useEffect(async () => {
        await extractedUseEffect();
    }, [dom?.current, dom2?.current]);

    useEffect(async () => {
        const intervalId = setInterval(async () => {
            await extractedUseEffect()
        }, 10000);
        // 清除定时器的方法
        return () => clearInterval(intervalId);
    }, [dom?.current]);

    async function extractedUseEffect() {
        await findHomeRecentList();
        setNullCondition();
        await findDynamicList();
        findHostUsage().then(res => {
            if (res.code === 0) {
                setHomeObj(res.data)
            }
        })
        const resData = await findAlarmTypeNum();
        const typeData = [];

        const disData = await findTypeDistribution();

        series2 = []
        series2.push(
            {
                name: "告警数量",
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: disData !== null ? disData["count"] : [],
                animationDuration: 0, // 动画持续时间
                animationEasing: 'cubicOut' // 动画缓动效果
            }
        )

        hName = []
        hName.push(disData !== null ? disData["ip"] : [])

        resData?.map((item) => {
            let colorTag;
            switch (item?.severityLevel) {
                case "1":
                    colorTag = '#ff0003'
                    break
                case "2":
                    colorTag = '#e97659'
                    break
                case "3":
                    colorTag = 'orange'
                    break
                case "4":
                    colorTag = '#fac858'
                    break
                case "5":
                    colorTag = '#FFFFE0'
                    break
                case "6":
                    colorTag = 'grey'
                    break
            }
            if (item.length !== 0) {
                typeData.push(
                    {
                        name: leveObj[item?.severityLevel],
                        value: item?.alarmNum,
                        itemStyle: {color: colorTag}
                    }
                )
            }
        })

        series.push({
            name: '告警类型及对应数量',
            type: 'pie',
            radius: '50%',
            label: {
                formatter: '{b}: {c} ({d}%)'
            },
            data: typeData,
            animationDuration: 0, // 动画持续时间
            // animationEasing: 'cubicOut' // 动画缓动效果
        })
        showGraphics();
        showGraphics2();
    }


    function showGraphics() {
        if (dom?.current) {
            const chartDom = dom.current

            if (echarts.getInstanceByDom(chartDom)) {
                echarts.dispose(chartDom);
            }

            const myChart = echarts.init(chartDom);

            const option = {
                title: {
                    text: '告警类型分布情况',
                    subtext: '(全部主机未解决告警)',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: series
            };

            if (myChart) {
                myChart.clear()
            }

            myChart.setOption(option);
        }
    }

    function showGraphics2() {

        if (dom2?.current) {
            const chartDom = dom2.current
            if (echarts.getInstanceByDom(chartDom)) {
                echarts.dispose(chartDom);
            }

            const myChart2 = echarts.init(chartDom);

            const option2 = {
                /*title: {
                    text: '告警类型分布情况',
                    subtext: '(设备类型维度)',
                    left: 'center'
                },*/
                legend: {
                    /*orient: 'vertical',
                    left: 'left'*/
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: hName
                },
                series: series2
            };

            if (myChart2) {
                myChart2.clear()
            }

            myChart2.setOption(option2);
        }
    }


    function hrefHost() {
        sessionStorage.setItem("menuKey", "host")
        props.history.push(`/configuration`)
    }

    function hrefAlarm() {
        sessionStorage.setItem("menuKey", "alarm");
        props.history.push(`/alarm`);
    }

    function divideAndRound(a, b) {
        if (b === 0) {
            return 0;
        }
        let result = a / b;
        return result.toFixed(1);
    }

    function hrefTemplate() {
        props.history.push(`/setting/template`);
        sessionStorage.setItem("menuKey", null)
    }

    function hrefHostGroup() {
        props.history.push(`/setting/hostGroup`)
        sessionStorage.setItem("menuKey", null)
    }

    const fullScreenRef = useRef(null);

    const handleFullScreenToggle = () => {
        if (!document.fullscreenElement) {
            fullScreenRef.current.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (

        <Row className="home">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="home-body">
                    <div className="host-graphics-list" ref={fullScreenRef}>
                        <div className="home-graphics-title">
                            <div className="home-content-title-text">
                                主机概览
                            </div>
                            <div onClick={handleFullScreenToggle} className="host-graphics-choose">
                                <svg className="common-icon-show" aria-hidden="true">
                                    <use xlinkHref={`#icon-fullScreen`}></use>
                                </svg>
                            </div>
                        </div>

                        <div className="host-graphics">
                            {
                                leave && leave?.length > 0 ?
                                    <div key="chartsShow" ref={dom} className="host-graphics-chart">

                                    </div>
                                    :
                                    <div className="host-graphics-chart">
                                        <Empty className="empty-style"/>
                                    </div>
                            }
                            {
                                distributionList !== null ?
                                    <div key="chartsShow2" ref={dom2} className="host-graphics-chart">

                                    </div>
                                    :
                                    <div className="host-graphics-chart">
                                        <Empty className="empty-style"/>
                                    </div>
                            }
                        </div>
                        {/*<div className="host-graphics-line">
                            <div className="host-graphics-overview" onClick={() => hrefHost()}>
                                <div className="host-graphics-title">
                                    <span>异常主机/主机总数</span>
                                    <span>
                                    <span
                                        style={{color: "red"}}>{homeObj?.hostAbnormal}
                                    </span>
                                        /
                                    <span
                                        style={{color: "blue"}}>{homeObj?.hostCount}
                                    </span>
                                    </span>
                                </div>
                                <div className="host-graphics-progress">
                                    <Progress
                                        strokeColor={{
                                            '0%': '#ff0003',
                                            '100%': '#ff0003',
                                        }}
                                        percent={divideAndRound(homeObj?.hostAbnormal * 100, homeObj?.hostCount)}/>
                                </div>
                            </div>
                            <div className="host-graphics-overview" onClick={() => hrefAlarm()}>
                                <div className="host-graphics-title">
                                    <span>未解决告警数量/告警数量</span>
                                    <span>
                                        <span style={{color: "red"}}>
                                            {homeObj?.alarmTimeNum}
                                        </span>
                                            /
                                        <span style={{color: "blue"}}>
                                            {homeObj?.alarmNum}
                                        </span>
                                    </span>
                                </div>
                                <div className="host-graphics-progress">
                                    <Progress
                                        strokeColor={{
                                            '0%': '#ff0003',
                                            '100%': '#ff0003',
                                        }}
                                        percent={divideAndRound(homeObj?.alarmTimeNum, homeObj?.alarmNum / 100)}/>
                                </div>
                            </div>
                        </div>*/}
                        <div className="host-graphics-line">
                            <div className="host-one-overview" onClick={() => hrefHost()}
                                 style={{cursor: "pointer"}}>
                                    <span>
                                        <span
                                            style={{color: "red"}}>{homeObj?.hostAbnormal}
                                        </span>
                                            /
                                        <span
                                            style={{color: "blue"}}>{homeObj?.hostCount}
                                        </span>
                                    </span>
                                <span className="host-one-title-text">异常主机/主机总数</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefAlarm()}
                                 style={{cursor: "pointer"}}>
                                    <span>
                                        <span style={{color: "red"}}>
                                            {homeObj?.alarmTimeNum}
                                        </span>
                                            /
                                        <span style={{color: "blue"}}>
                                            {homeObj?.alarmNum}
                                        </span>
                                    </span>
                                <span className="host-one-title-text">未解决告警数量/告警数量</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefTemplate()}
                                 style={{cursor: "pointer"}}>
                                <span>{homeObj?.templateNum}</span>
                                <span className="host-one-title-text">模板数量</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefHostGroup()}
                                 style={{cursor: "pointer"}}>
                                <span>{homeObj?.hostGroupNum}</span>
                                <span className="host-one-title-text">主机组数量</span>
                            </div>
                        </div>
                        <div className="host-graphics-line">
                            <div className="host-one-overview">
                                <span>{homeObj?.monitorNum}</span>
                                <span className="host-one-title-text">监控项数量</span>
                            </div>
                            <div className="host-one-overview">
                                <span>{homeObj?.graphicsNum}</span>
                                <span className="host-one-title-text">图形数量</span>
                            </div>
                            <div className="host-one-overview">
                                <span>{homeObj?.triggerNum}</span>
                                <span className="host-one-title-text">触发器数量</span>
                            </div>
                            <div className="host-one-substitute">

                            </div>
                        </div>
                    </div>

                    <div className="home-content">
                        <div className="home-content-title">
                            <div className="home-content-title-text">
                                常用主机
                            </div>
                        </div>
                        {
                            hostRecentList && hostRecentList?.length > 0 ?
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
                                                            <span>{item?.state === 1 ? "启用" : "关闭"}</span>
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