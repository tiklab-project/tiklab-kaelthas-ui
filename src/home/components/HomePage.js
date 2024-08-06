import React, {useEffect, useRef, useState} from "react";

import "./HomePage.scss";
import "../../host/hostPage/components/Host";
import {Col, Empty, Row} from "antd";
import homeStore from "../store/HomeStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";
import * as echarts from 'echarts/core';
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from 'echarts/components';
import {BarChart, PieChart} from 'echarts/charts';
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

    const leveObj = {"1": "灾难", "2": "严重", "3": "一般严重", "4": "告警", "5": "信息", "6": "未分类"};

    const [homeObj, setHomeObj] = useState();

    const series = [];

    const host = async (item) => {
        await updateHostRecent(item)
        sessionStorage.setItem("menuKey", "host")
        localStorage.setItem("hostId", item.hostId);
        localStorage.setItem('url', `/hostList/${item.hostId}/hostDetails`)
        props.history.push(`/hostList/${item.hostId}/hostDetails`)
    }

    useEffect(async () => {
        await extractedUseEffect();
    }, [dom?.current]);

    useEffect(async () => {
        const intervalId = setInterval(async () => {
            await extractedUseEffect()
        }, 30000);
        // 清除定时器的方法
        return () => clearInterval(intervalId);
    }, [dom?.current]);

    async function extractedUseEffect() {
        setNullCondition();
        // await findDynamicList();
        findHostUsage().then(res => {
            if (res.code === 0) {
                setHomeObj(res.data)
            }
        })
        const resData = await findAlarmTypeNum();
        const typeData = [];

        await findTypeDistribution();

        resData?.map((item) => {
            let colorTag;
            switch (item?.severityLevel) {
                case 1:
                    colorTag = '#ff0003'
                    break
                case 2:
                    colorTag = '#e97659'
                    break
                case 3:
                    colorTag = 'orange'
                    break
                case 4:
                    colorTag = '#fac858'
                    break
                case 5:
                    colorTag = 'yellow'
                    break
                case 6:
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
                    subtext: '(未解决告警数量)',
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


    function hrefHost() {
        sessionStorage.setItem("menuKey", "host")
        props.history.push(`/configuration`)
    }

    function hrefAlarm() {
        sessionStorage.setItem("menuKey", "alarm");
        props.history.push(`/alarm`);
    }

    function divideAndRound(a, b) {

        const value = isNaN(a / b) ? 'Invalid value' : (a / b).toString();

        return value.toFixed(1);
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

    const handleFullScreenToggle = async () => {
        if (!document.fullscreenElement) {
            fullScreenRef.current.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            await document.exitFullscreen();
        }
    };

    function conversionNum(value) {
        if (isNaN(value) || value <= 0) {
            return 0;
        }
        return value;
    }

    return (

        <Row className="home">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="home-body" ref={fullScreenRef}>
                    <div className="host-graphics-list">
                        <div className="home-graphics-title">
                            <div className="home-graphics-title-text">
                                告警概览
                            </div>
                            <div onClick={handleFullScreenToggle} className="host-graphics-choose">
                                <svg className="common-icon-show" aria-hidden="true">
                                    <use xlinkHref={`#icon-fullScreen`}></use>
                                </svg>
                            </div>
                        </div>

                        <div className="host-graphics-line">
                            <div className="host-one-overview" onClick={() => hrefHost()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text">
                                    <span
                                        style={{color: "red"}}>{conversionNum(homeObj?.hostAbnormal)}
                                    </span>
                                        /
                                    <span
                                        style={{color: "blue"}}>{conversionNum(homeObj?.hostCount)}
                                    </span>
                                </span>
                                <span>异常主机/主机总数</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefAlarm()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text" style={{color:"orange"}}>{conversionNum(homeObj?.alarmNum)}</span>
                                <span>告警数量</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefAlarm()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text" style={{color:"#3257d3"}}>{conversionNum(homeObj?.alarmNum - homeObj?.alarmTimeNum)}</span>
                                <span>已解决告警数量</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefAlarm()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text" style={{color:"#ff0003"}}>{conversionNum(homeObj?.alarmTimeNum)}</span>
                                <span>未解决告警数量</span>
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
                                distributionList && distributionList.length > 0 ?
                                    <div className="host-alarm-div">
                                        <div className="host-alarm-title">告警数量Top10</div>
                                        <div className="host-alarm-line">
                                            <div className="host-alarm-text-title">主机ip</div>
                                            <div className="host-alarm-text-title">告警总数</div>
                                            <div className="host-alarm-text-title">已解决告警</div>
                                            <div className="host-alarm-text-title">未解决告警</div>
                                        </div>
                                        {
                                            distributionList.map((item, index) => {
                                                return (
                                                    <div className="host-alarm-line" key={index}>
                                                        <div className="host-alarm-text">{item?.ip}</div>
                                                        <div className="host-alarm-text" style={{color:"orange"}}>{item?.count}</div>
                                                        <div className="host-alarm-text" style={{color:"#3257d3"}}>{item?.settlesum}</div>
                                                        <div className="host-alarm-text" style={{color:"#ff0003"}}>{item?.nosettlesum}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="host-alarm-div">
                                        <Empty className="host-alarm-div-empty"/>
                                    </div>
                            }
                        </div>

                    </div>
                    <div className="host-graphics-list">
                        <div className="home-graphics-title">
                            <div className="home-graphics-title-text">
                                主机配置
                            </div>
                        </div>
                        <div className="host-graphics-line">
                            <div className="host-one-overview" onClick={() => hrefTemplate()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text">{conversionNum(homeObj?.templateNum)}</span>
                                <span>模板数量</span>
                            </div>
                            <div className="host-one-overview" onClick={() => hrefHostGroup()}
                                 style={{cursor: "pointer"}}>
                                <span className="host-one-title-text">{conversionNum(homeObj?.hostGroupNum)}</span>
                                <span>主机组数量</span>
                            </div>
                            <div className="host-one-overview">
                                <span className="host-one-title-text">{conversionNum(homeObj?.monitorNum)}</span>
                                <span>监控项数量</span>
                            </div>
                            <div className="host-one-overview">
                                <span className="host-one-title-text">{conversionNum(homeObj?.graphicsNum)}</span>
                                <span>图形数量</span>
                            </div>
                        </div>
                        <div className="host-graphics-line">
                            <div className="host-one-overview">
                                <span className="host-one-title-text">{conversionNum(homeObj?.triggerNum)}</span>
                                <span>触发器数量</span>
                            </div>
                            <div className="host-one-substitute">

                            </div>
                            <div className="host-one-substitute">

                            </div>
                            <div className="host-one-substitute">

                            </div>
                        </div>
                    </div>
                    {/*<div className="home-dynamic-table">
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
                    </div>*/}
                </div>
            </Col>
        </Row>
    )
}

export default observer(HomePage);