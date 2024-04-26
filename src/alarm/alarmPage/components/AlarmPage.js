import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Button, Col, Input, Row, Table, Tag} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

const AlarmPage = (props) => {

    const {
        alarmPage,
        findAlarmPage,
        updateAlarmPage,
        setSearchCondition,
        total,
        setNullCondition,
        searchCondition
    } = alarmPageStore;

    useEffect(async () => {
        setNullCondition();
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
                    问题
                </Tag>
        }
    }

    async function updateAlarm(record) {
        await updateAlarmPage({
            id: record.id,
            state: 1
        });
    }

    function jumpToMonitor(record) {
        localStorage.setItem("hostIdForMonitoring", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "monitoring")
        props.history.push(`/monitoringList/${record.hostId}/monitoringDetails`)
    }

    function checkProblemDetails(problemDetails, record) {

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

    const columns = [
        {
            title: '主机名称',
            dataIndex: 'hostName',
            // ellipsis: true,
            // width: "20%",
            key: 'hostName',
            render: (hostName, record) => <div onClick={() => jumpToMonitor(record)}
                                               style={{cursor: "pointer"}}>{hostName}</div>
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
            key: 'triggerName',
        },
        {
            title: '告警类型',
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
            title: '问题详情',
            dataIndex: 'problemDetails',
            key: 'problemDetails',
            render: (problemDetails, record) => <div
                onClick={() => checkProblemDetails(problemDetails, record)}>详情</div>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => <div onClick={() => updateAlarm(record)}
                                             style={{cursor: "pointer"}}>{isConfirm(status)}</div>
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
                        <div>
                            <Input
                                className="alarm-box-search-div"
                                placeholder="根据主机名称进行查询"
                                onPressEnter={(e) => checkHostName(e)}
                                prefix={<SearchOutlined/>}
                            />
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