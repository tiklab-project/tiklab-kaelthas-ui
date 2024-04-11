import {Form, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import UpdateGraphics from "./UpdateGraphics";
import graphicsStore from "../store/GraphicsStore";
import "../../../common/styles/_tabStyle.scss";

const GraphicsList = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {getGraphicsStoreList,deleteGraphicsStoreById,total,setSearchCondition} = graphicsStore;



    const deleteGraphics = async (id) => {

        await deleteGraphicsStoreById(id);

        getGraphicsStoreList().then((res) =>{
            setDataList([...res.dataList])
        })
    };

    const updateGraphicsColumn = (record) => {

        setIsModalOpen(true);

        form.setFieldsValue({
            id:record.id,
            name: record.name,
            width: record.width,
            height: record.height,
            describe:record.describe,
            monitorId:record.monitorId,
            source:record.source,
            monitorName:record.monitorName
        });

        setColumnData({
            id:record.id,
            name: record.name,
            width: record.width,
            height: record.height,
            describe:record.describe,
            monitorId:record.monitorId
        })

    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: '宽度',
            dataIndex: 'width',
            id: 'width',
        },
        {
            title: '高度',
            dataIndex: 'height',
            id: 'height',
        },
        {
            title: '监控名称',
            dataIndex: 'monitorName',
            id: 'monitorName',
        },
        {
            title: '问题描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteGraphics(record.id)}>删除</span>
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

        const resData = await getGraphicsStoreList();

        setDataList([...resData])
    }

    return (
        <>
            <UpdateGraphics form={form} columnData={columnData} setColumnData={setColumnData}
                            isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />

            <Table rowKey={record => record.id}
                   columns={columns}
                   dataSource={dataList}
                   className="custom-table"
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
export default withRouter(GraphicsList);