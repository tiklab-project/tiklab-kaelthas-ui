import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./AlarmPage.scss"
import {Button, Col, Dropdown, Input, Menu, Modal, Popconfirm, Row, Select, Table, Tag, Tooltip} from "antd";
import alarmPageStore from "../store/AlarmPageStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined, SnippetsOutlined} from "@ant-design/icons";
import SelectSimple from "../../common/components/Select";
import SelectItem from "../../common/components/SelectItem";
import SearchInput from "../../../common/input/SearchInput";
import AlarmDetailsDrawer from "./AlarmDetailsDrawer";
import {converMachine, conversionType, isConfirm} from "../../common/components/Common";
import MonitorGraphicsStore from "../../../host/monitoring/store/MonitorGraphicsStore";
import DbMonitorGraphicsStore from "../../../databases/dbMonitoring/store/DbMonitorGraphicsStore";
import KuMonitorGraphicsStore from "../../../k8s/kuMonitoring/store/KuMonitorGraphicsStore";
import InMonitorGraphicsStore from "../../../Internet/monitoring/store/InMonitorGraphicsStore";

const {Option} = Select;

const AlarmPage = (props) => {

    const {alarmPage, findAlarmPage, updateAlarmPage, setSearchCondition, total, searchCondition} = alarmPageStore;

    const {setHostAlarmDate}=MonitorGraphicsStore

    const {setDbAlarmDate}=DbMonitorGraphicsStore

    const {setK8sAlarmDate}=KuMonitorGraphicsStore

    const {setInternetAlarmDate}=InMonitorGraphicsStore


    const leveList = {"1": "灾难", "2": "严重", "3": "一般严重", "4": "告警", "5": "信息", "6": "未分类"};
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [alarm, setAlarm] = useState();

    const [quickFilterValue, setQuickFilterValue] = useState();

    const [leveType, setLeveType] = useState();

    //告警详情抽屉状态
    const [detailsVisible,setDetailsVisible]=useState(false)
    //告警详情
    const [alarmDetails,setAlarmDetails]=useState()


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
            label: "状态",
            value: "all"
        })
        setLeveType({
            key: "all",
            label: "告警等级",
            value: "all"
        })
        await findAlarmPage();
    }, []);

    const columns = [
        {
            title: '问题',
            dataIndex: 'sendMessage',
            key: 'sendMessage',
            width: "20%",
            ellipsis: {
                showTitle: false,
            },
            render: (sendMessage, record) =>{
                return(
                    <div className={'alarm-box-nav-name'}>
                        <Tooltip placement="topLeft" title={sendMessage}
                                 onClick={() => jumpToMonitor(record)}>
                            {sendMessage}
                        </Tooltip>
                    </div>

                )
            }
        },

        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            key: 'severityLevel',
            width: "7%",
            ellipsis: true,
            render: (severityLevel) => <div>{conversionType(severityLevel)}</div>
        },
        {
            title: '设备IP',
            dataIndex: 'ip',
            key: 'ip',
            width: "8%",
            ellipsis: true,
        },
        {
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
            width: "10%",
            ellipsis: {
                showTitle: false,
            },
            render: (hostName, record) => <Tooltip title={hostName}>{hostName}</Tooltip>
        },


        {
            title: '告警时间',
            dataIndex: 'alertTime',
            key: 'alertTime',
            width: "10%",
            ellipsis: true,
        },
        /* {
             title: '解决时间',
             dataIndex: 'resolutionTime',
             key: 'resolutionTime',
             width: "10%",
             ellipsis: true,
         },*/
        /*  {
              title: '持续时间',
              dataIndex: 'duration',
              key: 'duration',
              width: "10%",
              ellipsis: true,
          },*/
        {
            title: '设备类型',
            dataIndex: 'machineType',
            key: 'machineType',
            width: "5%",
            ellipsis: true,
            render: (machineType) => <div>
                {converMachine(machineType)}
            </div>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: "5%",
            ellipsis: true,
            render: (status, record) => {
                if (status === 2) {
                    return <div onClick={() => updateAlarm(record)}
                                style={{cursor: "pointer"}}>{isConfirm(status)}</div>
                } else {
                    return <div>{isConfirm(status)}</div>
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: "5%",
            ellipsis: true,
            render:(text,record)=>{
                return(
                    <div className='alarm-box-nav-action' onClick={()=>goMonitor(record)}>
                        <Tooltip placement="topLeft" title={"查看监控信息"}>
                            <SnippetsOutlined />
                        </Tooltip>

                    </div>
                )}
        }
    ];


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

            if (data === "all") {
                sendData = null
            } else {
                sendData = data
            }
            await onLeveTypeChange(sendData);
        }
    }



    async function updateAlarm(record) {
        setAlarm(record)
        setIsModalVisible(true)
    }

    async function jumpToMonitor(record) {
        setDetailsVisible(true)
        setAlarmDetails(record)
       // props.history.push(`/host/${record.hostId}/monitoring`)
    }



    const goMonitor = (record) => {
        switch (record.machineType) {
            case 1:
                setHostAlarmDate(record.alertTime)
                props.history.push(`/host/${record.hostId}/monitoring`)
                break;
            case 2:
                setDbAlarmDate(record.alertTime)
                props.history.push(`/db/${record.hostId}/monitoring`)
                break;
            case 3:
                setK8sAlarmDate(record.alertTime)
                props.history.push(`/kubernetes/${record.hostId}/monitoring`)
                break;
            case 4:
                setInternetAlarmDate(record.alertTime)
                props.history.push(`/internet/${record.hostId}/monitoring`)
                break;
        }
    }

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
            name: e.target.value
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

    async function selectByIp(event) {
        setSearchCondition({
            ip: event.target.value
        })
        await findAlarmPage();
    }

    return (
        <div className="alarm-box-page">

            <Row className="alarm-box">
                <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                    <div className="alarm-box-body">
                        <div className="alarm-box-title">
                            <div className="alarm-box-title-text">
                                告警
                            </div>
                        </div>
                        <div className="alarm-box-search">
                            <div>
                                <SearchInput {...props}
                                             placeholder={"设备名称"}
                                             onChange={(e) => checkHostName(e)}
                                          /*   onPressEnter={onSearch}*/
                                />
                               {/* <Input
                                    className="alarm-box-search-div"
                                    placeholder="设备名称"
                                    onChange={(e) => checkHostName(e)}
                                    allowClear={true}
                                    prefix={<SearchOutlined/>}
                                />*/}
                            </div>
                            <div>
                                <SearchInput {...props}
                                             placeholder={"设备ip"}
                                             onChange={(event) => selectByIp(event)}
                                    /*   onPressEnter={onSearch}*/
                                />
                            </div>
                            <div>
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

            <AlarmDetailsDrawer {...props}
                visible={detailsVisible}
                setVisible={setDetailsVisible}
                details={alarmDetails}
            />
        </div>
    );
};

export default withRouter(observer(AlarmPage));
