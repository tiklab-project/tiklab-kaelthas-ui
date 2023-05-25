import { observable, action} from "mobx";
import { Service } from "../../../common/utils/requset";
export class WorkStore {
    @observable projectList = [];
    @observable userList = [];
    @observable userList = [];
    @observable workTypeList = [];
    @observable workList = [];
    @observable searchCondition = {
        pageParam: {
            pageSize: 10,
            currentPage: 1
        }
    }
    @observable total = 0
    @action
    findAllProject = async() => {
        const data = await Service("/wikiProject/findAllProject")
        if(data.code === 0){
            this.projectList = data.data;
        }
        return data;
    }

    @action
    findDmUserPage = async(value) => {
        const params = {
            domainId: value.domainId,
            pageParam: {
                pageSize: 20,
                currentPage: 1
            }
        }
        const data = await Service("/wikiProject/findDmUserList",params);
        if(data.code === 0){
            const list = data.data;
            const newList = [];
            const newIds = [];
            list.map(item => {
                if(newIds.indexOf(item.id)> -1){
                    return null
                }else {
                    newIds.push(item.id)
                    newList.push(item)
                }
            })
            this.userList = newList;
        }
        return data.data
    }

    @action
    findWorkTypeDmList = async(params) => {
        const data = await Service("/wikiProject/findWorkTypeList", params)
        if(data.code === 0){
            this.workTypeList = data.data;
        }
        return data;
    }

    @action
    findWorkItemList = async(params) => {
        Object.assign(this.searchCondition, {...params})
        const data = await Service("/wikiProject/findWorkItemPage", this.searchCondition)
        if(data.code === 0){
            this.workList = data.data.dataList;
            this.total = data.data.totalRecord
        }
        return data;
    }

    @action
    findWorkItem = async(param) => {
        const value = new FormData();
        value.append("workItemId", param.id)
        const data = await Service("/wikiProject/findWorkItem", value)

        return data;
    }

    @action
    findSystemUrl = async(param) => {
        const value = new FormData();
        value.append("id", "d8901891")
        const data = await Service("/systemUrl/findSystemUrl", value)

        return data;
    }

}
export const WORK_STORE = "workStore"