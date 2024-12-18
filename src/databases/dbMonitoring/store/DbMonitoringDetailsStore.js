import {action, observable, values} from "mobx";
import {Service} from "../../../common/utils/requset";

export class DbMonitoringDetailsStore {
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
    findMonitorForHost = async () => {
        const resData = await Service("/history/findInformationPage", this.searchCondition);
        this.total = resData.data.totalRecord;
        return resData.data.dataList;
    }

    @action
    findMonitorByCategories = async () => {
        const resData = await Service("/monitorItem/findMonitorByCategories", this.searchCondition);

        return resData.data;
    }

    @action
    findInformationByGraphics = async (value) => {
        const params = new FormData();
        params.append("hostId", value);
        const resData = await Service("/graphics/findInformationByGraphics", params);
        return resData.data;
    }

    @action
    findDescGatherTime = async () => {
        const resData = await Service("/history/findDescGatherTime", this.searchCondition);
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

    @action
    findInformationByLine = async () => {
        const resData = await Service("/history/findInformationByLine", this.searchCondition);
        return resData.data;
    }

    @action
    findAllInformationByHostId = async (value) => {
        const params = new FormData();
        params.append("hostId", value);
        const resData = await Service("/history/findAllInformationByHostId", params);
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

const monitoringDetailsStore = new DbMonitoringDetailsStore();

export default monitoringDetailsStore;