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


    //主机告警时间
    @observable hostAlarmDate = null;


    @action
    setHostAlarmDate = (value) => {
        this.hostAlarmDate = value
    }

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
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    findInformationByGraphics = async () => {
        const resData = await Service("/hostHistory/findInformationByGraphics", this.searchCondition);
        if (this.alarmCondition.length > 0) {
            this.condition = this.alarmCondition;
            this.alarmCondition = [];
        } else {
            this.condition = resData.data
        }
        return resData.data;
    }


    @action
    findHistory = async () => {
        const resData = await Service("/history/findInformationPage", this.searchCondition);
        this.historyList = resData.data.dataList;
        this.total = resData.data.totalRecord;
        return resData.data.dataList;
    }


    @action
    findInformationByLine = async () => {
        const resData = await Service("/history/findInformationByLine", this.searchCondition);
        return resData.data;
    }

    @action
    findMonitorByCategories = async () => {
        const resData = await Service("/hostList/findMonitorByCategories", this.searchCondition);
        return resData.data;
    }


    @action
    findAllMonitor = async () => {
        const resData = await Service("/monitor/findAllMonitor", {
            hostId: localStorage.getItem("hostIdForMonitoring"),
            reportType: 2
        });

        if (this.monitorIds.length === 0) {
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

const monitorLayoutStore = new MonitorGraphicsStore();

export default monitorLayoutStore;
