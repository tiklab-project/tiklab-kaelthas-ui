/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-17 11:14:26
 */
import zhCnTrans from "./cn/translation.json";

import {eam_cn} from "doublekit-eam-ui/es/_utils";
import {privilege_cn} from "doublekit-privilege-ui/es/_utils";
import {message_cn} from "doublekit-message-ui/es/_utils";
import {pluginManage_cn} from "doublekit-plugin-ui/es/_utils";
import {orga_cn} from "doublekit-user-ui/es/_utils" 
const resources = {
    zh: {
        translation: {...zhCnTrans, ...eam_cn, ...privilege_cn, ...message_cn, ...pluginManage_cn, ...orga_cn},
    }
}

export default resources;