import {Space, Table, Tag} from 'antd';
import React from 'react';
import {withRouter} from "react-router-dom";




const MemberTable = (props) => {

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '用户目录',
            dataIndex: 'userDirectory',
            key: 'userDirectory',
        },

        {
            title: '删除',
            key: 'delete',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteForList(record.key)}>删除</span>
                </Space>
            ),
        },
    ];
    const deleteForList = (key) => {
        dataList.forEach((item,index)=>{
            if (item.key === key){
                dataList.splice(index,1)
            }
        })

        setDataList([...dataList]);
    };

    const {dataList, setDataList} = props;


    return (
        <Table columns={columns} dataSource={dataList}/>
    )

}

export default withRouter(MemberTable);