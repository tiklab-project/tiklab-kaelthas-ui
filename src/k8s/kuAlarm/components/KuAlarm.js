import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import "./KuAlarm.scss"
import {Col, Input, Modal, Row, Select, Table, Tag} from "antd";
import {withRouter} from "react-router-dom";
import SelectItem from "../../../alarm/common/components/SelectItem";
import SelectSimple from "../../../alarm/common/components/Select";
import kuAlarmStore from "../sotre/KuAlarmStore";

const {Option} = Select;

const KuAlarm = (props) => {

    const {
        alarmPage,
        findAlarmPageByHostId,
        updateAlarmPage,
        setSearchCondition,
        total,
        searchCondition,
        setQuickFilterValue,
        quickFilterValue,
        setLeveType,
        leveType
    } = kuAlarmStore;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [alarm,setAlarm] = useState();

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
    ];

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

    ];

    useEffect(async () => {
        setQuickFilterValue({
            label:"状态",
            value:"all"
        })
        setLeveType({
            key: "all",
            label: "告警等级",
            value: "all"
        })

        setSearchCondition({
            kuId:localStorage.getItem("kuId"),
            status:null,
            machineType: 3,
            severityLevel: null
        })
        await findAlarmPageByHostId();
    }, []);

    async function onLeveTypeChange(value) {
        setSearchCondition({
            severityLevel: value
        })
        await findAlarmPageByHostId();
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
        setAlarm(record)
        setIsModalVisible(true)
    }

    function conversionType(severityLevel) {

        leveValueList.map(item =>{
            if (item.key === severityLevel){
                return item.label;
            }
        })

        let tagColor;
        let tagName;

        switch (severityLevel) {
            case 1:
                tagColor = "#ff0003";
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
                tagColor = "#fac858";
                tagName = "告警";
                break;
            case 5:
                tagColor = "yellow";
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
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            ellipsis: true,
            key: 'ip',
        },
        {
            title: '问题',
            dataIndex: 'sendMessage',
            key: 'sendMessage',
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

        await findAlarmPageByHostId()

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
        <Row className="ku-alarm-box">
            <Col span={24}>
                <div className="ku-alarm-box-body">
                    <div className="ku-alarm-box-search">
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
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="确定"
                            cancelText="取消"
                            width={200}
                        >
                            <p>你确定要更改状态吗？</p>
                        </Modal>
                    </>
                    <div className="ku-alarm-box-table">
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

export default withRouter(observer(KuAlarm));