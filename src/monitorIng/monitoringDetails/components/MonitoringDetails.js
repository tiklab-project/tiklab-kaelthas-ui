import React, {useEffect, useState} from 'react';
import "./MonitoringDetails.scss"
import {withRouter} from "react-router-dom";
import {DatePicker, Form, Input, Pagination, Table} from "antd";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";

const MonitoringDetails = (props) => {

    const [dataList, setDataList] = useState([]);

    const {findMonitorForHost, setSearchCondition, searchCondition, total} = monitoringDetailsStore;

    const { RangePicker } = DatePicker;

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");
        setSearchCondition({
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
            render: (dataSubclass) => {
                let config = {
                    1: "CPU详情信息",
                    5: "磁盘使用率",
                    6: "CPU利用率",
                    10: "内存使用百分比"
                }
                return config[dataSubclass];
            }
        },
        {
            title: '数据',
            dataIndex: 'reportData',
            key: 'reportData',
        },
        {
            title: '上报时间',
            dataIndex: 'gatherTime',
            key: 'gatherTime',
        },
    ];

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
        setSearchCondition({
            monitorName: event.target.value
        })
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

    return (
        <div className="details">
            <div className="details-body">
                <div className="details-alarm-table">
                    <div className="details-table-title">主机下监控信息</div>
                    <div className="details-search">
                        <div className="details-div">
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm:ss',
                                }}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={onChange}
                                onOk={onOk}
                            />
                        </div>
                        <div className="details-div">
                            <Input placeholder="根据监控项名称进行查询" onPressEnter={(event) => searchByName(event)}/>
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