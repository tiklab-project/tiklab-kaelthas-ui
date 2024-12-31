import React, {useEffect, useRef, useState} from 'react';
import "./MonitorGraphics.scss"
import {withRouter} from "react-router-dom";
import {DatePicker, Input, Modal, Pagination, Select, Table, Tooltip} from "antd";
import "../../../common/styles/_tabStyle.scss"
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
import monitorLayoutStore from "../store/MonitorGraphicsStore";
import {observer} from "mobx-react";

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
    const {match:{params}} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);


    const {
        findHistory,
        setSearchCondition,
        searchCondition,
        setSearchNull,
        findInformationByLine,
        getDateTime,
        historyList,
        total
    } = monitorLayoutStore;

    const dom = useRef(null);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(async () => {
        await findHistory();
    }, []);


    async function showGraphics(record) {

        setIsModalOpen(true);

        // const monitors = await findAllMonitor()

        //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
        setSearchNull({
            hostId: params.id,
            monitorId: record.monitorId,
            beginTime: getDateTime()[0],
            endTime: getDateTime()[1]
            // source: monitors[0].monitorSource
        })

        const resData = await findInformationByLine();
        setSearchNull({
            hostId: params.id,
            monitorId: null,
            source: null
        })

        if (dom) {

            const chartDom = dom.current

            const myChart = echarts.init(chartDom);

            const option = {
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

        await findHistory();
    }

    return (
        <>
            <div className="details-alarm-table-list">
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={historyList}
                    className="custom-table"
                    pagination={false}
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


export default withRouter(observer(MonitoringDetails));
