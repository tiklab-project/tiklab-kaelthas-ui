import {Form, Space, Table, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import UpdateGraphics from "./UpdateGraphics";
import graphicsStore from "../store/GraphicsStore";

const GraphicsList = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {getGraphicsStoreList,deleteGraphicsStoreById} = graphicsStore;

    useEffect(() => {

        getGraphicsStoreList().then((res) =>{
            setDataList([...res])
        })

    }, []);

    const deleteGraphics = async (id) => {

        const resData = await deleteGraphicsStoreById(id);

        setDataList([...resData]);
    };

    const updateGraphicsColumn = (record) => {

        setIsModalOpen(true);

        form.setFieldsValue({
            id:record.id,
            graphicsName:record.graphicsName,
            width:record.width,
            height:record.height,
            monitoringMetrics:record.monitoringMetrics,
            description:record.description
        });

        setColumnData({
            id:record.id,
            graphicsName:record.graphicsName,
            width:record.width,
            height:record.height,
            monitoringMetrics:record.monitoringMetrics,
            description:record.description
        })


    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'graphicsName',
            id: 'graphicsName',
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
            title: '监控指标',
            dataIndex: 'monitoringMetrics',
            id: 'monitoringMetrics',
        },
        {
            title: '问题描述',
            dataIndex: 'description',
            id: 'description',
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

    return (
        <>
            <UpdateGraphics dataList={dataList} setDataList={setDataList} form={form}
                            columnData={columnData} setColumnData={setColumnData}
                            isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />

            <Table columns={columns} dataSource={dataList}/>
        </>
    )


};
export default withRouter(GraphicsList);