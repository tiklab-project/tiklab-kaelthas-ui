/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:09:01
 */

const setDevEamRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        key: '/index/setting/organ',
        encoded: "SysOrga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                key: '/index/setting/organ',
                encoded: "SysOrga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                key: '/index/setting/user',
                encoded: "SysUser",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                key: '/index/setting/usergroup',
                encoded: "SysUser",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                key: '/index/setting/directory',
                encoded: "SysMessage",
                code: 1-4,
            },
        ]
    },
    {
        title: "模板管理",
        icon: 'category',
        key: '/index/setting/template',
        encoded: "LoadData",
        code: 3,
    },

    {
        title: '权限',
        icon: 'systemcenter',
        key: "/index/setting/systemRole",
        encoded: "SysRoleSystem",
        code: 2
    },
    {
        title: "消息",
        icon: 'messagecenter',
        key: '/index/setting/messageNotice',
        encoded: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                key: '/index/setting/messageNotice',
                encoded: "SysMessage",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                key: '/index/setting/messageSendType',
                encoded: "SysMessageType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        key: '/index/setting/plugin',
        encoded: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        key: '/index/setting/loadData',
        encoded: "SysMessage",
        code: 9,
        children: [
            {
                title: 'Confluence',
                icon: 'systemcenter',
                key: '/index/setting/loadData',
                encoded: "SysMessageManagement",
                code: 9-1,
            },
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        key: '/index/setting/log',
        encoded: "SysMessage",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                key: '/index/setting/logList',
                encoded: "logList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        key: '/index/setting/version',
        encoded: "SysPlugin",
        code: 11,
    },
    {
        title: "产品授权",
        icon: 'plugin',
        key: '/index/setting/product',
        encoded: "SysPlugin",
        code: 13,
    },
    {
        title: "基础数据",
        icon: 'systemcenter',
        key: '/index/setting/systemFeature',
        encoded: "basicData",
        code: 12,
        children: [
            {
                title: '用户组',
                icon: 'projecttype',
                key: '/index/setting/usersystemgroup',
                encoded: "usersystemgroup",
                code: 12-18,
            },
            {
                title: '系统功能',
                icon: 'systemcenter',
                key: '/index/setting/systemFeature',
                encoded: "SysFeatruestem",
                code: 12-3,
            },
            {
                title: '系统角色',
                icon: 'systemcenter',
                key: '/index/setting/systemRoleBuilt',
                encoded: "SystemRoleBuilt",
                code: 12-4,
            },
            {
                title: '项目功能',
                icon: 'projectpriviliage',
                key: '/index/setting/projectFeature',
                encoded: "SysFeatrueProject",
                code: 12-5,
            },
            {
                title: '项目角色',
                icon: 'projectpriviliage',
                key: '/index/setting/projectRole',
                encoded: "SysRoleProject",
                code: 12-6
            },
            {
                title: '消息通知方式',
                icon: 'messagecenter',
                key: '/index/setting/messageNoticeSystem',
                encoded: "SysMessageTemplate",
                code: 12-7,
            },
            {
                title: '消息类型',
                icon: 'messagecenter',
                key: '/index/setting/messageType',
                encoded: "SysMessageType",
                code: 12-8,
            },
            {
                title: '日志模板',
                icon: 'systemcenter',
                key: '/index/setting/myLogTemplateList',
                encoded: "myLogTemplateList",
                code: 12-10,
            },
            {
                title: '日志类型',
                icon: 'systemcenter',
                key: '/index/setting/projectLogTypeList',
                encoded: "projectLogTypeList",
                code: 12-11,
            },
            {
                title: '待办模板',
                icon: 'systemcenter',
                key: '/index/setting/todoTempList',
                encoded: "todoTempList",
                code: 12-12,
            },
            {
                title: '待办类型',
                icon: 'systemcenter',
                key: '/index/setting/todoTypeTask',
                encoded: "todoTempList",
                code: 12-13,
            }
        ]
    }
];

const setPrdEamRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        key: '/index/setting/organ',
        encoded: "SysOrga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                key: '/index/setting/organ',
                encoded: "SysOrga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                key: '/index/setting/user',
                encoded: "SysUser",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                key: '/index/setting/usergroup',
                encoded: "SysUser",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                key: '/index/setting/directory',
                encoded: "SysMessage",
                code: 1-4,
            },
        ]
    },
    {
        title: "模板管理",
        icon: 'category',
        key: '/index/setting/template',
        encoded: "LoadData",
        code: 3
    },

    {
        title: '权限',
        icon: 'systemcenter',
        key: "/index/setting/systemRole",
        encoded: "SysRoleSystem",
        code: 2
    },
    {
        title: "消息",
        icon: 'messagecenter',
        key: '/index/setting/messageNotice',
        encoded: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                key: '/index/setting/messageNotice',
                encoded: "SysMessage",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                key: '/index/setting/messageSendType',
                encoded: "SysMessageType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        key: '/index/setting/plugin',
        encoded: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        key: '/index/setting/loadData',
        encoded: "SysMessage",
        code: 9,
        children: [
            {
                title: 'Confluence',
                icon: 'systemcenter',
                key: '/index/setting/loadData',
                encoded: "SysMessageManagement",
                code: 9-1,
            },
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        key: '/index/setting/log',
        encoded: "SysMessage",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                key: '/index/setting/logList',
                encoded: "logList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        key: '/index/setting/version',
        encoded: "SysPlugin",
        code: 11,
    },
    {
        title: "产品授权",
        icon: 'plugin',
        key: '/index/setting/product',
        encoded: "SysPlugin",
        code: 13,
    }
];

const setDevRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        key: '/index/setting/organ',
        encoded: "SysOrga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                key: '/index/setting/organ',
                encoded: "SysOrga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                key: '/index/setting/user',
                encoded: "SysUser",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                key: '/index/setting/usergroup',
                encoded: "SysUser",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                key: '/index/setting/directory',
                encoded: "SysMessage",
                code: 1-4,
            },
        ]
    },
    {
        title: "模板管理",
        icon: 'category',
        key: '/index/setting/template',
        encoded: "LoadData",
        code: 3
    },

    {
        title: '权限',
        icon: 'systemcenter',
        key: "/index/setting/systemRole",
        encoded: "SysRoleSystem",
        code: 2
    },
    {
        title: "消息",
        icon: 'messagecenter',
        key: '/index/setting/messageNotice',
        encoded: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                key: '/index/setting/messageNotice',
                encoded: "SysMessage",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                key: '/index/setting/messageSendType',
                encoded: "SysMessageType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        key: '/index/setting/plugin',
        encoded: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        key: '/index/setting/loadData',
        encoded: "SysMessage",
        code: 9,
        children: [
            {
                title: 'Confluence',
                icon: 'systemcenter',
                key: '/index/setting/loadData',
                encoded: "SysMessageManagement",
                code: 9-1,
            },
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        key: '/index/setting/log',
        encoded: "SysMessage",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                key: '/index/setting/logList',
                encoded: "logList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        key: '/index/setting/version',
        encoded: "SysPlugin",
        code: 11,
    },
    {
        title: "产品授权",
        icon: 'plugin',
        key: '/index/setting/product',
        encoded: "SysPlugin",
        code: 13,
    }
];

const setPrdRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        key: '/index/setting/organ',
        encoded: "SysOrga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                key: '/index/setting/organ',
                encoded: "SysOrga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                key: '/index/setting/user',
                encoded: "SysUser",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                key: '/index/setting/usergroup',
                encoded: "SysUser",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                key: '/index/setting/directory',
                encoded: "SysMessage",
                code: 1-4,
            },
        ]
    },
    {
        title: "模板管理",
        icon: 'category',
        key: '/index/setting/template',
        encoded: "LoadData",
        code: 3
    },

    {
        title: '权限',
        icon: 'systemcenter',
        key: "/index/setting/systemRole",
        encoded: "SysRoleSystem",
        code: 2
    },
    {
        title: "消息",
        icon: 'messagecenter',
        key: '/index/setting/messageNotice',
        encoded: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                key: '/index/setting/messageNotice',
                encoded: "SysMessage",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                key: '/index/setting/messageSendType',
                encoded: "SysMessageType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        key: '/index/setting/plugin',
        encoded: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        key: '/index/setting/loadData',
        encoded: "SysMessage",
        code: 9,
        children: [
            {
                title: 'Confluence',
                icon: 'systemcenter',
                key: '/index/setting/loadData',
                encoded: "SysMessageManagement",
                code: 9-1,
            },
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        key: '/index/setting/log',
        encoded: "SysMessage",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                key: '/index/setting/logList',
                encoded: "logList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        key: '/index/setting/version',
        encoded: "SysPlugin",
        code: 11,
    },
    {
        title: "产品授权",
        icon: 'plugin',
        key: '/index/setting/product',
        encoded: "SysPlugin",
        code: 13,
    }
];
export  {setDevEamRouter, setDevRouter, setPrdEamRouter, setPrdRouter};