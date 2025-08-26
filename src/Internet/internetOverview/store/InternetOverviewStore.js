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
    findHostDynamicPage = async () =>{
        const resData = await Service("/hostDynamic/findHostDynamicPage", this.searchCondition);
        this.hostDynamicList = resData.data;
        return resData.data;
    }

    @action
    findInternetOverview = async (internetId) =>{
        const formData = new FormData();
        formData.append("internetId",internetId);
        const resData = await Service("/inOverview/findInternetByInId",formData)
        this.internetOverview = resData.data;
    }


    //根据id查询网络信息的概括（告警、监控项、触发器、图形）
    @action
    findInternetGeneralize = async (internetId) =>{
        const formData = new FormData();
        formData.append("id",internetId);
        const resData = await Service("/internet/findInternetGeneralize",formData)
        return resData
    }



}

const internetOverviewStore = new InternetOverviewStore();

export default internetOverviewStore;
