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

const Login = AsyncComponent(() => import('./login/Login'))
const Logout = AsyncComponent(() => import('./login/Logout'))
const Home = AsyncComponent(() => import('./home/home/components/Home'))
const ProjectNotFound = AsyncComponent(() => import("./setting/common/ProjectNotFond"))

const Index = AsyncComponent(() => import('./home/home/components/Layout'))
const RepositoryDetail = AsyncComponent(() => import('./repository/common/components/RepositoryLayout'))
const Survey = AsyncComponent(() => import('./repository/overview/components/Survey'))
const DynamicList = AsyncComponent(() => import("./repository/overview/components/DynamicList"))

const LogDetail = AsyncComponent(() => import('./repository/category/CategoryDetail'))


// 知识库
const Repository = AsyncComponent(() => import('./repository/repository/components/RepositoryList'))
const RepositoryAdd = AsyncComponent(() => import('./repository/repository/components/RepositoryAdd'))
const DocumentEdit = AsyncComponent(() => import("./document/document/components/DocumentEdit"))
const DocumnetExamine = AsyncComponent(() => import("./document/document/components/DocumnetExamine"))
const DocumentAddEdit = AsyncComponent(() => import("./document/document/components/DocumentAddEdit"))

const RepositorySet = AsyncComponent(() => import("./repository/setting/common/components/RepositorySet"))
const RepositoryDomainRole = AsyncComponent(() => import('./repository/user/RepositoryDomainRole'))
const RepositoryDomainUser = AsyncComponent(() => import('./repository/user/RepositoryDomainUser'))
const RepositoryBasicInfo = AsyncComponent(() => import('./repository/setting/basicInfo/components/BasicInfo'))
const Template = AsyncComponent(() => import('./setting/template/components/TemplateList'))
const TemplateAdd = AsyncComponent(() => import('./setting/template/components/TemplateAddmodal'))
// 分享文档页面
const ShareDocument = AsyncComponent(() => import('./document/share/components/ShareDocument'))
const SharePage = AsyncComponent(()=> import('./document/share/components/ShareLayout'))
const ShareCategory = AsyncComponent(() => import('./document/share/components/PassWord'))
const ShareCategoryDetail = AsyncComponent(() => import('./document/share/components/ShareCategoryDetail'))
// 分享文档页面
const PassWord = AsyncComponent(() => import('./document/share/components/PassWord'))


const LoadData = AsyncComponent(() => import('./setting/loadData/LoadData'))

// 消息
const ProjectMessageSendType = AsyncComponent(() => import('./setting/message/ProjectMessageSendType'))
const ProjectMessageType = AsyncComponent(() => import('./setting/message/ProjectMessageType'))
const ProjectMessageTemplate = AsyncComponent(() => import('./setting/message/ProjectMessageTemplate'))
const ProjectMessageManagement = AsyncComponent(() => import('./setting/message/ProjectMessageManagement'))
const ProjectMessageNotice = AsyncComponent(() => import('./setting/message/ProjectMessageNotice'))
const ProjectMessageNoticeSystem = AsyncComponent(() => import('./setting/message/ProjectMessageNoticeSystem'))

const Setting = AsyncComponent(() => import('./setting/common/Setting'))
const ProjectPlugin = AsyncComponent(() => import('./setting/plugins/ProjectPlugin'))

const SystemFeature = AsyncComponent(() => import('./setting/privilege/SystemFeature'))
const SystemRoleBuilt = AsyncComponent(() => import('./setting/privilege/SystemRoleBuilt'))
const SystemRole = AsyncComponent(() => import('./setting/privilege/SystemRole'))
const ProjectFeature = AsyncComponent(() => import('./setting/privilege/ProjectFeature'))
const ProjectRole = AsyncComponent(() => import('./setting/privilege/ProjectRole'))

//组织用户
const OrgaContent = AsyncComponent(() => import('./setting/orga/Orga'))
const OrgaUser = AsyncComponent(() => import('./setting/orga/User'))
const ProjectDirectory = AsyncComponent(() => import("./setting/user/ProjectDirectory"))
const ProjectUserGroup = AsyncComponent(() => import("./setting/user/ProjectUserGroup"))
const ProjectSystemUserGroup = AsyncComponent(() => import("./setting/user/ProjectSystemUserGroup"))

