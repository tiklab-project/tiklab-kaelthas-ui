/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 08:59:04
 */
import React from 'react';
import AsyncComponent from './common/lazy/SyncComponent'
import { Redirect } from "react-router-dom";

const Login = AsyncComponent(() => import('./modules/login/login'))
const Logout = AsyncComponent(() => import('./modules/login/logout'))
const Home = AsyncComponent(() => import('./modules/home/components/home'))
const Index = AsyncComponent(() => import('./modules/home/components/portal'))
const WikiDetail = AsyncComponent(() => import('./modules/wiki/common/components/wikiDetail'))
const Survey = AsyncComponent(() => import('./modules/wiki/survey/containers/survey'))
const DynamicList = AsyncComponent(() => import("./modules/home/components/dynamicList"))

const LogDetail = AsyncComponent(() => import('./modules/wiki/common/components/logDetail'))
const BrainMap = AsyncComponent(() => import('./modules/wiki/brainMapFlow/components/brainMapFlowExamine'))
const DocumentMindMapEdit = AsyncComponent(() => import('./modules/wiki/brainMapFlow/components/brainMapFlowEdit'))

// 知识库
const wiki = AsyncComponent(() => import('./modules/wiki/wiki/components/wikiList'))
const DocumentEdit = AsyncComponent(() => import("./modules/wiki/document/components/documentEdit"))
const DocumnetExamine = AsyncComponent(() => import("./modules/wiki/document/components/documnetExamine"))
const DocumentAddEdit = AsyncComponent(() => import("./modules/wiki/document/components/documentAddEdit"))

const WikiSet = AsyncComponent(() => import("./modules/wikiSet/common/containers/wikiSet"))
const WikiDomainRole = AsyncComponent(() => import('./modules/wiki/user/wikiDomainRole'))
const WikiDomainUser = AsyncComponent(() => import('./modules/wiki/user/wikiDomainUser'))
const WikiBasicInfo = AsyncComponent(() => import('./modules/wikiSet/basic-info/containers/basicInfo'))
const Template = AsyncComponent(() => import('./modules/template/components/template'))
const TemplateAdd = AsyncComponent(() => import('./modules/template/components/templateAddmodal'))
// 分享文档页面
const ShareDocument = AsyncComponent(() => import('./modules/share/components/shareDocument'))
// 分享文档页面
const PassWord = AsyncComponent(() => import('./modules/share/components/passWord'))


const LoadData = AsyncComponent(() => import('./modules/sysmgr/load-data/loadData'))

// 消息
const ProjectMessageSendType = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageSendType'))
const ProjectMessageType = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageType'))
const ProjectMessageTemplate = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageTemplate'))
const ProjectMessageManagement = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageManagement'))
const ProjectMessageNotice = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageNotice'))
const ProjectMessageNoticeSystem = AsyncComponent(() => import('./modules/sysmgr/message/projectMessageNoticeSystem'))

const Setting = AsyncComponent(() => import('./modules/sysmgr/common/containers/setting'))
const ProjectPlugin = AsyncComponent(() => import('./modules/sysmgr/plugin/projectPlugin'))

const SystemFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/systemFeature'))
const SystemRoleBuilt = AsyncComponent(() => import('./modules/sysmgr/privilege/systemRoleBuilt'))
const SystemRole = AsyncComponent(() => import('./modules/sysmgr/privilege/systemRole'))
const ProjectFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/projectFeature'))
const ProjectRole = AsyncComponent(() => import('./modules/sysmgr/privilege/projectRole'))

//组织用户
const OrgaContent = AsyncComponent(() => import('./modules/sysmgr/orga/orga'))
const OrgaUser = AsyncComponent(() => import('./modules/sysmgr/orga/user'))
const ProjectDirectory = AsyncComponent(() => import("./modules/sysmgr/user/projectDirectory"))
const ProjectUserGroup = AsyncComponent(() => import("./modules/sysmgr/user/projectUserGroup"))
const ProjectSystemUserGroup = AsyncComponent(() => import("./modules/sysmgr/user/projectSystemUserGroup"))


//工时
const TaskListContent = AsyncComponent(() => import('./modules/sysmgr/todo/taskList.js'))
const TodoTempListContent = AsyncComponent(() => import('./modules/sysmgr/todo/todoTempList'))
const MyTodoTaskContent = AsyncComponent(() => import('./modules/sysmgr/todo/myTodoTask'))
const TodoTypeListContent = AsyncComponent(() => import('./modules/sysmgr/todo/todoTypeList'))

const LogList = AsyncComponent(() => import('./modules/sysmgr/log/log.js'))
const LogTemplateList = AsyncComponent(() => import('./modules/sysmgr/log/myLogTemplateList'))
const ProjectLogTypeList = AsyncComponent(() => import('./modules/sysmgr/log/logTypeList'))

const LicenceVersion = AsyncComponent(() => import('./modules/sysmgr/version/version'))

