import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./HostAlarm.scss"
import {Col, Input, Row, Select, Table, Tag} from "antd";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import SelectItem from "../../../alarm/common/components/SelectItem";
import SelectSimple from "../../../alarm/common/components/Select";
import hostAlarmStore from "../sotre/HostAlarmStore";

const {Option} = Select;

const HostAlarm = (props) => {

    const {
        alarmPage,
        findAlarmPageByHostId,
        updateAlarmPage,
        setSearchCondition,
        total,
        searchCondition,
        setQuickFilterValue,
        quickFilterValue
    } = hostAlarmStore;


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

        setSearchCondition({
            hostId:localStorage.getItem("hostId"),
            status:null
        })
        await findAlarmPageByHostId();
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

        await findAlarmPageByHostId();
    }

    function conversionType(severityLevel) {

        let tagColor;
        let tagName;

        switch (severityLevel) {
            case 1:
                tagColor = "red";
                tagName = "灾难";
                break;
            case 2:
                tagColor = "#e97659";
                tagName = "严重";
                break;
            case 3:
                tagColor = "orange";
                tagName = "一般严重";
                break;
            case 4:
                tagColor = "yellow";
                tagName = "告警";
                break;
            case 5:
                tagColor = "blue";
                tagName = "信息";
                break;
            case 6:
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
            ellipsis: true,
            // width: "20%",
            key: 'hostName',
            render: (hostName, record) => <div>{record?.host?.name}</div>
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
            render:(ip,record) => <div>{record?.host?.ip}</div>
        },
        {
            title: '问题',
            dataIndex: 'triggerName',
            key: 'triggerName',
            render: (triggerName, record) => <div>{record?.trigger?.describe}</div>
        },
        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            key: 'severityLevel',
            render: (severityLevel,record) => <div>{conversionType(record?.trigger?.severityLevel)}</div>
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

    async function checkPage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })
        await findAlarmPageByHostId();
    }

    async function onSecondCityChange(value) {
        setSearchCondition({
            status: value
        })
        await findAlarmPageByHostId();
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

export default withRouter(observer(HostAlarm));