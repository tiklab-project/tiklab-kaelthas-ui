/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-17 11:14:26
 */
import zhCnTrans from "./cn/translation.json";

import {eam_cn} from "tiklab-eam-ui/es/utils";
import {message_cn} from "tiklab-message-ui/es/utils";
import pluginManage_cn from "tiklab-plugin-manager-ui/es/utils/language";
import {oplog_cn} from "tiklab-security-ui/es/utils";
import { todoTask_cn } from "tiklab-todotask-ui/es/utils";
import { user_cn } from "tiklab-user-ui/es/utils";
import {privilege_cn} from "tiklab-privilege-ui/es/utils";
const resources = {
    zh: {
        translation: {...zhCnTrans, ...eam_cn, ...message_cn, ...pluginManage_cn, ...user_cn, ...oplog_cn, ...todoTask_cn, ...privilege_cn},
    }
}

export default resources;