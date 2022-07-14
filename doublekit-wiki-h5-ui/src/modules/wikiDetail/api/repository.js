import {service} from "../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindWikiCatalogue(data){
    return service.request({
        url: "/category/findCategoryListTree",
        method: "post",
        data
    })
}

//知识库详情
export function FindRepository(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}

//知识库详情
export function CreateCategory(data){
    return service.request({
        url: "/category/createCategory",
        method: "post",
        data
    })
}

// 删除文档
export function DeleteDocument(data){
    return service.request({
        url: "/document/deleteDocument",
        method: "post",
        data
    })
}

// 删除目录
export function DeleteCategory(data){
    return service.request({
        url: "/category/deleteCategory",
        method: "post",
        data
    })
}

// 获取模板列表
export function FindDocumentTemplatePage(data){
    return service.request({
        url: "/documentTemplate/findDocumentTemplatePage",
        method: "post",
        data
    })
}

export function CreateDocument(data){
    return service.request({
        url: "/document/createDocument",
        method: "post",
        data
    })
}

//更新目录
export function UpdateCategory(data){
    return service.request({
        url: "/category/updateCategory",
        method: "post",
        data
    })
}

 // 更新文档
 export function UpdateDocument(data){
    return service.request({
        url: "/document/updateDocument",
        method: "post",
        data
    })
}