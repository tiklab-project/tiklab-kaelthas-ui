import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class KuMonitorGraphicsStore {


    @observable searchCondition = {
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

        if (this.nowTimeInterval.length > 0) {
            return this.nowTimeInterval;
        }
        return [nowVar.substring(1, nowVar.length - 1) + " 00:00:00", nowVar.substring(1, nowVar.length - 1) + " 24:00:00"]
    }

    @action
    setNowTimeInterval = (value) => {
        this.nowTimeInterval = [];
        this.nowTimeInterval = [...value];
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setSearchNull = value => {

        this.searchCondition = Object.assign({
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }

    @action
    findGraphicsLine = async () => {
        const resData = await Service("/historyInformation/findKuGraphicsLine", this.searchCondition);
        this.condition = resData.data
        return resData.data
    }


}

const dbMonitorGraphicsStore = new KuMonitorGraphicsStore();

export default dbMonitorGraphicsStore;