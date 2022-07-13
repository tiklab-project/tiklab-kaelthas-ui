
import {service} from "../../../common/utils/requset";


export function FindRepositoryPage(data){
    return service.request({
        url: "/repository/findRepositoryPage",
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
export function AddWikiList(data){
    return service.request({
        url: "/repository/createRepository",
        method: "post",
        data
    })
}




