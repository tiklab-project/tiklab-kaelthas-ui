import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitorGraphicsStore {
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

    @observable total = 1

    @observable condition = [];

    @observable alarmCondition = [];

    @observable
    historyList = [];

    @observable
    descTime = [];

    //监控项的id
    @observable
    monitorIds = [];

    @observable
    monitorDataSubclassNames = [];

    @observable
    nowTimeInterval = [];

    @observable quickFilterValue = null;

    @action
    setQuickFilterValue = (value) => {
        this.quickFilterValue = value
    }

    @action
    getDateTime = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let nowVar = ("'" + year + '-' + month + '-' + day + "'");

        if (this.nowTimeInterval.length > 0){
            return this.nowTimeInterval;
        }
        return [nowVar.substring(1, nowVar.length - 1)+" 00:00:00",nowVar.substring(1, nowVar.length - 1) + " 24:00:00"]
    }

    @action
    setNowTimeInterval = (value) =>{
        this.nowTimeInterval = [];
        this.nowTimeInterval = [...value];
    }

    @action
    setDescTime = (value) => {
        this.descTime = value;
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setSearchNull = value => {

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
    findDescGatherTime = async () => {
        const resData = await Service("/history/findDescGatherTime", this.searchCondition);
        return resData.data;
    }

    @action
    findInGraphicsLine = async () => {
        const resData = await Service("/history/findInGraphicsLine", this.searchCondition);
        this.condition = resData.data;
        return resData.data;
    }


}

const monitorLayoutStore = new MonitorGraphicsStore();

export default monitorLayoutStore;