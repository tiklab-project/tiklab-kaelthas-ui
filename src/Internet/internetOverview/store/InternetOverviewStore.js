import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class InternetOverviewStore {

    @observable hostData = {};

    @observable
    internetOverview = [];

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
        const resData = await Service("/hostList/findHostById", formData);
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
        const resData = await Service("/hostDynamic/findHostDynamicPage", this.searchCondition);
        this.hostDynamicList = resData.data;
        return resData.data;
    }

    @action
    findInternetOverview = async (internetId) =>{
        var formData = new FormData();
        formData.append("internetId",internetId);
        const resData = await Service("/inOverview/findInternetOverview",formData)
        this.internetOverview = resData.data;
    }

}

const internetOverviewStore = new InternetOverviewStore();

export default internetOverviewStore;