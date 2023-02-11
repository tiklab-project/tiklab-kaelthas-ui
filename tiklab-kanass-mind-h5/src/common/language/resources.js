/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-17 11:14:26
 */
import zhCnTrans from "./cn/translation.json";

import {portal_cn, portal_en} from "tiklab-frame-ui";
import {form_cn, form_en} from 'tiklab-form-ui'
import {flow_cn, flow_en} from 'tiklab-flow-ui'
import{privilege_en,privilege_cn} from "tiklab-privilege-ui"
import {message_cn, message_en} from 'tiklab-message-ui';
import {orga_cn, orga_en} from 'tiklab-user-ui';
const resources = {
    zh: {
        translation: {...zhCnTrans, ...portal_cn, ...form_cn, ...flow_cn, ...privilege_cn,...message_cn, ...orga_cn},
    },
    // en: {
    //     translation: {...portal_en, ...form_en, ...flow_en,...message_en, ...orga_en},
    // }
}

export default resources;