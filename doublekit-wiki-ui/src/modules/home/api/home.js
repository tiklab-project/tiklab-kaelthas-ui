/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-11-22 14:02:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-11-23 09:13:59
 */
import {service} from "../../../common/utils/requset";


export function FindDocumentList(data){
    return service.request({
        url: "/document/findDocumentList",
        method: "post",
        data 
    })
}

export function FindDocumentRecentList(data){
    return service.request({
        url: "/documentRecent/findDocumentRecentList",
        method: "post",
        data 
    })
}

