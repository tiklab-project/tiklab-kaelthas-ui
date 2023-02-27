/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:01:48
 */
import {service} from "../../../common/utils/requset";

// 请求接口
export function GetWikiList(data){
    return service.request({
        url: "/repository/findRepositoryPage",
        method: "post",
        data
    })
}

export function FindRepositoryList(data){
    return service.request({
        url: "/repository/findRepositoryList",
        method: "post",
        data
    })
}


// 添加知识库
export function AddWikiList(data){
    return service.request({
        url: "/repository/createRepository",
        method: "post",
        data
    })
}

export function DeleWikiList(data){
    return service.request({
        url: "/repository/deleteRepository",
        method: "post",
        data
    })
}

export function UpdateWikiList(data){
    return service.request({
        url: "/repository/updateRepository",
        method: "post",
        data
    })
}
export function SearchWikiList(data){
    return service.request({
        url: "/repository/findRepositoryList",
        method: "post",
        data
    })
}

export function SearchWiki(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}

// 查找所有事项类型
export function GetWikiTypeList(data){
    return service.request({
        url: "/projectType/findAllProjectType",
        method: "post",
        data 
        //请求类型为post 时，
        // params: data 请求类型为get时
    })
}

// 查找所有用户类型
export function GetUseList(data){
    return service.request({
        url: "/user/user/findAllUser",
        method: "post",
        data 
        //请求类型为post 时，
        // params: data 请求类型为get时
    })
}

export function CreateDocumentRecent(data){
    return service.request({
        url: "/documentRecent/createDocumentRecent",
        method: "post",
        data
    })
}


export function FindRecentRepositoryList(data){
    return service.request({
        url: "/repository/findRecentRepositoryList",
        method: "post",
        data 
    })
}

export function CreateRepositoryFocus(data){
    return service.request({
        url: "/repositoryFocus/createRepositoryFocus",
        method: "post",
        data 
    })
}

export function DeleteRepositoryFocusByCondition(data){
    return service.request({
        url: "/repositoryFocus/deleteRepositoryFocusByCondition",
        method: "post",
        data 
    })
}


export function FindRepositoryFocusList(data){
    return service.request({
        url: "/repository/findFocusRepositoryList",
        method: "post",
        data 
    })
}
