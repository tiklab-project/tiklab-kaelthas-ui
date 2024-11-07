import React from 'react';
import {withRouter} from "react-router-dom";
import SystemContent from "./SettingContent";
import {ForkOutlined, InboxOutlined, LayoutOutlined, LockOutlined, SoundOutlined} from "@ant-design/icons";

const GlobalSettingLayout = (props) => {

    const router = [
        {
            title: '用户与权限',
            id: "user",
            icon:<LockOutlined />,
            children: [
                {
                    title: '用户',
                    id: "/setting/user",
                    easId: "/setting/user",
                    islink:true
                },
                {
                    title: '部门',
                    id: "/setting/orga",
                    easId:"/setting/orga",
                    islink:true
                },
                {
                    title: '用户组',
                    id: "/setting/userGroup",
                    easId: "/setting/userGroup",
                    islink:true
                },
                {
                    title: '用户目录',
                    id: "/setting/dir",
                    easId: "/setting/dir",
                    islink:true
                },
                {
                    title: '权限',
                    id: "/setting/systemRole",
                }
            ]
        },
        {
            title: "消息",
            id: "message",
            icon: <SoundOutlined/>,
            children: [
                {
                    title: "消息通知方案",
                    id: "/setting/messageNotice",
                },
                {
                    title: "消息发送方式",
                    id: "/setting/messageSendType",
                },
            ]
        },
        {
            title: "主机配置",
            id: "hostConfiguration",
            icon: <ForkOutlined/>,
            children: [
                {
                    title: '模板配置',
                    id: `/setting/template`,
                },
                {
                    title: '主机组',
                    id: `/setting/hostGroup`,
                },
            ]
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
                    id: "/setting/log",
                }
            ]
        },
        {
            title: "应用",
            id: "licence",
            icon: <InboxOutlined/>,
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
            outerPath={'/setting'}
            applicationRouters={router}
        />
    );
};

export default withRouter(GlobalSettingLayout);