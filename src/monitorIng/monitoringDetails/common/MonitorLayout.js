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

    const [monitorName,setMonitorName] = useState([]);

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
    } = monitorLayoutStore;

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [dataList, setDataList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");
        const testStr = getDateTime().substring(1, getDateTime().length - 1)
        setSearchNull({
            hostId: hostId,
            beginTime:testStr,
            endTime:testStr
        })
        const resultData = await findMonitorForHost()

    }, []);

    async function checkTabGraphics(activeKey) {
        setHostState(activeKey)

        const monitors = await findAllMonitor()
        setMonitorList([...monitors])

        if (activeKey === "2") {

            const testStr = getDateTime().substring(1, getDateTime().length - 1)

            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            setSearchNull({
                hostId: localStorage.getItem("hostIdForMonitoring"),
                reportType: 1,
                data: [],
                beginTime:testStr,
                endTime:testStr
            })

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
        const newVar = await findMonitorForHost();

        setDataList([...newVar])

    };

    async function onCheckMonitor(value, options) {

        const data = [];
        value.map(item => {
            data.push(item[0] + ":" + item[1])
        })

        setSearchCondition({
            hostId: localStorage.getItem("hostIdForMonitoring"),
            data: data
        })

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

    async function searchByDataCategories(event) {

        setSearchCondition({
            dataCategories: event
        })
        const newVar = await findMonitorForHost();

        setDataList([...newVar])

        //根据监控大类查询监控小类
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])
    }

    async function searchByDataSubclass(event) {

        const newVar = await findMonitorForHost();

        setDataList([...newVar])
    }

    function onchangeByDataCategories(e) {
        setSearchCondition({
            dataCategories: e.target.value
        })
    }

    async function onchangeByDataSubclass(e) {

        setSearchCondition({
            dataSubclass: e
        })
        const newVar = await findMonitorForHost();
    }

    async function onchangeByName(e) {
        setSearchCondition({
            monitorName: e.target.value
        })

        const newVar = await findMonitorForHost();

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

                                    <div className="details-search">
                                        {
                                            hostState === '1' ?
                                                <div className="details-div">
                                                    <Select
                                                        placeholder="请选择您的监控类型"
                                                        onChange={searchByDataCategories}
                                                        allowClear={true}
                                                        style={{
                                                            width: 120,
                                                        }}
                                                        options={dataCategories && dataCategories.map((province) => ({
                                                            label: province,
                                                            value: province,
                                                        }))}
                                                    >
                                                    </Select>
                                                </div>
                                                :
                                                <div>

                                                </div>
                                        }
                                        {
                                            hostState === '1' ?
                                                <div className="details-div">
                                                    <Select
                                                        placeholder="请选择您的监控类型"
                                                        onChange={onchangeByDataSubclass}
                                                        allowClear={true}
                                                        style={{
                                                            width: 300,
                                                        }}
                                                        options={
                                                            monitorDataSubclass && monitorDataSubclass.map(item => ({
                                                                label: item.dataSubclass,
                                                                value: item.dataSubclass
                                                            }))
                                                        }
                                                    >
                                                    </Select>
                                                </div>
                                                :
                                                <div>

                                                </div>
                                        }


                                        <div className="details-div">
                                            <RangePicker
                                                format={dateFormat}
                                                onChange={onChange}
                                                onOk={onOk}
                                                defaultValue={[moment(getDateTime(), dateFormat), moment(getDateTime(), dateFormat)]}
                                            />
                                        </div>
                                        {
                                            hostState === '1' ?
                                                <div className="details-div">
                                                    <Input placeholder="请输入监控项名称"
                                                           allowClear={true}
                                                           onChange={onchangeByName}
                                                    />
                                                </div>
                                                :
                                                <div className="details-div">
                                                    <Select
                                                        mode="multiple"
                                                        style={{
                                                            width: '200px',
                                                        }}
                                                        placeholder="请选择您的监控项"
                                                        allowClear
                                                        defaultValue={monitorIds}
                                                        onChange={(value, options) => onCheckMonitor(value, options)}
                                                        options={monitorList && monitorList.map(item => ({
                                                            label: item.name,
                                                            key: item.id,
                                                            value: [item.id, item.monitorSource],
                                                        }))}
                                                    >
                                                    </Select>
                                                </div>
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
                                                    <div className="details-tabs-wrap" key="details-tabs-wrap">
                                                        {
                                                            condition.map((item) => {
                                                                return (
                                                                    <MonitoringItem reportType={item[0].reportType}
                                                                                    condition={item}
                                                                                    descTime={descTime}/>
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