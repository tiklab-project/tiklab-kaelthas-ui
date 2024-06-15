import React from "react";
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined, SafetyCertificateOutlined,
    TeamOutlined,
} from "@ant-design/icons";

// 用户与部门路由
export const departmentRouters =[
    {
        id: "user",
        title: "用户与部门",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/setting/deportment",
                title: "部门",
                purviewCode: "deportment",
            },
            {
                id: "/setting/user",
                title: "用户",
                purviewCode: "user",
            },
            {
                id: "/setting/userGroup",
                title: "用户组",
                purviewCode: "user_group",
            },
            {
                id: "/setting/directory",
                title: "用户目录",
                purviewCode: "user_directory",
            },
            {
                id:"/setting/role",
                title:"权限",
                purviewCode:"pipeline_permission",
            },
        ]
    }
]