// 系统集成
const UrlData = AsyncComponent(() => import('./setting/systemIntegration/components/UrlData'));

//工时
const TaskListContent = AsyncComponent(() => import('./setting/todo/TaskList.js'))
const TodoTempListContent = AsyncComponent(() => import('./setting/todo/TodoTempList'))
const MyTodoTaskContent = AsyncComponent(() => import('./setting/todo/MyTodoTask'))
const TodoTypeListContent = AsyncComponent(() => import('./setting/todo/TodoTypeList'))

const LogList = AsyncComponent(() => import('./setting/log/Log.js'))
const LogTemplateList = AsyncComponent(() => import('./setting/log/MyLogTemplateList'))
const ProjectLogTypeList = AsyncComponent(() => import('./setting/log/LogTypeList'))

const LicenceVersion = AsyncComponent(() => import('./setting/version/Version'))
const VailProductUserPage =  AsyncComponent(() => import('./login/VaildProductUserPage'))

const Routes = [
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
        path: "/no-auth",
        exact: true,
        component: VailProductUserPage,
    },
    {
        path: "/share/:shareId",
        component: SharePage,
        routes: [
              {
                    path: "/share/:shareId/doc/:id",
                    component: ShareDocument,
                },
                {
                    path: "/share/:shareId/category/:id",
                    component: ShareCategoryDetail,
                },
                
        ]
    },
    {
        path: "/passWord/:shareId",
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
                path:"/index/404",
                exact: true,
                component: ProjectNotFound,
                key: 'NotFound'
            },
            {
                path: "/index/repository",
                exact: true,
                component: Repository,
                key: 'repository'

            },
            {
                path: "/index/repositoryAdd",
                exact: true,
                component: RepositoryAdd,
                key: 'home'
            },
            {
                path: "/index/template",
                exact: true,
                component: Template,
                key: 'template'
            },
            {
                path: "/index/repositorydetail/:repositoryId",
                component: RepositoryDetail,
                routes: [
                    {
                        path: "/index/repositorydetail/:repositoryId/survey",
                        component: Survey
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/dynamicList",
                        component: DynamicList
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/doc/:id",
                        component: DocumnetExamine
                    },{
                        path: "/index/repositorydetail/:repositoryId/add/:id",
                        component: DocumentAddEdit
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/docEdit/:id",
                        component: DocumentEdit
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/folder/:id",
                        component: LogDetail
                    },
                    // {
                    //     path: "/index/repositorydetail/:repositoryId/mindmap/:id",
                    //     component: BrainMap
                    // },
                    // {
                    //     path: "/index/repositorydetail/:repositoryId/mindmapEdit/:id",
                    //     component: DocumentMindMapEdit
                    // },
                    // {
                    //     path: "/index/repositorydetail/:repositoryId/brainMap",
                    //     component: BrainMap
                    // },
                    {
                        path: "/index/repositorydetail/:repositoryId/repositorySet",
                        component: RepositorySet,
                        routes: [
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/basicInfo",
                                component: RepositoryBasicInfo
                            },
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/user",
                                component: RepositoryDomainUser,
                                exact: true
                            },
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/domainRole",
                                component: RepositoryDomainRole
                            }
                        ]
                    },
                    
                ]
            },
            {
                path: "/index/repositorySet/:repositoryId",
                component: RepositorySet,
                routes: [
                    {
                        path: "/index/repositorySet/:repositoryId/basicInfo",
                        component: RepositoryBasicInfo
                    },
                    {
                        path: "/index/repositorySet/:repositoryId/user",
                        component: RepositoryDomainUser,
                        exact: true
                    },
                    {
                        path: "/index/repositorySet/:repositoryId/domainRole",
                        component: RepositoryDomainRole
                    }
                ]
            },
            {
                path: "/index/repositorySet/:repositoryId/basicInfo",
                component: RepositoryBasicInfo
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
                        path: "/index/setting/loadData",
                        component: LoadData,
                        exact: true
                    },
                    {
                        path: "/index/setting/plugin",
                        component: ProjectPlugin,
                        exact: true
                    },
                    {
                        path: "/index/setting/urlData",
                        component: UrlData,
                        exact: true
                    },
                    {
                        path: "/index/setting/version",
                        component: LicenceVersion,
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
export default Routes;