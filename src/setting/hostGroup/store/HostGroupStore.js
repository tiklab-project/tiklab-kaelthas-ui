import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

class HostGroupStore {

    @observable searchCondition = {
        orderParams: [{
            name: "id",
            orderType: "desc"
        }],
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable
    hostGroupData = [];

    @observable
    total = 10;

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setNullCondition = (value) =>{
        this.searchCondition = Object.assign({
            orderParams: [{
                name: "id",
                orderType: "desc"
            }],
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }

    @action
    findHostGroupPage = async () =>{
        const resPage = await Service("/system/findHostGroupPage",this.searchCondition)
        this.total = resPage.totalRecord
        this.hostGroupData = resPage.data.dataList
    }

    @action
    createHostGroup = async (value) =>{
        await Service("/system/createHostGroup",value)
    }

    @action
    updateHostGroup = async (value) =>{
        await Service("/system/updateHostGroup",value)
    }

    @action
    deleteHostGroup = async (id) =>{
        const formData = new FormData();
        formData.append("id",id);
        await Service("/system/deleteHostGroup",formData)
    }

}

const hostGroupStore = new HostGroupStore();

export default hostGroupStore;