import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitorLayoutStore {
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

    @observable
    descTime = [];


    @action
    setDescTime = (value) =>{
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
    findInformationByGraphics = async () => {
        const resData = await Service("/historyInformation/findInformationByGraphics", this.searchCondition);
        return resData.data;
    }

    @action
    findDescGatherTime = async () => {
        const resData = await Service("/historyInformation/findDescGatherTime", this.searchCondition);
        return resData.data;
    }

    @action
    findInformationByLine = async () => {
        const resData = await Service("/historyInformation/findInformationByLine", this.searchCondition);
        return resData.data;
    }

    @action
    findAllInformationByHostId = async () => {
        const resData = await Service("/historyInformation/findAllInformationByHostId", this.searchCondition);
        return resData.data;
    }

    @action
    findAllMonitor = async () => {
        const resData = await Service("/monitor/findAllMonitor", {
            hostId: localStorage.getItem("hostIdForMonitoring"),
            reportType: 2
        });
        return resData.data;
    }

}

const monitorLayoutStore = new MonitorLayoutStore();

export default monitorLayoutStore;