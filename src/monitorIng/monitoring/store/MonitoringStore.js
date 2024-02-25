import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitoringStore {

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
    findHostPage = async () => {
        const resData = await Service("/historyInformation/findHostPage", this.searchCondition);

        return resData.data.dataList;
    }
}

const monitoringStore = new MonitoringStore();

export default monitoringStore;