/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 13:42:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 14:15:08
 */
import ExampleEditor from "./modules/example/index";
import ForcedLayoutExample from "./modules/example/layoutExample"
const routes=[
    {
        path: "/",
        exact: true,
        component: ExampleEditor,
    },
    {
        path: "/example",
        exact: true,
        component: ForcedLayoutExample,
    }
]

export default routes;