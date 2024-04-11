import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitoringStore {

    @observable total = 1;

    @observable hostState = 0;

    @observable
    monitoringList = [];

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
    setHostState = value =>{
        this.hostState = value
    }

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

    @action
    findHostPage = async () => {
        const resData = await Service("/hostList/findHostPage", this.searchCondition);
        this.total = resData.data.totalRecord;
        this.monitoringList = resData.data.dataList;
        return resData.data.dataList;
    }

    @action
    findInformationByMonitorId = async () => {
        const resData = await Service("/historyInformation/findInformationPage", this.searchCondition);
        this.total = resData.data.totalRecord;
        this.monitoringList = resData.data.dataList;
        return resData.data.dataList;
    }
}

const monitoringStore = new MonitoringStore();

export default monitoringStore;