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
const Index = AsyncComponent(() => import('./modules/home/components/portal.js'))
const WikiDetail = AsyncComponent(() => import('./modules/wiki/common/components/wikiDetail'))
const LogDetail = AsyncComponent(()=> import('./modules/wiki/common/components/logDetail'))
const BrainMap = AsyncComponent(()=> import('./modules/wiki/brainMapFlow/components/brainMapFlowExamine'))
const DocumentMindMapEdit = AsyncComponent(() => import('./modules/wiki/brainMapFlow/components/brainMapFlowEdit'))

// 知识库
const wiki = AsyncComponent(() => import('./modules/wiki/wiki/components/wiki'))
const DocumentDetail = AsyncComponent(() => import('./modules/wiki/common/components/documentDetail'))
const DocumentEdit = AsyncComponent(() => import("./modules/wiki/common/components/documentEdit"))
const DocumnetExamine = AsyncComponent(() => import("./modules/wiki/common/components/documnetExamine"))

const WikiDomainRole = AsyncComponent(() => import('./modules/wiki/user/wikiDomainRole'))
const WikiDomainUser = AsyncComponent(() => import('./modules/wiki/user/wikiDomainUser'))

const Template = AsyncComponent(() => import('./modules/template/components/template'))

// 分享文档页面
const ShareDocument = AsyncComponent(() => import('./modules/share/components/shareDocument'))
// 分享文档页面
const PassWord = AsyncComponent(() => import('./modules/share/components/passWord'))


const SystemFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/systemFeature'))
const SystemRole = AsyncComponent(() => import('./modules/sysmgr/privilege/systemRole'))
const ProjectFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/projectFeature'))
const ProjectRole = AsyncComponent(() => import('./modules/sysmgr/privilege/projectRole'))

const Sysmgr = AsyncComponent(() => import('./modules/sysmgr/common/containers/setting'))

// 导入外部数据


const WikiLicence = AsyncComponent(() => import('./modules/sysmgr/licence/wikiLicence'))
const WikiPlugin = AsyncComponent(() => import('./modules/sysmgr/plugin/wikiPlugin.js'))
const Oragn = AsyncComponent(()=> import("./modules/sysmgr/common/containers/organ"))
const OrgaContent = AsyncComponent(() => import('./modules/sysmgr/orga/orga'))
const OrgaUser = AsyncComponent(() => import('./modules/sysmgr/orga/user'))
const WikiDirectory = AsyncComponent(() => import('./modules/sysmgr/orga/wikiDirectory'))
const LoadData = AsyncComponent(() => import('./modules/sysmgr/loadData/components/loadData'))

const WikiUserMessage = AsyncComponent(() => import('./modules/sysmgr/message/wikiUserMessage'))
const WikiMessageSendType = AsyncComponent(() => import('./modules/sysmgr/message/wikiMessageSendType'))
const WikiMessageType = AsyncComponent(() => import('./modules/sysmgr/message/wikiMessageType'))
const WikiMessageTemplate = AsyncComponent(() => import('./modules/sysmgr/message/wikiMessageTemplate'))
const WikiMessageManagement = AsyncComponent(() => import('./modules/sysmgr/message/wikiMessageManagement'))

const routes=[
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
                path: "/index/userMessage",
                exact: true,
                component: WikiUserMessage,
                key: 'userMessage'
            },
            {
                path: "/index/wikidetail",
                component: WikiDetail,
                routes: [
                    {
                        path: "/index/wikidetail/doc/:id",
                        component: DocumnetExamine
                    },
                    {
                        path: "/index/wikidetail/docEdit/:id",
                        component: DocumentEdit
                    },
                    {
                        path: "/index/wikidetail/folder/:id",
                        component: LogDetail
                    },
                    {
                        path: "/index/wikidetail/mindmap/:id",
                        component: BrainMap
                    },
                    {
                        path: "/index/wikidetail/mindmapEdit/:id",
                        component: DocumentMindMapEdit
                    },
                    {
                        path: "/index/wikidetail/wikiDomainRole",
                        component: WikiDomainRole
                    },
                    {
                        path: "/index/wikidetail/wikiDomainUser",
                        component: WikiDomainUser
                    },
                    
                    {
                        path: "/index/wikidetail/brainMap",
                        component: BrainMap
                    }
                ]
            },
            {
                // 系统功能管理
                path: "/index/sysmgr",
                component: Sysmgr,
                routes: [
                    {
                        path: "/index/sysmgr/systemFeature",
                        component: SystemFeature,
                        exact: true
                    },
                    // 系统角色管理
                    {
                        path: "/index/sysmgr/systemRole",
                        component: SystemRole,
                        exact: true
                    },
                    // 项目功能管理
                    {
                        path: "/index/sysmgr/projectFeature",
                        component: ProjectFeature,
                        exact: true
                    },
                    // 项目角色管理
                    {
                        path: "/index/sysmgr/projectRole",
                        component: ProjectRole,
                        exact: true
                    },
                    // 导入数据
                    {
                        path: "/index/sysmgr/loadData",
                        component: LoadData,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/template",
                        component: Template,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/licence",
                        component: WikiLicence,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/plugin",
                        component: WikiPlugin,
                        exact: true
                    },

                    {
                        path: "/index/sysmgr/messageManagement",
                        component: WikiMessageManagement,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/messageTemplate",
                        component: WikiMessageTemplate,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/messageType",
                        component: WikiMessageType,
                        exact: true
                    },
                    {
                        path: "/index/sysmgr/messageSendType",
                        component: WikiMessageSendType,
                        exact: true
                    },
                ]
            },
            {
                path: "/index/organ",
                component: Oragn,
                key: 'organ',
                routes: [
                    {
                        path: "/index/organ/organ",
                        component: OrgaContent,
                        exact: true
                    },
                    {
                        path: "/index/organ/user",
                        component: OrgaUser,
                        exact: true
                    },
                    {
                        path: "/index/organ/directory",
                        component: WikiDirectory,
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