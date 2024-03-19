import React, {useEffect, useRef, useState} from 'react';
import "./MonitoringDetails.scss"
import {withRouter} from "react-router-dom";
import {DatePicker, Input, Modal, Pagination, Select, Table, Tooltip} from "antd";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";
import * as echarts from 'echarts/core';
import {
    TimelineComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    ToolboxComponent
} from 'echarts/components';
import {ScatterChart, LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

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
    ToolboxComponent
]);

const MonitoringDetails = (props) => {

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [dataList, setDataList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const {
        findMonitorForHost,
        setSearchCondition,
        searchCondition,
        total,
        findMonitorByCategories,
        setSearchNull,
        findInformationByLine,
        findAllMonitor
    } = monitoringDetailsStore;

    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);

    const {RangePicker} = DatePicker;
    const dom = useRef(null);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");

        setSearchNull({
            hostId: hostId,
        })

        const resultData = await findMonitorForHost()

        setDataList([...resultData])


    }, []);


    async function showGraphics(record) {
        console.log(record)

        setIsModalOpen(true);

        const monitors = await findAllMonitor()

        //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
        setSearchNull({
            hostId: localStorage.getItem("hostIdForMonitoring"),
            monitorId: record.monitorId,
            source: monitors[0].monitorSource
        })

        const resData = await findInformationByLine();

        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
                /*title: {
                    text: "主机名称:" + localStorage.getItem("hostName")
                },*/
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: resData.name
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
                    data: resData.dataTimes
                },
                yAxis: {
                    type: 'value'
                },
                series: {
                    name: resData.name,
                    type: 'line',
                    stack: 'Total',
                    data: resData.data
                }
            };

            myChart.clear()

            option && myChart.setOption(option);
        }

    }

    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'monitorName',
            key: 'monitorName',
        },
        {
            title: '监控大类',
            dataIndex: 'dataCategories',
            key: 'dataCategories',
        },
        {
            title: '监控小类',
            dataIndex: 'dataSubclass',
            key: 'dataSubclass',

        },
        {
            title: '数据',
            dataIndex: 'reportData',
            key: 'reportData',
            ellipsis: true,
            render: (name, record) => <Tooltip title={name}>
                <div>{reportAddition(record.reportType, record.reportData)}</div>
            </Tooltip>
        },
        {
            title: '上报时间',
            dataIndex: 'gatherTime',
            key: 'gatherTime',
        },
        {
            title: '图形',
            dataIndex: 'graphics',
            key: 'graphics',
            render: (text, record) => (
                <a onClick={() => showGraphics(record)}>{
                    record.reportType !== 2 ? "图形" : ""
                }</a>
            )
        },
    ];

    function reportAddition(type, reportData) {
        switch (type) {
            case 1:
                return reportData + "%"
            case 2:
                return reportData
            case 3:
                return reportData + "G"
            case 4:
                return reportData
            default:
                return reportData
        }
    }

    async function checkPage(page, pageSize) {
        setSearchCondition({
            pageParam: {
                pageSize: pageSize,
                currentPage: page,
            }
        })

        const newVar = await findMonitorForHost();

        setDataList([...newVar])
    }

    async function searchByName(event) {

        const newVar = await findMonitorForHost();

        setDataList([...newVar])
    }

    const onChange = async (value, dateString) => {
        setSearchCondition({
            beginTime: dateString[0],
            endTime: dateString[1]
        })
        const newVar = await findMonitorForHost();

        setDataList([...newVar])
    };
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

        setDataList([...newVar])

    }

    function onchangeByName(e) {
        setSearchCondition({
            monitorName: e.target.value
        })
    }

    return (
        <>
            <div className="details-search">
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
                <div className="details-div">
                    <RangePicker
                        /*showTime={{
                            format: 'HH:mm:ss',
                        }}*/
                        format="YYYY-MM-DD"
                        onChange={onChange}
                        onOk={onOk}
                    />
                </div>
                <div className="details-div">
                    <Input placeholder="请输入监控项名称"
                           allowClear={true}
                           onChange={onchangeByName}
                           onPressEnter={(event) => searchByName(event)}/>
                </div>
            </div>
            <div className="details-alarm-table-list">
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={dataList}
                    pagination={false}
                    scroll={{
                        x: 300,
                        y: 'max-content'
                    }}

                />
                <div className="details-pagination">
                    <Pagination
                        current={searchCondition.pageParam.currentPage}
                        pageSize={searchCondition.pageParam.pageSize}
                        showSizeChanger={true}
                        total={total}
                        onChange={(page, pageSize) => checkPage(page, pageSize)}
                    />
                </div>
            </div>
            <Modal
                title="查看图形" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}
                cancelText="取消" okText="确定" width={"900px"}
            >
                <div id="scatterOne" ref={dom} className='chart' style={{width: 800, height: 600}}>

                </div>
            </Modal>
        </>

    );
};


export default withRouter(MonitoringDetails);