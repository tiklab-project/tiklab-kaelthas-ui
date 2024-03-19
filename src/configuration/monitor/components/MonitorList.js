import {Alert, Button, Drawer, Form, Space, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./Monitor.scss";
import UpdateMonitor from "./UpdateMonitor";
import monitorStore from "../store/MonitorStore";

const MonitorList = (props) => {

    const {deleteMonitorById, findMonitorCondition,total,setSearchCondition,data} = monitorStore;

    const {listData, setListData} = props;

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let hostId = localStorage.getItem(`hostId`);
        setSearchCondition({
            hostId: hostId,
            name: null,
            monitorSource:null
        });

        findMonitorCondition().then(res =>{
            setListData([...res])
        })
    }, []);

    const removeToList = async (record) => {

        if (record.monitorSource === 1) {

            await deleteMonitorById(record.id);

            const resData = await findMonitorCondition();

            console.log(resData)

            setListData([...resData])
        }

    }


    const drawerList = (record) => {
        setIsModalOpen(true);
        form.setFieldsValue({
            name: record.name,
            monitorType: record.monitorItem.type,
            expression: record.monitorItem.id,
            monitorItemId: record.monitorItem.id,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            monitorSource: record.monitorSource,
            monitorStatus: record.monitorStatus
        })

        setColumnData({
            id: record.id,
            name: record.name,
            type: record.monitorType,
            monitorItemId: record.monitorItem.id,
            monitorItem: record.monitorItem,
            intervalTime: record.intervalTime,
            dataRetentionTime: record.dataRetentionTime,
            monitorSource: record.monitorSource,
            monitorStatus: record.monitorStatus
        })

    };

    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => drawerList(record)}>{text}</span>,
        },
        {
            title: '监控项大类',
            dataIndex: ['monitorItem', 'type'],
            id: 'monitorType',
        },
        {
            title: '监控项小类',
            dataIndex: ['monitorItem', 'dataSubclass'],
            id: 'dataSubclass',
            render: (name) => <Tooltip title={name}>
                <div>{name}</div>
            </Tooltip>
        },
        {
            title: '监控表达式',
            dataIndex: ['monitorItem', 'name'],
            id: 'expression',
        },
        {
            title: '监控项来源',
            dataIndex: 'monitorSource',
            id: 'monitorSource',
            render: (monitorSource) => {
                let config = {
                    1: "主机",
                    2: "模板",
                }
                return config[monitorSource];
            }
        },
        {
            title: '间隔时间',
            dataIndex: 'intervalTime',
            id: 'intervalTime',
        },
        {
            title: '数据保留时间',
            dataIndex: 'dataRetentionTime',
            id: 'dataRetentionTime',
        },
        {
            title: '监控项状态',
            dataIndex: 'monitorStatus',
            id: 'monitorStatus',
            render: (monitorStatus) => {
                let config = {
                    1: "启用",
                    2: "关闭",
                }
                return config[monitorStatus];
            }
        },
        /*{
            title: '监控信息',
            dataIndex: 'information',
            id: 'information',
        },*/
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => removeToList(record)}>删除</span>
                </Space>
            ),
        },

    ];

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        });

        const resData = await findMonitorCondition();
        console.log(resData)

        setListData([...resData])
    }

    return (
        <>
            <UpdateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                           columnData={columnData} setColumnData={setColumnData} form={form}
                           listData={listData} setListData={setListData}
            />
            <Table rowKey={record => record.id}
                   columns={columns}
                   dataSource={data}
                   scroll={{
                       x: 300,
                       y: 'max-content'
                   }}
                   onChange={changePage}
                   pagination={{
                       position: ["bottomCenter"],
                       total: total,
                       showSizeChanger: true
                   }}
            />
        </>

    )
};

export default withRouter(MonitorList);