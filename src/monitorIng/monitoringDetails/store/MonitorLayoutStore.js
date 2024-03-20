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
    findInformationPage = [];

    @observable
    descTime = [];

    @observable
    hostState = '1';

    //监控项的id
    @observable
    monitorIds = [];

    @action
    setHostState = value => {
        this.hostState = value;
    }

    @action
    getDateTime = () => {
        let date = new Date()
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')
        return "'" + year + '-' + month + '-' + day + "'";
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
    findInformationByGraphics = async () => {
        const resData = await Service("/historyInformation/findInformationByGraphics", this.searchCondition);
        this.condition = resData.data
        return resData.data;
    }

    @action
    findMonitorForHost = async () => {
        const resData = await Service("/historyInformation/findInformationPage", this.searchCondition);
        this.findInformationPage = resData.data.dataList;
        this.total = resData.data.totalRecord;
        return resData.data.dataList;
    }

    @action
    findMonitorByCategories = async () => {
        const resData = await Service("/monitorItem/findMonitorByCategories", this.searchCondition);

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

        if (this.monitorIds.length === 0){
            resData.data.map(item => {
                this.monitorIds.push(item.name)
            })
        }
        return resData.data;
    }

    //查询图表当中是否存在上报数据的配置
    @action
    findGraphicsByHisInformation = async (value) => {
        const params = new FormData();
        params.append("hostId", value);
        const resData = await Service("/graphics/findGraphicsByHisInformation", params)
        return resData.data
    }

}

const monitorLayoutStore = new MonitorLayoutStore();

export default monitorLayoutStore;