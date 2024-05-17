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
            title: "插件",
            id: "/setting/Plugin",
            icon:<MergeCellsOutlined />,
        },
        /*{
            title: "项目角色",
            id: "/setting/role",
            icon:<MergeCellsOutlined />,
        },*/
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

        {
            title: "基础数据",
            id: "basicData",
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    title:"系统功能",
                    id: "/setting/syr/feature",

                },
                {
                    title:"系统角色",
                    id: "/setting/system/role",

                },
                {
                    title:"项目功能",
                    id: "/setting/project/feature",

                },
                {
                    title:"项目角色",
                    id: "/setting/project/role",

                },
                {
                    title:"待办任务",
                    id: "/setting/todoTask",

                },
                {
                    title:"待办事项",
                    id: "/setting/task",

                },
                {
                    title:"待办模型",
                    id:"/setting/todoTemp",

                },
                {
                    title:"待办类型",
                    id: "/setting/todoType",

                },
                {
                    title:"日志模板",
                    id:"/setting/logTemplate",

                },
                {
                    title:"日志类型",
                    id:"/setting/logType",

                },
                {
                    title:"消息类型",
                    id:"/setting/messageType",
                },
                {
                    title:"消息发送方式",
                    id:"/setting/sendtrue",

                },
                {
                    title:"系统消息通知方案",
                    id:"/setting/systemNotice",

                },
                {
                    title:"项目消息通知方案",
                    id:"/setting/projectNotice",

                },
                {
                    title:"用户组",
                    id: "/setting/userGrouptrue",

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