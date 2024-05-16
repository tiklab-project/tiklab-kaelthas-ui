import {action, observable, values} from "mobx";
import {Service} from "../../../common/utils/requset";

class HostAlarmStore {
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

    @observable
    alarmPage = [];

    @observable
    total = 10;

    @observable quickFilterValue = {};

    @action
    setQuickFilterValue = (value) => {
        this.quickFilterValue = value
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
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
    findAlarmPageByHostId = async () => {
        const resData = await Service("/alarm/findAlarmPageByHostId", this.searchCondition)
        this.alarmPage = resData.data.dataList;
        this.total = resData.data.totalRecord
        return resData.data.dataList;
    }

    @action
    updateAlarmPage = async (value)=>{
        await Service("/alarm/updateAlarm",value);
    }

}

const hostAlarmStore = new HostAlarmStore();

export default hostAlarmStore;