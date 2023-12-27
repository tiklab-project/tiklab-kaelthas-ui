/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 08:59:04
 */

import HelloWord from "./index/HelloWord";
import Configuration from "./index/Configuration";

const Routes = [
    {
        path: "/HelloWord",
        exact: true,
        component: HelloWord,
    },{
        path: "/Configuration",
        exact: true,
        component: Configuration,
    },

]
export default Routes;