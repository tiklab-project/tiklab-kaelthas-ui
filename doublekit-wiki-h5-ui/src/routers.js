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
const Wiki = AsyncComponent(() => import("./modules/wiki/components/wiki"));
const WikiTabBar = AsyncComponent(() => import("./modules/homes/tabBar"))
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
        path: "/",
        exact: true,
        component: () => <Redirect to="/index/login" />,
    }
]
export default routes;