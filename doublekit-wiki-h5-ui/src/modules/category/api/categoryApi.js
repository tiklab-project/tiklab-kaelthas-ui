import {service} from "../../../common/utils/requset";

// 根据id 查找目录的第一级文档
export function FindCategoryDocument(data){
    return service.request({
        url: "/category/findCategoryDocument",
        method: "post",
        data
    })
}

export function FindCategory(data){
    return service.request({
        url: "/category/findCategory",
        method: "post",
        data
    })
}

export function FindDocument(data){
    return service.request({
        url: "/document/findDocument",
        method: "post",
        data
    })
}

export function UpdateDocument(data){
    return service.request({
        url: "/document/updateDocument",
        method: "post",
        data
    })
}