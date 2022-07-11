/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-17 11:14:26
 */
import zhCnTrans from "./cn/translation.json";
import eam_cn from "doublekit-eam-ui/es/_utils/language";
const resources = {
    zh: {
        translation: {...zhCnTrans,...eam_cn},
    },
    // en: {
    //     translation: {...portal_en, ...form_en, ...flow_en,...message_en, ...orga_en},
    // }
}

export default resources;