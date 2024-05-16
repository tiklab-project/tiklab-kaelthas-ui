import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {Col, Form, Input, Modal, Row, Space, Table, Tabs} from "antd";
import "./TemplateSetting.scss"
import TemplateSettingAdd from "./TemplateSettingAdd";
import templateSettingStore from "../store/TemplateSettingStore";
import templateStore from "../../../host/template/store/TemplateStore";
import TemplateSettingUpdate from "./TemplateSettingUpdate";
import TemplateSettingMonitorList from "./TemplateSettingMonitorList";

const TemplateSetting = (props) => {

    const {
        findTemplatePage,
        setSearchCondition,
        createTemplate,
        deleteTemplate,
        deleteMonitorById,
        findTemplateMonitorByTemplateId,
        total
    } = templateSettingStore;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [rowData, setRowData] = useState({});

    const [dataList, setDataList] = useState([]);

    const [monitorList, setMonitorList] = useState([]);

    const [form] = Form.useForm();

    useEffect(async () => {

        const templatePage = await findTemplatePage();

        setDataList([...templatePage.dataList])

    }, []);

    const searchName = async (event) => {
        const name = event.target.value;

        await setSearchCondition({name: name});

        const resData = await findTemplatePage();

        setDataList([...resData.dataList])
    };

    async function showTemplateDetails(record) {
        setIsModalOpen(true);

        setRowData({
            id: record.id,
            name: record.name,
            monitorNum: record.monitorNum
        })

        const resData = await findTemplateMonitorByTemplateId(record.id);

        setMonitorList([...resData.data])

    }

    const deleteForTemplate = async (id) => {

        await deleteTemplate(id);

        const resData = await findTemplatePage();

        setDataList([...resData.dataList]);
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
                    <div style={{cursor: "pointer"}} onClick={() => deleteForTemplate(record.id)}>删除</div>
                </Space>
            ),
        },

    ];

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
                                    <TemplateSettingAdd setDataList={setDataList} dataList={dataList}/>
                                </Space>
                            </div>
                            <div className="template-kind-option">
                                <div className="template-kind-search">
                                    <div>
                                        <Input placeholder="请输入模板名称"
                                               onPressEnter={(event) => searchName(event)}/>
                                    </div>
                                </div>
                            </div>

                            <div className="box-templateSetting-table">
                                <Table
                                    rowKey={record => record.id}
                                    columns={columns}
                                    dataSource={dataList}
                                    pagination={{
                                        position: ["bottomCenter"],
                                        total: total,
                                        showSizeChanger: true
                                    }}
                                />

                                <TemplateSettingMonitorList
                                    isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                    setRowData={setRowData} rowData={rowData}
                                    monitorList={monitorList} setMonitorList={setMonitorList}
                                    dataList={dataList} setDataList={setDataList}
                                />

                            </div>
                        </div>
                    </Col>
                </div>

            </Row>
            <TemplateSettingUpdate
                isOpen={isOpen} setIsOpen={setIsOpen} form={form}
                setRowData={setRowData} rowData={rowData}
                setDataList={setDataList} dataList={dataList}
            />
        </>
    );
};

export default withRouter(TemplateSetting);