/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:09:01
 */

const setDevRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        id: '/index/setting/organ',
        purviewCode: "orga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                id: '/index/setting/organ',
                purviewCode: "orga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                id: '/index/setting/user',
                purviewCode: "user",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                id: '/index/setting/usergroup',
                purviewCode: "user_group",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                id: '/index/setting/directory',
                purviewCode: "user_dir",
                code: 1-4,
            },
        ]
    },
    {
        title: '模板',
        icon: 'systemcenter',
        id: "/index/setting/template",
        code: 14
    },
    {
        title: '权限',
        icon: 'systemcenter',
        id: "/index/setting/systemRole",
        purviewCode: "SysPermission",
        code: 2
    },
    
    {
        title: "消息",
        icon: 'messagecenter',
        id: '/index/setting/messageNotice',
        purviewCode: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                id: '/index/setting/messageNotice',
                purviewCode: "SysMessageNotice",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                id: '/index/setting/messageSendType',
                purviewCode: "SysMessageSendType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        id: '/index/setting/plugin',
        purviewCode: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        id: '/index/setting/loadData',
        code: 9,
        children: [
            {
                title: '地址配置',
                id: '/index/setting/urlData',
                code: 9-1,
            }
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        id: '/index/setting/log',
        // purviewCode: "SysLog",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                id: '/index/setting/logList',
                // purviewCode: "SysLogList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        id: '/index/setting/version',
        purviewCode: "SysVersion",
        code: 11,
    },
   
    {
        title: "基础数据",
        icon: 'systemcenter',
        id: '/index/setting/systemFeature',
        code: 12,
        children: [
            {
                title: '用户组',
                icon: 'projecttype',
                id: '/index/setting/usersystemgroup',
                purviewCode: "user_group",
                code: 12-18,
            },
            {
                title: '系统功能',
                icon: 'systemcenter',
                id: '/index/setting/systemFeature',
                purviewCode: "SysFeatrueSys",
                code: 12-3,
            },
            {
                title: '系统角色',
                icon: 'systemcenter',
                id: '/index/setting/systemRoleBuilt',
                purviewCode: "SysRoleSys",
                code: 12-4,
            },
            {
                title: '项目功能',
                icon: 'projectpriviliage',
                id: '/index/setting/projectFeature',
                purviewCode: "SysFeatrueProject",
                code: 12-5,
            },
            {
                title: '项目角色',
                icon: 'projectpriviliage',
                id: '/index/setting/projectRole',
                purviewCode: "SysRoleProject",
                code: 12-6
            },
            {
                title: '消息通知方式',
                icon: 'messagecenter',
                id: '/index/setting/messageNoticeSystem',
                purviewCode: "SysMessageNotice",
                code: 12-7,
            },
            {
                title: '消息类型',
                icon: 'messagecenter',
                id: '/index/setting/messageType',
                purviewCode: "SysMessageType",
                code: 12-8,
            },
           
            {
                title: '日志模板',
                icon: 'systemcenter',
                id: '/index/setting/myLogTemplateList',
                // purviewCode: "SysLogTemplate",
                code: 12-10,
            },
            {
                title: '日志类型',
                icon: 'systemcenter',
                id: '/index/setting/projectLogTypeList',
                // purviewCode: "SysLogType",
                code: 12-11,
            },
            {
                title: '待办模板',
                icon: 'systemcenter',
                id: '/index/setting/todoTempList',
                purviewCode: "SysSetting",
                code: 12-12,
            },
            {
                title: '待办类型',
                icon: 'systemcenter',
                id: '/index/setting/todoTypeTask',
                purviewCode: "SysSetting",
                code: 12-13,
            }
        ]
    }
];

const setPrdRouter= [
    {
        title: "用户与部门",
        icon: 'orgamanage',
        id: '/index/setting/organ',
        purviewCode: "orga",
        code: 1,
        children: [
            {
                title: "部门",
                icon: 'orgamanage',
                id: '/index/setting/organ',
                purviewCode: "orga",
                code: 1-1,
                
            },
            {
                title: '用户',
                icon: 'usermanage',
                id: '/index/setting/user',
                purviewCode: "user",
                code: 1-2,
            },
            {
                title: '用户组',
                icon: 'usermanage',
                id: '/index/setting/usergroup',
                purviewCode: "user_group",
                code: 1-3,
            },
            {
        
                title: "用户目录",
                icon: 'category',
                id: '/index/setting/directory',
                purviewCode: "user_dir",
                code: 1-4,
            },
        ]
    },
    {
        title: '模板',
        icon: 'systemcenter',
        id: "/index/setting/template",
        code: 14
    },
    {
        title: '权限',
        icon: 'systemcenter',
        id: "/index/setting/systemRole",
        purviewCode: "SysPermission",
        code: 2
    },
    {
        title: "消息",
        icon: 'messagecenter',
        id: '/index/setting/messageNotice',
        purviewCode: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                icon: 'messagecenter',
                id: '/index/setting/messageNotice',
                purviewCode: "SysMessageNotice",
                code: 4-1
            },
            {
                title: '消息发送方式',
                icon: 'messagecenter',
                id: '/index/setting/messageSendType',
                purviewCode: "SysMessageSendType",
                code: 4-2,
            }
        ]
    },
    {
        title: "插件",
        icon: 'plugin',
        id: '/index/setting/plugin',
        purviewCode: "SysPlugin",
        code: 8,
    },
    {
        title: "系统集成",
        icon: 'systemcenter',
        id: '/index/setting/loadData',
        code: 9,
        children: [
            {
                title: '地址配置',
                id: '/index/setting/urlData',
                code: 9-2,
            }
        ]
    },
    {
        title: "安全",
        icon: 'systemcenter',
        id: '/index/setting/log',
        // purviewCode: "SysLog",
        code: 10,
        children: [
            {
                title: '操作日志',
                icon: 'systemcenter',
                id: '/index/setting/logList',
                // purviewCode: "SysLogList",
                code: 10-1,
            }
        ]
    }, 
    {
        title: "版本与许可证",
        icon: 'plugin',
        id: '/index/setting/version',
        purviewCode: "SysVersion",
        code: 11,
    }
];

export  {setDevRouter, setPrdRouter};