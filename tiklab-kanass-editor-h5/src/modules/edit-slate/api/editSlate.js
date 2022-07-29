import {serviceLoc} from "../../../common/untils/request";

export function Upload(data){
    return serviceLoc.request({
        url: "/dfs/upload",
        method: "post",
        data 
    })
}