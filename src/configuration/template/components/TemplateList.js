// import {Space, Table, Tag} from 'antd';
// import React, {useEffect} from 'react';
// import {Link, withRouter} from "react-router-dom";
// import templateStore from "../store/TemplateStore";
//
// const TemplateList = (props) => {
//
//     const {dataList, setDataList} = props;
//
//     const {getAllTemplate, deleteTemplateById} = templateStore;
//
//     useEffect(() => {
//         getAllTemplate().then(res => {
//             setDataList([...res])
//
//         })
//     }, []);
//     const deleteTemplate = async (id) => {
//
//         const resData = await deleteTemplateById(id);
//
//         setDataList([...resData]);
//     };
//
//
//     const columns = [
//         {
//             title: '模板名称',
//             dataIndex: 'templateName',
//             id: 'templateName',
//             render: (text) => <span style={{cursor: "pointer"}}>{text}</span>,
//         },
//         {
//             title: '监控项数量',
//             dataIndex: 'monitorNum',
//             id: 'monitorNum',
//         },
//         {
//             title: '触发器数量',
//             dataIndex: 'triggerNum',
//             id: 'triggerNum',
//         },
//         {
//             title: '操作',
//             id: 'action',
//             render: (_, record) => (
//                 <Space size="middle">
//                     <div style={{cursor: "pointer"}} onClick={() => deleteTemplate(record.id)}>移除</div>
//                 </Space>
//             ),
//         },
//
//     ];
//
//     return <Table rowid={record => record.id} columns={columns} dataSource={dataList}/>
// };
// export default withRouter(TemplateList);