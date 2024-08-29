import React, {useEffect} from 'react';
import {Col, Input, Row, Table, Tag} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import "./Kubernetes.scss"
import kubernetesStore from "../store/KubernetesStore";
import {observer} from "mobx-react";

const Kubernetes = (props) => {

    const {
        findKbInfoPage,
        kbPage,
        setSearchCondition,
        searchCondition,
        total,
        updateKbInfo
    } = kubernetesStore;

    useEffect(async () => {
        await findKbInfoPage();
    }, []);

    async function hrefDatabases(record) {
        const now = new Date();
        record.updateTime = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '-');

        localStorage.setItem('kuId', record.id);
        localStorage.setItem("kuName", record.name)
        localStorage.setItem("url", `/kubernetes/${record.id}/kuOverview`)
        await updateKbInfo(record)
        props.history.push(`/kubernetes/${record.id}/kuOverview`);
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <div style={{cursor: "pointer"}} onClick={() => hrefDatabases(record)}>{text}</div>,
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (usability, record) => <div style={{cursor: "pointer"}}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (alarmNum) => <div style={{cursor: "pointer"}}>{conversionColor(alarmNum)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    function conversionColor(text) {
        if (text === 0 || text === null) {
            return <Tag color={"blue"}>{0}</Tag>
        } else {
            return <Tag color={"red"}>{text}</Tag>
        }
    }

    function converType(record) {

        if (record.status === 0) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message})</span>
                </div>
            }
            if (record.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({record.message}...)</span>
                </div>
            }
        }

        if (record.status === 1) {
            return <Tag color={"blue"}>正常</Tag>
        }

    }

    function createKubernetes() {
        props.history.push('/kubernetes/addKubernetes');
    }

    function searchKubernetesName(event) {

    }

    const changePage = async (pagination, filters, sorter) => {

        setSearchCondition({
            pageParam: {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
            }
        })

        await findKbInfoPage();
    };

    return (
        <Row className="kb-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>

                <div className="kb-body">
                    <div className="kb-title">
                        <div className="kb-title-text">Kubernetes</div>
                        <div className="kb-title-add-button" onClick={() => createKubernetes()}>新建Kubernetes</div>
                    </div>
                    <div className="kb-type-search">
                        <div className="kb-type">

                        </div>
                        <div>
                            <Input
                                placeholder="Kubernetes名称"
                                className="kb-search"
                                onPressEnter={(event) => searchKubernetesName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="kb-table">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={kbPage}
                            onChange={changePage}

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

export default observer(Kubernetes);