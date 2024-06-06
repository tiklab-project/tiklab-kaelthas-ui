import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Col, Input, Row, Select, Table, Tag} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import SelectSimple from "../../common/components/Select";
import SelectItem from "../../common/components/SelectItem";

const {Option} = Select;

const AlarmPage = (props) => {

    const {
        alarmPage,
        findAlarmPage,
        updateAlarmPage,
        setSearchCondition,
        total,
        searchCondition,
        setQuickFilterValue,
        quickFilterValue
    } = alarmPageStore;


    const quickFilterList = [
        {
            value: "all",
            key: "all",
            label: "全部"
        },
        {
            value: "resolved",
            key: "resolved",
            label: "已解决"
        },
        {
            value: "unresolved",
            key: "unresolved",
            label: "未解决"
        },
    ]

    useEffect(async () => {
        setQuickFilterValue({
            label:"全部",
            value:"all"
        })
        await findAlarmPage();
    }, []);

    const selectMenu = async (value) => {
        setQuickFilterValue(value)
        if (!value) {
            await onSecondCityChange(null);
        } else {
            let data = value.value;
            let sendData = null

            switch (data) {
                case "all":
                    sendData = null
                    break;
                case "resolved":
                    sendData = 1
                    break;
                case "unresolved":
                    sendData = 2
                    break;
                default:
                    break;
            }
            await onSecondCityChange(sendData);
        }
    }

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
        localStorage.setItem("hostId", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "configuration")
        localStorage.setItem("url", `/hostList/${record?.hostId}/monitoring`)

        props.history.push(`/hostList/${record.hostId}/monitoring`)
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
            key: 'hostName',
            render: (hostName, record) => <div onClick={() => jumpToMonitor(record)}
                                               style={{cursor: "pointer"}}>{hostName}</div>
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
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
                            告警
                        </div>
                    </div>
                    {/*<div className="hostAlarm-box-line.svg">
                        <div className="hostAlarm-box-div">
                            <span>告警详情</span>
                            <div className="hostAlarm-box-div-details">

                            </div>
                        </div>
                        <div className="hostAlarm-box-div">
                            <span>告警数量图表展示</span>
                            <div className="hostAlarm-box-div-details">

                            </div>
                        </div>
                    </div>*/}
                    <div className="alarm-box-search">
                        <div style={{marginRight: 8}}>
                            <Input
                                className="alarm-box-search-div"
                                placeholder="主机名称"
                                onPressEnter={(e) => checkHostName(e)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                        <SelectSimple name="quickFilter"
                                      onChange={(value) => selectMenu(value)}
                                      title={`状态`}
                                      ismult={false}
                                      value={quickFilterValue}
                                      suffixIcon={true}
                        >
                            {
                                quickFilterList.map(item => {
                                    return <SelectItem
                                        value={item.value}
                                        label={`${item.label}`}
                                        key={item.value}

                                    />
                                })
                            }
                        </SelectSimple>
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