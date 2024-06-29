import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Col, Form, Input, Modal, Row, Space, Table, Tabs} from "antd";
import "./TemplateSetting.scss"
import TemplateSettingAdd from "./TemplateSettingAdd";
import templateSettingStore from "../store/TemplateSettingStore";
import TemplateSettingUpdate from "./TemplateSettingUpdate";
import {observer} from "mobx-react";
import HideDelete from "../../../common/hideDelete/HideDelete";

const TemplateSetting = (props) => {

    const {
        findTemplatePage,
        setSearchCondition,
        deleteTemplate,
        total,
        templateList,
        searchCondition
    } = templateSettingStore;

    const [isOpen, setIsOpen] = useState(false);

    const [rowData, setRowData] = useState({});

    const [dataList, setDataList] = useState([]);

    const [form] = Form.useForm();

    useEffect(async () => {
        await findTemplatePage();
    }, []);

    const searchName = async (event) => {
        const name = event.target.value;

        await setSearchCondition({name: name});

        await findTemplatePage();
    };

    async function showTemplateDetails(record) {
        const stringify = JSON.stringify({
            id: record.id,
            name: record.name,
            monitorNum: record.monitorNum
        });

        localStorage.setItem("rowData", stringify)

        localStorage.setItem("templateId", record.id)

        props.history.push(`/setting/monitor/${record.id}`)
    }

    const deleteForTemplate = async (id) => {

        await deleteTemplate(id);
        await findTemplatePage();

    };

    function updateForTemplate(record) {
        setIsOpen(true);

        setRowData({
            id: record.id,
            name: record.name,
            isOpen: record.isOpen,
            describe: record.describe
        })

        form.setFieldsValue({
            name: record.name,
            isOpen: record.isOpen,
            describe: record.describe
        })
    }

    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}}
                                            onClick={() => showTemplateDetails(record)}>{text}</span>,
        },
        {
            title: '模板状态',
            dataIndex: 'isOpen',
            id: 'isOpen',
            render: (isOpen) => {
                let config = {
                    1: "开启",
                    0: "关闭"
                }
                return config[isOpen];
            }
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
        },
        {
            title: '模板描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{cursor: "pointer"}} onClick={() => updateForTemplate(record)}>修改</div>
                    {/*<div style={{cursor: "pointer"}} onClick={() => deleteForTemplate(record.id)}>删除</div>*/}
                    <HideDelete
                        deleteFn={() => deleteForTemplate(record)}
                        operation={"删除"}
                    />
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
        })

        await findTemplatePage();
    }

    return (

        <>
            <Row className="box-templateSetting">
                <div className="box-templateSetting-body">
                    <Col>
                        <div className="box-templateSetting-div">
                            <div className="box-privilege-breadcrumb">
                                <Space className="box-templateSetting-space">
                                    <span>模板</span>
                                </Space>
                                <Space>
                                    <TemplateSettingAdd/>
                                </Space>
                            </div>
                            <div className="template-kind-option">
                                <div>
                                    <Input placeholder="请输入模板名称"
                                           onPressEnter={(event) => searchName(event)}/>
                                </div>
                            </div>
                            <Table
                                rowKey={record => record.id}
                                columns={columns}
                                dataSource={templateList}
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
                        </div>
                    </Col>
                </div>
            </Row>
            <TemplateSettingUpdate
                isOpen={isOpen} setIsOpen={setIsOpen} form={form}
                setDataList={setDataList} dataList={templateList}
            />
        </>
    );
};

export default withRouter(observer(TemplateSetting));