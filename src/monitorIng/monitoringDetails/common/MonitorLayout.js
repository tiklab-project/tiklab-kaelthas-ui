import {observer, Provider} from "mobx-react";
import React, {useEffect, useRef, useState} from "react";
import {Breadcrumb, DatePicker, Empty, Input, Modal, Pagination, Select, Table, Tabs} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";
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
import {LineChart, PieChart, ScatterChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import monitorLayoutStore from "../store/MonitorLayoutStore";
import MonitoringItem from "./MonitoringItem";
import moment from "moment";

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
    PieChart
]);
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const now = moment().locale('zh-cn').format('YYYY-MM-DD');

const MonitorLayout = (props) => {

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    const [descTime, setDescTime] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    const [monitorName, setMonitorName] = useState([]);

    const {
        findDescGatherTime,
        setSearchCondition,
        findAllMonitor,
        findInformationByGraphics,
        condition,
        setSearchNull,
        findMonitorForHost,
        findMonitorByCategories,
        hostState,
        setHostState,
        getDateTime,
        findInformationPage,
        total,
        monitorIds,
        monitorDataSubclassNames
    } = monitorLayoutStore;

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [dataList, setDataList] = useState([]);


    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");
        const testStr = getDateTime().substring(1, getDateTime().length - 1)
        setSearchNull({
            hostId: hostId,
            beginTime: testStr,
            endTime: testStr
        })
        await findMonitorForHost()

        await findInformationByGraphics();

        const times = await findDescGatherTime();
        setDescTime([...times])

    }, []);

    async function checkTabGraphics(activeKey) {
        setHostState(activeKey)

        const monitors = await findAllMonitor()
        setMonitorList([...monitors])

        if (activeKey === "2") {

            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回

            await findInformationByGraphics()

            const descTime = await findDescGatherTime();
            setDescTime([...descTime])

        }

    }

    const onChange = async (value, dateString) => {

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1],
        })

        await findInformationByGraphics()

        const descTime = await findDescGatherTime();
        setDescTime([...descTime])

        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1]
        })
        await findMonitorForHost();

    };

    async function onCheckMonitor(value, options) {


        setSearchCondition({
            hostId: localStorage.getItem("hostIdForMonitoring"),
            monitorIdList: value
        })

        await findMonitorForHost();

        await findInformationByGraphics();

        const times = await findDescGatherTime();
        setDescTime([...times])

    }

    /*const onChange = async (value, dateString) => {
        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1]
        })
        const newVar = await findMonitorForHost();

        setDataList([...newVar])
    };*/
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    async function searchByDataCategories(value) {

        setSearchCondition({
            dataCate: value,
            id:localStorage.getItem("hostIdForMonitoring")
        })
        await findMonitorForHost();


        //根据监控大类查询监控小类
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])

        resData.map(item =>{
            monitorDataSubclassNames.push(item.name)
        })
    }

    const showTabs = [
        {
            title: '列表展示',
            key: '1',
            icon: "showList"
        },
        {
            title: '图表展示',
            key: '2',
            icon: "graphicsList"
        }
    ]

    return (
        <div>
            <Provider>
                <div>
                    <div className="details">
                        <div className="details-body">
                            <div className="details-breadcrumb-table">
                                <Breadcrumb>
                                    <Breadcrumb.Item onClick={goBackHome}>
                                        <span style={{cursor: "pointer"}}>Home</span>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                                </Breadcrumb>


                                <div className="details-table-title">
                                    <div className="details-search">
                                        <div className="details-div">
                                            <Select
                                                mode="multiple"
                                                maxTagCount='responsive'
                                                placeholder="请选择监控大类"
                                                onChange={(value)=>searchByDataCategories(value)}
                                                allowClear={true}
                                                defaultValue="全部监控大类"
                                                style={{
                                                    width: 150,
                                                }}
                                                options={dataCategories && dataCategories.map((province) => ({
                                                    label: province,
                                                    value: province,
                                                }))}
                                            >
                                            </Select>
                                        </div>
                                        <div className="details-div">
                                            <Select
                                                mode="multiple"
                                                maxTagCount='responsive'
                                                placeholder="请选择您的监控小类"
                                                onChange={(value, options) => onCheckMonitor(value, options)}
                                                allowClear
                                                style={{
                                                    width: 300,
                                                }}
                                                defaultValue="全部监控小类"
                                                options={monitorDataSubclass && monitorDataSubclass.map(item => ({
                                                    label: item.name,
                                                    key: item.id,
                                                    value: item.id,
                                                }))}
                                            >
                                            </Select>
                                        </div>
                                        <div className="details-div">
                                            <RangePicker
                                                format={dateFormat}
                                                onChange={onChange}
                                                onOk={onOk}
                                                defaultValue={[moment(getDateTime(), dateFormat), moment(getDateTime(), dateFormat)]}
                                            />
                                        </div>
                                    </div>

                                    <div className="details-tables">
                                        {
                                            showTabs.map(item => {
                                                return <div
                                                    className={`details-tabs-item ${hostState === item.key ? "details-tabs" : ""}`}
                                                    key={item.key}
                                                    onClick={() => checkTabGraphics(item.key)}
                                                >
                                                    {item.title}
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="layout-body-list">
                                    {
                                        hostState === '1' ?
                                            <MonitoringDetails findInformationPage={findInformationPage} total={total}/>
                                            :
                                            <div>{
                                                condition && condition.length > 0 ?
                                                    <div className="details-tabs-wrap">
                                                        {
                                                            condition.map((item,index) => {
                                                                return (
                                                                    <MonitoringItem reportType={item[0].reportType}
                                                                                    condition={item}
                                                                                    descTime={descTime}
                                                                                    index={index}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <Empty>
                                                        <span>没有数据</span>
                                                    </Empty>
                                            }
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div>
                        {renderRoutes(route.routes)}
                    </div>*/
                    }
                </div>
            </Provider>
        </div>
    );
};

export default observer(MonitorLayout);