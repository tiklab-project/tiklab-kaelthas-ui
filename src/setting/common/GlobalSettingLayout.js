import React from 'react';
import {withRouter} from "react-router-dom";
import "./GlobalSettingLayout.scss"
import {
    AppstoreAddOutlined,
    BuildOutlined, GroupOutlined,
    LayoutOutlined,
    MergeCellsOutlined,
    SoundOutlined
} from "@ant-design/icons";
import SystemContent from "./SettingContent";

const GlobalSettingLayout = (props) => {

    const router = [
        {
            title: '用户与权限',
            id: "user",
            icon: <SoundOutlined/>,
            children: [
                {
                    title: '部门',
                    id: "/setting/department",
                },
                {
                    title: '用户',
                    id: "/setting/user",
                },
                {
                    title: '用户组',
                    id: "/setting/userGroup",
                },
                {
                    title: '用户目录',
                    id: "/setting/directory",
                },
                {
                    title: '权限',
                    id: "/setting/systemRole",
                }
            ]
        },
        {
            title: "消息",
            id:"message",
            icon:<SoundOutlined/>,
            children: [
                {
                    title:"消息通知方案",
                    id:"/setting/messageNotice",
                },
                {
                    title: "消息发送方式",
                    id:"/setting/messageSendType",
                },
            ]
        },
        {
            title: '模板配置',
            id: `/setting/template`,
            icon: <BuildOutlined />,
        },
        {
            title: '主机组',
            id: `/setting/hostGroup`,
            icon: <GroupOutlined />,
        },
        {
            title: "安全",
            id: "security",
            icon: <LayoutOutlined/>,
            children: [
                {
                    title: "备份与恢复",
                    id: "/setting/backups",
                },
                {
                    title: "操作日志",
                    id: "/setting/myLog",
                }
            ]
        },
        {
            title: "应用",
            id: "licence",
            icon: <LayoutOutlined/>,
            children: [
                {
                    title: "版本与许可证",
                    id: "/setting/version",
                },
                {
                    title: "应用访问权限",
                    id: "/setting/productAuth",
                },
            ]
        },
    ];

    return (
        <SystemContent
            {...props}
            isDepartment={true}
            applicationRouters={router}
        />
    );
};

export default withRouter(GlobalSettingLayout);