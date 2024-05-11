import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Col, Input, Row, Select, Table, Tag} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import monitorLayoutStore from "../../../monitorIng/monitoringDetails/store/MonitorLayoutStore";
import moment from "moment/moment";

const {Option} = Select;

const AlarmPage = (props) => {

    const {
        alarmPage,
        findAlarmPage,
        updateAlarmPage,
        setSearchCondition,
        total,
        searchCondition
    } = alarmPageStore;

    const {setNowTimeInterval,setSearchNull,getDateTime} = monitorLayoutStore;

    useEffect(async () => {
        await findAlarmPage();
    }, []);

    function isConfirm(status) {
        switch (status) {
            case 1:
                return <Tag key={status} color={"green"}>
                    已解决
                </Tag>
            case 2:
                return <Tag key={status} color={"red"}>
                    未解决
                </Tag>
        }
    }

    async function updateAlarm(record) {
        await updateAlarmPage({
            id: record.id,
            alertTime: record.alertTime,
            status: 1
        });

        await findAlarmPage();
    }

    async function jumpToMonitor(record) {
        localStorage.setItem("hostIdForMonitoring", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "monitoring")

        // setNowTimeInterval([moment(record.alertTime).subtract(2, 'minutes').format("YYYY-MM-DD HH:mm:ss"), moment(record.alertTime).subtract(-2, 'minutes').format("YYYY-MM-DD HH:mm:ss")]);

        /*setSearchNull({
            hostId: record.hostId,
            beginTime: getDateTime()[0],
            endTime: getDateTime()[1],
            triggerId:record.triggerId
        })*/

        props.history.push(`/monitoringList/${record.hostId}/monitoringDetails`)
    }

    function conversionType(severityLevel) {

        let tagColor;
        let tagName;

        switch (severityLevel) {
            case "1":
                tagColor = "red";
                tagName = "灾难";
                break;
            case "2":
                tagColor = "#e97659";
                tagName = "严重";
                break;
            case "3":
                tagColor = "orange";
                tagName = "一般严重";
                break;
            case "4":
                tagColor = "yellow";
                tagName = "告警";
                break;
            case "5":
                tagColor = "blue";
                tagName = "信息";
                break;
            case "6":
                tagColor = "grey";
                tagName = "未分类";
                break;
        }
        return <Tag key={severityLevel} color={tagColor}>
            {tagName}
        </Tag>
    }

    function hrefTrigger(record) {
        localStorage.setItem('hostId', record.hostId);
        localStorage.setItem("url", `/hostList/${record.hostId}/trigger`)

        sessionStorage.setItem("menuKey", "configuration")
        props.history.push(`/hostList/${record.hostId}/trigger`);
    }

    const columns = [
        {
            title: '主机名称',
            dataIndex: 'hostName',
            ellipsis: true,
            // width: "20%",
            key: 'hostName',
            render: (hostName, record) => <div onClick={() => jumpToMonitor(record)}
                                               style={{cursor: "pointer"}}>{hostName}</div>
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
            ellipsis: true,
            key: 'triggerName',
            render: (triggerName, record) => <div onClick={() => jumpToMonitor(record)}
                                                  style={{cursor: "pointer"}}>{triggerName}</div>
        },
        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            key: 'severityLevel',
            render: (severityLevel) => <div>{conversionType(severityLevel)}</div>
        },
        {
            title: '告警时间',
            dataIndex: 'alertTime',
            key: 'alertTime',
        },
        {
            title: '解决时间',
            dataIndex: 'resolutionTime',
            key: 'resolutionTime',
        },
        {
            title: '持续时间',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                if (status === 2) {
                    return <div onClick={() => updateAlarm(record)}
                                style={{cursor: "pointer"}}>{isConfirm(status)}</div>
                } else {
                    return <div>{isConfirm(status)}</div>
                }
            }
        },
    ];

    async function checkHostName(e) {
        setSearchCondition({
            hostName: e.target.value
        })
        await findAlarmPage();
    }

    async function checkPage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })
        await findAlarmPage();
    }

    async function onSecondCityChange(value) {
        setSearchCondition({
            status: value
        })
        await findAlarmPage();
    }

    return (
        <Row className="alarm-box">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="alarm-box-body">
                    <div className="alarm-box-title">
                        <div className="alarm-box-title-text">
                            主机告警
                        </div>
                    </div>
                    {/*<div className="alarm-box-line">
                        <div className="alarm-box-div">
                            <span>告警详情</span>
                            <div className="alarm-box-div-details">

                            </div>
                        </div>
                        <div className="alarm-box-div">
                            <span>告警数量图表展示</span>
                            <div className="alarm-box-div-details">

                            </div>
                        </div>
                    </div>*/}
                    <div className="alarm-box-search">
                        <div style={{marginRight: 8}}>
                            <Input
                                className="alarm-box-search-div"
                                placeholder="根据主机名称进行查询"
                                onPressEnter={(e) => checkHostName(e)}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div>
                            <Select
                                placeholder="请选择监控项指标"
                                allowClear
                                onChange={onSecondCityChange}
                                className="alarm-box-search-div"
                            >
                                <Option value={1} key={1}>已解决</Option>
                                <Option value={2} key={2}>未解决</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="alarm-box-table">
                        <Table rowKey={record => record.id}
                               columns={columns}
                               className="custom-table"
                               dataSource={alarmPage}
                               onChange={checkPage}
                               scroll={{
                                   x: 400,
                               }}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: total,
                                   showSizeChanger: true,
                                   pageSize: searchCondition.pageParam.pageSize,
                                   current: searchCondition.pageParam.currentPage,
                               }}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(AlarmPage));