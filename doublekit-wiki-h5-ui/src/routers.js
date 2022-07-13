/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-03-16 13:43:46
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-25 11:38:30
 */
import React from "react";
import AsyncComponent from './common/lazy/SyncComponent'
import { Redirect } from "react-router-dom";

const Login = AsyncComponent(() => import('./modules/login/login'));
const User = AsyncComponent(() => import("./modules/user/user"));
const Wiki = AsyncComponent(() => import("./modules/wiki/components/wikiRepository"));
const WikiTabBar = AsyncComponent(() => import("./modules/homes/tabBar"));
const WikiRepositoryAdd = AsyncComponent(() => import("./modules/wiki/components/wikiRepositoryAdd"))

const RepositoryDetail = AsyncComponent(() => import("./modules/wikiDetail/components/repositoryDetail"))
const CategoryList = AsyncComponent(() => import("./modules/category/components/categoryList"))
const RepositoryLogAdd = AsyncComponent(() => import("./modules/wikiDetail/components/repositoryLogAdd"))
const DocumentView = AsyncComponent(() => import("./modules/category/components/documentView"))
const WikiDocumentEdit = AsyncComponent(() => import("./modules/category/components/documentEdit"))
const Template = AsyncComponent(() => import("./modules/template/container/template"))
const TemplatePreview = AsyncComponent(() => import("./modules/template/components/templatePreview"))
const TemplateAdd = AsyncComponent(()=> import("./modules/template/components/templateAdd"))
const routes = [
    {
        path: "/index",
        component: WikiTabBar,
        routes: [
            {
                path: "/index/login",
                exact: true,
                component: Login,
                key: 'Login'
            },
            {
                path: "/index/user",
                exact: true,
                component: User,
                key: 'User'
            },
            {
                path: "/index/wiki",
                exact: true,
                component: Wiki,
                key: 'Wiki'
            },
        ]
    },
    {
        path: "/wiki",
        component: WikiRepositoryAdd,
        routes: [
            {
                path: "/wiki/add",
                exact: true,
                component: WikiRepositoryAdd,
                key: 'WikiRepositoryAdd'
            },
        ]
    },
    {
        path: "/repositoryDetail/:id",
        component: RepositoryDetail,
        key: 'RepositoryDetail'
    },
    {
        path: "/repositoryLogAdd/:id",
        component: RepositoryLogAdd,
        key: 'RepositoryLogAdd'
    },
    {
        path: "/categoryList/:resid/:id",
        component: CategoryList,
        key: 'CategoryList'
    },
    {
        path: "/document/:id",
        component: DocumentView,
        key: 'DocumentView'
    },
    {
        path: "/documentedit/:id",
        component: WikiDocumentEdit,
        key: 'WikiDocumentEdit'
    },
    {
        path: "/template",
        component: Template,
        key: 'Template'
    },
    {
        path: "/templatePreview/:id",
        component: TemplatePreview,
        key: 'TemplatePreview'
    },
    {
        path: "/templateAdd",
        component: TemplateAdd,
        key: 'TemplateAdd'
    },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/index/login" />,
    }
]
export default routes;