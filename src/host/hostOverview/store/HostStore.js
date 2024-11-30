import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class HostStore{

    @observable hostData = {};

    @observable
    hostList = [];

    @observable
    hostDynamicList = [];

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

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
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

    //根据id查询主机信息
    @action
    findHostById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)
        const resData = await Service("/hostOverview/findHostById", formData);
        this.hostData = resData.data;
        return resData.data;
    }

    @action
    findRecentHostList = async (id) =>{
        const formData = new FormData();
        formData.append("hostId", id)
        const resData = await Service("/hostList/findRecentHostList", formData);
        this.hostList = resData.data;
        return resData.data;
    }

    @action
    findHostDynamicPage = async () =>{
        const resData = await Service("/hostOverview/findHostDynamicPage", this.searchCondition);
        this.hostDynamicList = resData.data;
        return resData.data;
    }

}

const hostStore = new HostStore();

export default hostStore;