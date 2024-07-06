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
    LegendComponent
} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
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
    } = homeStore;

    const {setNullCondition} = alarmPageStore;

    const dom = useRef(null);

    const leaveList = ['灾难', '严重', '一般严重', '告警', '信息', '未分类']

    const [homeObj, setHomeObj] = useState();

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
        findHostUsage().then(res => {
            if (res.code === 0) {
                console.log(res)
                setHomeObj(res.data)
            }
        })
    }, []);

    useEffect(async () => {
        const resData = await findAlarmTypeNum();
        const typeData = [];

        resData?.map((item, index) => {
            let colorTag;
            let name;
            switch (item?.severityLevel) {
                case "1":
                    colorTag = '#e97659'
                    name = '灾难'
                    break
                case "2":
                    colorTag = 'orange'
                    name = '严重'
                    break
                case "3":
                    colorTag = 'yellow'
                    name = '一般严重'
                    break
                case "4":
                    colorTag = 'blue'
                    name = '告警'
                    break
                case "5":
                    colorTag = 'grey'
                    name = '信息'
                    break
                case "6":
                    colorTag = 'grey'
                    name = '未分类'
                    break
            }
            if (item.length !== 0) {
                typeData.push(
                    {
                        name: name,
                        value: item?.alarmNum
                    }
                )
            }
        })

        series.push({
            name: '告警类型及对应数量',
            type: 'pie',
            radius: '50%',
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: typeData,

        })
        showGraphics();
    }, [dom?.current]);


    function showGraphics() {
        if (dom?.current) {
            const chartDom = dom.current

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


    function hrefHost() {
        sessionStorage.setItem("menuKey", "configuration")
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
                    <div className="host-graphics-list">
                        <div className="home-graphics-title">主机概览</div>
                        <div className="host-graphics-line">
                            <div className="host-one-overview">
                                <span>{homeObj?.monitorNum}</span>
                                <span className="host-one-title-text">监控项数量</span>
                            </div>
                            <div className="host-one-overview">
                                <span>{homeObj?.graphicsNum}</span>
                                <span className="host-one-title-text">图形数量</span>
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
                                <span>{homeObj?.triggerNum}</span>
                                <span className="host-one-title-text">触发器数量</span>
                            </div>
                        </div>
                        <div className="host-graphics-line">
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
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={divideAndRound(homeObj?.hostAbnormal * 100, homeObj?.hostCount)}/>
                                </div>
                            </div>
                            <div className="host-graphics-overview" onClick={() => hrefAlarm()}>
                                <div className="host-graphics-title">
                                    <span>未解决告警数量/告警数量</span>
                                    <span>
                                        <span
                                            style={{color: "red"}}>{homeObj?.alarmTimeNum}
                                        </span>
                                            /
                                        <span
                                            style={{color: "blue"}}>{homeObj?.alarmNum}
                                        </span>
                                    </span>
                                </div>
                                <div className="host-graphics-progress">
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={divideAndRound(homeObj?.alarmTimeNum, homeObj?.alarmNum / 100)}/>
                                </div>
                            </div>
                        </div>
                        <div className="host-graphics">
                            {
                                leave && leave?.length > 0 ?
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