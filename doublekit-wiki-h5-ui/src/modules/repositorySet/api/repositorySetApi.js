import {service} from "../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindRepository(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}
