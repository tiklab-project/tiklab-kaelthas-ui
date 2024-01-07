import {Form, Space, Table, Tag} from 'antd';
import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import UpdateGraphics from "./UpdateGraphics";

const GraphicsList = (props) => {

    const {dataList, setDataList} = props;

    const [form] = Form.useForm();

    const [columnData, setColumnData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteGraphics = (key) => {
        dataList.forEach((item, index) => {
            if (key === item.key) {
                dataList.splice(index, 1);
            }
        })

        setDataList([...dataList]);
    };

    const updateGraphicsColumn = (record) => {

        setIsModalOpen(true);
        console.log('record:',record)
        setColumnData({
            key:record.key,
            graphicsName:record.graphicsName,
            width:record.width,
            height:record.height,
        })


    };

    const columns = [
        {
            title: '图形名称',
            dataIndex: 'graphicsName',
            key: 'graphicsName',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => updateGraphicsColumn(record)}>{text}</span>,
        },
        {
            title: '宽度',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: '高度',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteGraphics(record.key)}>删除</span>
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