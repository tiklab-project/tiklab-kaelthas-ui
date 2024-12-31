import React, {useEffect, useState} from 'react';
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Col, Drawer, Input, Modal, Row, Space, Table, Tabs} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";
import "../../../../common/styles/_tabStyle.scss"
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import HideDelete from "../../../../common/hideDelete/HideDelete";


const Template = (props) => {
    const {match:{params}} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);


    const deleteTemplate = async (id) => {

    };

    const searchName = async (event) => {

        const name = event.target.value;

    };

    const handleOk = async () => {
        setIsModalOpen(false);

    };

    async function showTemplateDetails(record) {
        setIsModalOpen(true);

    }

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (name, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{name}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
        },
        /*{
            title: '触发器数量',
            dataIndex: 'triggerNum',
            id: 'triggerNum',
        },*/
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <HideDelete
                        deleteFn={() => deleteTemplate(record.id)}
                        operation={"移除"}
                    ></HideDelete>
                </Space>
            ),
        },

    ];

    const monitorColumns = [
        {
            title: '监控项名称',
            dataIndex: 'name',
            id: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '监控项类别',
            dataIndex: ['monitorItem', 'type'],
            id: 'monitorType',
        },
        {
            title: '监控表达式',
            dataIndex: 'expression',
            id: 'expression',
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
                    2: "未启用",
                }
                return config[monitorStatus];
            }
        }
    ];

    async function changePage(pagination) {

    }

    return (
        <Row className="box-template-right">
            <Col>
                <div className="template-kind-options">
                    <div className="box-template-title-text">
                        模板数量:{0}
                    </div>
                    <div className="template-right-div">
                        <div>
                            <Input placeholder="模板名称"
                                   className="template-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="template-top-right">
                            <AddTemplate/>
                        </div>
                    </div>
                </div>
                <div className="box-template-table">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        // dataSource={templatePage}
                        className="custom-table"
                        // onChange={changePage}
                        pagination={{
                            position: ["bottomCenter"],
                            total: 10,
                            showSizeChanger: true
                        }}
                    />
                    <Drawer
                        title="模板详情"
                        placement="right"
                        onClose={handleOk}
                        open={isModalOpen}
                        visible={isModalOpen}
                        width={1000}
                        contentWrapperStyle={{top: 48, height: "calc(100% - 48px)"}}
                        maskStyle={{background: "transparent"}}
                    >
                        <div className="box-template-details-text">模板名称:百分比模板</div>
                        <div className="box-template-details-text">模板下监控项数量：{0}</div>

                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="监控项信息" key="2">
                                <Table
                                    rowKey={record => record.id}
                                    columns={monitorColumns}
                                    className="custom-table"
                                    // dataSource={monitorList}
                                    /*pagination={{
                                        position: ["bottomCenter"],
                                        total: monitorTotal,
                                        showSizeChanger: true,
                                        pageSize: searchCondition.pageParam.pageSize,
                                        current: searchCondition.pageParam.currentPage,
                                    }}*/
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="其他" key="3">
                                其他信息
                            </Tabs.TabPane>
                        </Tabs>
                    </Drawer>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Template));
