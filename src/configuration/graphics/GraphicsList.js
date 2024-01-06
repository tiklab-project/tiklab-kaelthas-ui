import { Space, Table, Tag } from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";

const GraphicsList = (props) => {

    const {dataList,setDataList} = props;


    const deleteGraphics = (key) => {
        dataList.forEach((item,index)=>{
            if (key === item.key){
                dataList.splice(index,1);
            }
        })

        setDataList([...dataList]);
    };
    const columns = [
        {
            title: '图形名称',
            dataIndex: 'graphicsName',
            key: 'graphicsName',
            render: (text) => <span style={{cursor:"pointer"}}>{text}</span>,
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
                    <span style={{cursor:"pointer"}} onClick={()=>deleteGraphics(record.key)}>删除</span>
                </Space>
            ),
        },

    ];

    return <Table columns={columns} dataSource={dataList} />
} ;
export default withRouter(GraphicsList);