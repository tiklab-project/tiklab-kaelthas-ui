import { Space, Table, Tag } from 'antd';
import React from 'react';
import {Link, withRouter} from "react-router-dom";




const TemplateList = (props) => {

    const {dataList,setDataList} = props;
    const deleteTemplate = (key) => {

        dataList.forEach((item,index)=>{

            if (item.key === key){
                dataList.splice(index,1);
            }
        })

        setDataList([...dataList]);
    };


    const columns = [
        {
            title: '模板名称',
            dataIndex: 'templateName',
            key: 'templateName',
            render: (text) => <span style={{cursor:"pointer"}}>{text}</span>,
        },
        {
            title: '监控项数量',
            dataIndex: 'monitorNum',
            key: 'monitorNum',
        },
        {
            title: '触发器数量',
            dataIndex: 'triggerNum',
            key: 'triggerNum',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{cursor:"pointer"}} onClick={()=>deleteTemplate(record.key)}>移除</div>
                </Space>
            ),
        },

    ];

    return <Table columns={columns} dataSource={dataList} />
} ;
export default withRouter(TemplateList);