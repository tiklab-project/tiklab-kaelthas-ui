/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 08:59:04
 */

import HomePage from "./index/HomePage";
import Configuration from "./index/Configuration";
import App from "./App";
import PopUp from "./index/PopUp";

const Routes = [
    {
        path: "/",
        exact: true,
        component: HomePage,
    },{
        path: "/Configuration",
        exact: true,
        component: Configuration,
    },{
        path: "/App",
        exact: true,
        component: App,
    },

    {
        path: "/Configuration/PopUp",
        exact: false,
        component: PopUp,
    },


]
export default Routes;