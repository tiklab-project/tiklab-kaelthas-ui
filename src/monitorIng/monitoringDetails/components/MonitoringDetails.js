import React, {useEffect, useState} from 'react';
import "./MonitoringDetails.scss"
import {withRouter} from "react-router-dom";
import {Breadcrumb, DatePicker, Form, Input, Pagination, Select, Table} from "antd";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";
import left from "../../../assets/svg/left.svg"

const MonitoringDetails = (props) => {

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [dataList, setDataList] = useState([]);

    const {
        findMonitorForHost,
        setSearchCondition,
        searchCondition,
        total,
        findMonitorByCategories,
        setSearchNull
    } = monitoringDetailsStore;

    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);

    const {RangePicker} = DatePicker;

    const {Option} = Select;

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");
        /*setSearchCondition({
            hostId: hostId,
            dataSubclass:null,
            dataCategories:null
        })*/
        setSearchNull({
            hostId: hostId,
        })

        const resData = await findMonitorForHost()

        setDataList([...resData])

    }, []);


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
            render: (text, record) => (
                <span>
                        {
                            reportAddition(record.reportType, record.reportData)
                        }
                </span>
            )
        },
        {
            title: '上报时间',
            dataIndex: 'gatherTime',
            key: 'gatherTime',
        },
    ];

    function reportAddition(type, reportData) {
        switch (type) {
            case 1:
                return reportData + "%"
            case 2:
                return reportData
            case 3:
                return reportData + "B"
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
        // console.log('Selected Time: ', value);
        // console.log('Formatted dateString Time: ', dateString);

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

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    return (
        <div className="details">
            <div className="details-body">
                {/*<div className="details-content">
                    <div className="details-content-title">

                    </div>
                </div>*/}
                <div className="details-alarm-table">
                    {/*<div>
                        <svg className="icon-left" aria-hidden="true">
                            <use xlinkHref={`#icon-${left}`}></use>
                        </svg>
                    </div>*/}
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={goBackHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                        <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="details-table-title">
                        {/*主机下监控信息*/}
                    </div>
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
                                {/*{
                                    monitorDataSubclass && monitorDataSubclass.map(item => (
                                        <Option value={item.dataSubclass} key={item.id}>{item.dataSubclass}</Option>
                                    ))
                                }*/}
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
                </div>
            </div>
        </div>
    );
};


export default withRouter(MonitoringDetails);