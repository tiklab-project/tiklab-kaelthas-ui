import {service} from "../../../common/utils/requset";


export function GetMonitorList(data){
    return service.request({
        url: "/Monitor/findAllUser",
        method: "post",
        data
    })
}