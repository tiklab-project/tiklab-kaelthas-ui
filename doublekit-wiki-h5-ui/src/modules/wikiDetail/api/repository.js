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