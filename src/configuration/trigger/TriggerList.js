import { Space, Table, Tag } from 'antd';
import React from 'react';

const TriggerList = (props) => {

    const {dataList,setDataList} = props;

    const deleteTrigger = (key)=>{

        dataList.forEach((item,index)=>{
            if (key === item.key){
                dataList.splice(index,1)
            }
        })
        setDataList([...dataList])
    }

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'triggerName',
            key: 'triggerName',
            render: (text) => <span style={{cursor:"pointer"}}>{text}</span>,
        },
        {
            title: '是否模板创建',
            dataIndex: 'isTemplate',
            key: 'isTemplate',
        },
        {
            title: '触发表达式',
            dataIndex: 'triggerExpression',
            key: 'triggerExpression',
        },{
            title: '消息通知方案',
            dataIndex: 'messageType',
            key: 'messageType',
        },{
            title: '告警类型',
            dataIndex: 'alarmType',
            key: 'alarmType',
        },{
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor:"pointer"}} onClick={() => deleteTrigger(record.key)}>删除</span>
                </Space>
            ),
        },

    ];

    return(
        <Table
            columns={columns}
            dataSource={dataList}
        />
    )
} ;
export default TriggerList;