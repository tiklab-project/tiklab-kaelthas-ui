import {service} from "../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindCategory(data){
    return service.request({
        url: "/category/findCategory",
        method: "post",
        data
    })
}
export function UpdateCategory(data){
    return service.request({
        url: "/category/updateCategory",
        method: "post",
        data
    })
}
// 查找所有用户类型
export function FindAllUser(data){
    return service.request({
        url: "/user/findAllUser",
        method: "post",
        data 
    })
}