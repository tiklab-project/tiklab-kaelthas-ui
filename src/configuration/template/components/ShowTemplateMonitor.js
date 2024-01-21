// import {Modal, Space, Table, Tag} from 'antd';
// import React, {useEffect, useState} from 'react';
// import {withRouter} from "react-router-dom";
// import templateStore from "../store/TemplateStore";
//
// const columns = [
//     {
//         title: '监控项名称',
//         dataIndex: 'name',
//         id: 'name',
//         render: (text) => <span style={{cursor: "pointer"}}>{text}</span>,
//     },
//     {
//         title: '监控项类别',
//         dataIndex: ['monitorItem','type'],
//         id: 'monitorType',
//     },
//     {
//         title: '监控表达式',
//         dataIndex: ['monitorItem','name'],
//         id: 'expression',
//     },
//     {
//         title: '间隔时间',
//         dataIndex: 'intervalTime',
//         id: 'intervalTime',
//     },
//     {
//         title: '数据保留时间',
//         dataIndex: 'dataRetentionTime',
//         id: 'dataRetentionTime',
//     },
//     {
//         title: '监控项状态',
//         dataIndex: 'monitorStatus',
//         id: 'monitorStatus',
//         render:(monitorStatus) => {
//             let config = {
//                 1: "启用",
//                 2: "未启用",
//             }
//             return config[monitorStatus];
//         }
//     },
//     {
//         title: '监控信息',
//         dataIndex: 'information',
//         id: 'information',
//     },
//
// ];
// const ShowTemplateMonitor = (props) => {
//
//     const {isModalOpen, setIsModalOpen} = props;
//
//     const {monitorList,setMonitorList} = props;
//
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//
//     return (
//         <Modal
//             open={isModalOpen}
//             title="模板下监控项"
//             onOk={handleOk}
//             onCancel={handleCancel}
//             visible={isModalOpen}
//             width={1000}
//         >
//             <Table columns={columns} dataSource={monitorList}/>
//         </Modal>
//     )
// }
// export default withRouter(ShowTemplateMonitor);