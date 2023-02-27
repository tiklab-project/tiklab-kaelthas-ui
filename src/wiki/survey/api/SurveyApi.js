import {service} from "../../../common/utils/requset";

export function FindRepository(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}

export function Findlogpage (data){
    return service.request({
        url: "/oplog/findlogpage",
        method: "post",
        data 
    })
}