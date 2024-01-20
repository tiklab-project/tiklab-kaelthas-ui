import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Input, Space, Table} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";
import ShowTemplateMonitor from "./ShowTemplateMonitor";

const Template = (props) => {

    const [dataList, setDataList] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {findTemplateByMonitor, deleteTemplateById, setSearchCondition,findMonitorByTemplateId} = templateStore;

    const [rowData, setRowData] = useState([]);

    useEffect(async () => {
        setSearchCondition({
            name: null,
            hostId: localStorage.getItem(`hostId`),
            monitorSource: 2
        })

        const resData = await findTemplateByMonitor();

        setDataList([...resData])
    }, []);
    const deleteTemplate = async (id) => {

        await deleteTemplateById({
            hostId: localStorage.getItem("hostId"),
            templateId: id
        });

        const resData = await findTemplateByMonitor();

        setDataList([...resData]);
    };

    const searchName = async (event) => {

        const name = event.target.value;

        setSearchCondition({name: name});

        const resData = await findTemplateByMonitor();

        setDataList([...resData])

    };


    async function showTemplateDetails(record) {

        setIsModalOpen(true);
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
            title: '监控项数量',
            dataIndex: 'superiorId',
            id: 'superiorId',
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
                    <div style={{cursor: "pointer"}} onClick={() => deleteTemplate(record.id)}>移除</div>
                </Space>
            ),
        },

    ];


    return (
        <div>
            <div className="host-body">
                <div className="box-template">
                    <LeftMenu/>
                    <div className="box-template-right">
                        <div className="box-template-title">
                            <div className="box-template-title-text">
                                主机下模板
                            </div>
                            <div className="template-top-right">
                                <div>
                                    <AddTemplate dataList={dataList} setDataList={setDataList}/>
                                </div>

                            </div>
                        </div>
                        <div className="template-kind-options">
                            <div className="template-kind-search">
                                <div>
                                    <Input placeholder="请输入模板名称" onPressEnter={(event) => searchName(event)}/>
                                </div>
                            </div>
                        </div>

                        <div className="box-template-table">
                            <Table
                                rowKey={record => record.id}
                                columns={columns}
                                dataSource={dataList}
                                pagination={{
                                    position: ["bottomCenter"],
                                }
                                }
                            />
                            <ShowTemplateMonitor isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                 monitorList={rowData} setMonitorList={setRowData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Template);