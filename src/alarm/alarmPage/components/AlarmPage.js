import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Button, Col, Dropdown, Input, Menu, Modal, Popconfirm, Row, Select, Table, Tag} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import SelectSimple from "../../common/components/Select";
import SelectItem from "../../common/components/SelectItem";
import IconCommon from "../../../common/IconCommon";

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
        quickFilterValue,
        setLeveType,
        leveType
    } = alarmPageStore;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [alarm, setAlarm] = useState();

    const leveList = {"1": "灾难", "2": "严重", "3": "一般严重", "4": "告警", "5": "信息", "6": "未分类"};

    const leveValueList = [
        {
            key: "all",
            label: "全部"
        },
        {
            key: "1",
            label: "灾难"
        },
        {
            key: "2",
            label: "严重"
        },
        {
            key: "3",
            label: "一般严重"
        },
        {
            key: "4",
            label: "告警"
        },
        {
            key: "5",
            label: "信息"
        },
        {
            key: "6",
            label: "未分类"
        }

    ]

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
            label: "全部",
            value: "all"
        })
        setLeveType({
            key: "all",
            label: "全部",
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

    async function selectLeveType(value) {
        setLeveType(value)
        if (!value) {
            await onLeveTypeChange(null);
        } else {
            let data = value.value;
            let sendData;

            if (data === "all"){
                sendData = null
            }else {
                sendData = data
            }
            await onLeveTypeChange(sendData);
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
        setAlarm(record)
        setIsModalVisible(true)
    }

    async function jumpToMonitor(record) {
        localStorage.setItem("hostId", record.hostId);
        localStorage.setItem("hostName", record.hostName)
        localStorage.setItem("ip", record.ip)
        sessionStorage.setItem("menuKey", "host")
        localStorage.setItem("url", `/hostList/${record?.hostId}/monitoring`)

        props.history.push(`/hostList/${record.hostId}/monitoring`)
    }

    function conversionType(severityLevel) {
        let tagColor;
        let tagName;

        switch (severityLevel) {
            case "1":
                tagColor = "#ff0003";
                tagName = leveList[severityLevel];
                break;
            case "2":
                tagColor = "#e97659";
                tagName = leveList[severityLevel];
                break;
            case "3":
                tagColor = "orange";
                tagName = leveList[severityLevel];
                break;
            case "4":
                tagColor = "#fac858";
                tagName = leveList[severityLevel];
                break;
            case "5":
                tagColor = "yellow";
                tagName = leveList[severityLevel];
                break;
            case "6":
                tagColor = "grey";
                tagName = leveList[severityLevel];
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


    const handleOk = async () => {

        await updateAlarmPage({
            id: alarm?.id,
            alertTime: alarm?.alertTime,
            status: 1
        });

        await findAlarmPage();

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

    async function onLeveTypeChange(value) {
        setSearchCondition({
            severityLevel: value
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
                        <div style={{marginRight: 8}}>
                            <SelectSimple name="quickFilter"
                                          onChange={(value) => selectLeveType(value)}
                                          title={`告警等级`}
                                          ismult={false}
                                          value={leveType}
                                          suffixIcon={true}
                            >
                                {
                                    leveValueList.map(item => {
                                        return <SelectItem
                                            value={item.key}
                                            label={`${item.label}`}
                                            key={item.key}
                                        />
                                    })
                                }
                            </SelectSimple>
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
                    <>
                        <Modal
                            title="确认操作"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel} style={{float: 'left'}}>
                                    取消
                                </Button>,
                                <Button key="submit" type="primary" onClick={handleOk}>
                                    确定
                                </Button>,
                            ]}
                            width={200}
                        >
                            <p>你确定要更改状态吗？</p>
                        </Modal>
                    </>
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