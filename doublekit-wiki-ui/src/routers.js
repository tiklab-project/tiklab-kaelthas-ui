/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 08:59:04
 */
import AsyncComponent from './common/lazy/SyncComponent'
import { Redirect } from "react-router-dom";

const Login = AsyncComponent(() => import('./modules/login/login'))
const Logout = AsyncComponent(() => import('./modules/login/logout'))
const Home = AsyncComponent(() => import('./modules/home/components/home'))
const Index = AsyncComponent(() => import('./modules/home/index'))
const WikiDetail = AsyncComponent(() => import('./modules/wiki/common/containers/wikiDetail'))
const LogDetail = AsyncComponent(()=> import('./modules/wiki/common/components/logDetail'))
const BrainMap = AsyncComponent(()=> import('./modules/wiki/brainMapFlow/brainMapFlowDetail'))


// 知识库
const wiki = AsyncComponent(() => import('./modules/wiki/wiki/containers/wiki'))
const DocumentDetail = AsyncComponent(() => import('./modules/wiki/common/components/documentDetail'))
const WikiDomainRole = AsyncComponent(() => import('./modules/wiki/common/components/wikiDomainRole'))
const WikiDomainUser = AsyncComponent(() => import('./modules/wiki/common/components/wikiDomainUser'))

const Template = AsyncComponent(() => import('./modules/template/container/template'))

// 分享文档页面
const ShareDocument = AsyncComponent(() => import('./modules/share/shareDocument'))
// 分享文档页面
const PassWord = AsyncComponent(() => import('./modules/share/passWord'))


const SystemFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/systemFeature'))
const SystemRole = AsyncComponent(() => import('./modules/sysmgr/privilege/systemRole'))
const ProjectFeature = AsyncComponent(() => import('./modules/sysmgr/privilege/projectFeature'))
const ProjectRole = AsyncComponent(() => import('./modules/sysmgr/privilege/projectRole'))

const Sysmgr = AsyncComponent(() => import('./modules/sysmgr/common/containers/orga'))
const DocumentEditor = AsyncComponent(() => import('./modules/wiki/common/components/edit-slate/editor'))

// 导入外部数据
const LoadData = AsyncComponent(() => import('./modules/sysmgr/common/loadData/loadData'))
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
        path: "/DocumentEditor",
        exact: true,
        component: DocumentEditor,
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
                path: "/index/wikidetail",
                component: WikiDetail,
                routes: [
                    {
                        path: "/index/wikidetail/doc/:id",
                        component: DocumentDetail
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
                ]
            }
        ]
            
    },
    {
        path: "/",
        component: Index,
        exact: true
    },
]
export default routes;