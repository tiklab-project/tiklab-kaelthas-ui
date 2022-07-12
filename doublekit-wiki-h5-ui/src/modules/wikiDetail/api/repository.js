import {service} from "../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindWikiCatalogue(data){
    return service.request({
        url: "/category/findCategoryListTree",
        method: "post",
        data
    })
}