import React, {useEffect, useState} from 'react';
import "./DbMonitor.scss"
import {Col, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import DbUpdateMonitor from "./DbUpdateMonitor";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";
import dbMonitorStore from "../store/DbMonitorStore";
import DbAddMonitor from "./DbAddMonitor";
import dbDetailsStore from "../../../dbDetails/sotre/DbDetailsStore";

const DbMonitor = (props) => {
    const {match:{params}} = props;

    const {
        findDbMonitorPage,
        setSearchCondition,
        dbMonitorList,
        setSearchNullCondition,
        total,
        deleteDbMonitor,
        searchCondition,
        findItemListByType
    } = dbMonitorStore;

    const {findDbInfoById} = dbDetailsStore;

    const [monitorSource, setMonitorSource] = useState(null);

    const [columnData, setColumnData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {
        setSearchCondition({
            dbId: params.id
        })
        await findDbMonitorPage()

         findDbInfoById(params.id).then(res=>{
             findItemListByType({
                 dbType: res.dbType
             });
         })
    }, []);

    const searchName = async (e) => {
        const value = e.target.value;
        setSearchCondition({
            name: value
        })
        await findDbMonitorPage()
    };


    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        });

        await findDbMonitorPage();
    }

    const removeToList = async (record) => {
        await deleteDbMonitor(record.id)
        await findDbMonitorPage()
    }

    const drawerList = (record) => {
        form.setFieldsValue(record)
        setColumnData(record)
        setIsModalOpen(true);
    };

    const availabilityTab = [
        {
            title: '全部',
            key: null,
            icon: "allHost"
        },
        {
            title: '数据库监控项',
            key: 1,
            icon: "noAvailableHost"
        },
        {
            title: '模板监控项',
            key: 2,
            icon: "availableHost"
        },
    ];

    const columns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            width: "10%",
            ellipsis: "true",
            render: (name, record) => <span style={{cursor: "pointer"}} onClick={() => drawerList(record)}>{name}</span>
        },
        {
            title: '采集数据库名称',
            dataIndex: 'datName',
            id: 'datName',
            width: "10%",
            ellipsis: "true"
        },
        {
            title: '监控表达式',
            dataIndex: ['dbItem', 'expression'],
            id: 'expression',
            width: "20%",
            ellipsis: "true"
        },
        {
            title: '数据保留时间',
            dataIndex: 'retentionTime',
            id: 'retentionTime',
            width: "10%",
            ellipsis: "true",
        },
        {
            title: '监控项状态',
            dataIndex: 'status',
            id: 'status',
            width: "10%",
            ellipsis: "true",
            render: (monitorStatus) => {
                let config = {
                    1: "启用",
                    2: "关闭",
                }
                return config[monitorStatus];
            }
        },
        {
            title: '操作',
            id: 'action',
            width: "5%",
            ellipsis: "true",
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => removeToList(record)}
                        operation={"删除"}
                    />
                </Space>
            ),
        },

    ];

    return (
        <Row className="box-monitor-right">
            <Col>
                <div className='db-monitor-title'>
                    <div className='db-monitor-title-text'>监控项</div>
                    <div className="db-monitor-top-right">
                        <DbAddMonitor {...props} dbId={params.id}/>
                    </div>
                </div>

                <div className="db-monitor-kind-options">
                    <Input
                        placeholder="监控项名称"
                        className="monitor-kind-search"
                        onPressEnter={(event) => searchName(event)}
                        allowClear={true}
                        prefix={<SearchOutlined/>}
                    />

                </div>
                <div className="box-monitor-table">
                    <>
                        <DbUpdateMonitor isModalOpen={isModalOpen}
                                         setIsModalOpen={setIsModalOpen}
                                         form={form} columnData={columnData}
                                         dbId={params.id}
                        />
                        <Table rowKey={record => record.id}
                               columns={columns}
                               dataSource={dbMonitorList}
                               className="custom-table"
                               onChange={changePage}
                               pagination={{
                                   position: ["bottomCenter"],
                                   total: total,
                                   showSizeChanger: true,
                                   pageSize: searchCondition.pageParam.pageSize,
                                   current: searchCondition.pageParam.currentPage,
                               }}
                        />
                    </>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(DbMonitor));
