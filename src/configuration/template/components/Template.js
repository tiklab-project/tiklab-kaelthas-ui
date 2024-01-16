import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Input, Space, Table} from "antd";
import templateStore from "../store/TemplateStore";
import {withRouter} from "react-router-dom";

const Template = (props) => {

    const [dataList, setDataList] = useState([]);

    const {getAllTemplate, deleteTemplateById, setSearchCondition} = templateStore;

    useEffect(async () => {
        setSearchCondition({
            name:null,
            hostId:localStorage.getItem(`hostId`)
        })

        const resData = await getAllTemplate();

        setDataList([...resData])
    }, []);
    const deleteTemplate = async (id) => {

        const resData = await deleteTemplateById(id);

        setDataList([...resData]);
        console.log(dataList)
    };

    const searchName = async (event) => {

        const name = event.target.value;

        setSearchCondition({name: name});

        const resData = await getAllTemplate();

        setDataList([...resData])
        console.log(event.target.value)

    };


    const Search = () => <Input placeholder="请输入模板名称" onPressEnter={(event) => searchName(event)}/>;


    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            id: 'name',
            render: (text) => <span style={{cursor: "pointer"}}>{text}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            id: 'monitorNum',
        },
        {
            title: '触发器数量',
            dataIndex: 'triggerNum',
            id: 'triggerNum',
        },
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
                                    <Search/>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Template);