const routes = [
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/logout",
        exact: true,
        component: Logout,
    },
    {
        path: "/shareDocument/:id/:shareId",
        exact: true,
        component: ShareDocument,
    },
    {
        path: "/passWord/:id/:shareId",
        exact: true,
        component: PassWord,
    },
    {
        path: "/index",
        component: Index,
        routes: [
            {
                path: "/index/home",
                exact: true,
                component: Home,
                key: 'home'
            },
            {
                path: "/index/dynamic",
                exact: true,
                component: DynamicList,
                key: 'dynamic'
            },
            {
                path: "/index/wiki",
                exact: true,
                component: wiki,
                key: 'wiki'

            },
            {
                path: "/index/template",
                exact: true,
                component: Template,
                key: 'template'
            },
            {
                path: "/index/wikidetail/:wikiId",
                component: WikiDetail,
                routes: [
                    {
                        path: "/index/wikidetail/:wikiId/survey",
                        component: Survey
                    },
                    {
                        path: "/index/wikidetail/:wikiId/dynamicList",
                        component: DynamicList
                    },
                    {
                        path: "/index/wikidetail/:wikiId/doc/:id",
                        component: DocumnetExamine
                    },{
                        path: "/index/wikidetail/:wikiId/add/:id",
                        component: DocumentAddEdit
                    },
                    {
                        path: "/index/wikidetail/:wikiId/docEdit/:id",
                        component: DocumentEdit
                    },
                    {
                        path: "/index/wikidetail/:wikiId/folder/:id",
                        component: LogDetail
                    },
                    {
                        path: "/index/wikidetail/:wikiId/mindmap/:id",
                        component: BrainMap
                    },
                    {
                        path: "/index/wikidetail/:wikiId/mindmapEdit/:id",
                        component: DocumentMindMapEdit
                    },
                    {
                        path: "/index/wikidetail/:wikiId/brainMap",
                        component: BrainMap
                    },
                    {
                        path: "/index/wikidetail/:wikiId/wikiSet",
                        component: WikiSet,
                        routes: [
                            {
                                path: "/index/wikidetail/:wikiId/wikiSet/basicInfo",
                                component: WikiBasicInfo
                            },
                            {
                                path: "/index/wikidetail/:wikiId/wikiSet/user",
                                component: WikiDomainUser,
                                exact: true
                            },
                            {
                                path: "/index/wikidetail/:wikiId/wikiSet/domainRole",
                                component: WikiDomainRole
                            }
                        ]
                    },
                    
                ]
            },
            {
                path: "/index/wikiSet/:wikiId",
                component: WikiSet,
                routes: [
                    {
                        path: "/index/wikiSet/:wikiId/basicInfo",
                        component: WikiBasicInfo
                    },
                    {
                        path: "/index/wikiSet/:wikiId/user",
                        component: WikiDomainUser,
                        exact: true
                    },
                    {
                        path: "/index/wikiSet/:wikiId/domainRole",
                        component: WikiDomainRole
                    }
                ]
            },
            {
                path: "/index/wikiSet/:wikiId/basicInfo",
                component: WikiBasicInfo
            },
            {
                path: "/index/setting",
                component: Setting,
                key: 'Setting',
                routes: [
                    {
                        path: "/index/setting/organ",
                        component: OrgaContent,
                        exact: true
                    },
                    {
                        path: "/index/setting/template",
                        exact: true,
                        component: Template,
                        key: 'template'
                    },
                    {
                        path: "/index/setting/templateAdd",
                        component: TemplateAdd,
                        exact: true
                    },
                    {
                        path: "/index/setting/templateView/:templateId",
                        component: TemplateAdd,
                        exact: true
                    },
                    {
                        path: "/index/setting/user",
                        component: OrgaUser,
                        exact: true
                    },
                    {
                        path: "/index/setting/directory",
                        component: ProjectDirectory,
                        exact: true
                    },
                    {
                        path: "/index/setting/usergroup",
                        component: ProjectUserGroup,
                        exact: true
                    },
                    {
                        path: "/index/setting/usersystemgroup",
                        component: ProjectSystemUserGroup,
                        exact: true
                    },
                    // 系统功能管理
                    {
                        path: "/index/setting/systemFeature",
                        component: SystemFeature,
                        exact: true
                    },
                    // 系统内置角色管理
                    {
                        path: "/index/setting/systemRoleBuilt",
                        component: SystemRoleBuilt,
                        exact: true
                    },
                    // 系统角色管理
                    {
                        path: "/index/setting/systemRole",
                        component: SystemRole,
                        exact: true
                    },
                    // 项目功能管理
                    {
                        path: "/index/setting/projectFeature",
                        component: ProjectFeature,
                        exact: true
                    },
                    // 项目角色管理
                    {
                        path: "/index/setting/projectRole",
                        component: ProjectRole,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageManagement",
                        component: ProjectMessageManagement,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageNotice",
                        component: ProjectMessageNotice,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageNoticeSystem",
                        component: ProjectMessageNoticeSystem,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageTemplate",
                        component: ProjectMessageTemplate,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageType",
                        component: ProjectMessageType,
                        exact: true
                    },
                    {
                        path: "/index/setting/messageSendType",
                        component: ProjectMessageSendType,
                        exact: true
                    },

                    {
                        path: "/index/setting/taskList",
                        component: TaskListContent,
                        exact: true
                    },
                    {
                        path: "/index/setting/myTodoTask",
                        component: MyTodoTaskContent,
                        exact: true
                    },
                    {
                        path: "/index/setting/todoTypeTask",
                        component: TodoTypeListContent,
                        exact: true
                    },
                    {
                        path: "/index/setting/todoTempList",
                        component: TodoTempListContent,
                        exact: true
                    },
                    {
                        path: "/index/setting/logList",
                        component: LogList,
                        exact: true
                    },
                    {
                        path: "/index/setting/myLogTemplateList",
                        component: LogTemplateList,
                        exact: true
                    },
                    {
                        path: "/index/setting/projectLogTypeList",
                        component: ProjectLogTypeList,
                        exact: true
                    },
                    {
                        path: "/index/setting/version",
                        component: LicenceVersion,
                        exact: true
                    },
                    {
                        path: "/index/setting/loadData",
                        component: LoadData,
                        exact: true
                    },
                    {
                        path: "/index/setting/plugin",
                        component: ProjectPlugin,
                        exact: true
                    }
                ]
            },
        ]

    },
    {
        path: "/",
        component: () => <Redirect to="/index/home" />,
        exact: true
    },
]
export default routes;