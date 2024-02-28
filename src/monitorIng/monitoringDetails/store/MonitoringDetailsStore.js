import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitoringDetailsStore {
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
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    @action
    findMonitorForHost = async () =>{
        const resData = await Service("/historyInformation/findInformationByMonitorId",this.searchCondition);
        this.total = resData.data.totalRecord;
        return resData.data.dataList;
    }

    @action
    findMonitorByCategories = async ()=>{
        const resData = await Service("/monitorItem/findMonitorByCategories",this.searchCondition);

        return resData.data;
    }


}

const monitoringDetailsStore = new MonitoringDetailsStore();

export default monitoringDetailsStore;