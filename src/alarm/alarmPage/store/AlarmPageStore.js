import {action, observable, values} from "mobx";
import {Service} from "../../../common/utils/requset";

class AlarmPageStore {
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
    setNullConditionByMonitoring = (value) =>{
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
    findAlarmPage = async () => {
        const resData = await Service("/alarm/findAlarmPage", this.searchCondition)
        this.alarmPage = resData.data.dataList;
        this.total = resData.data.totalRecord
        return resData.data.dataList;
    }

    @action
    updateAlarmPage = async (value)=>{
        await Service("/alarm/updateAlarm",value);
    }

    @action
    findAlarmNumByCondition = async (option) => {
        const resData = await Service("alarm/findAlarmNumByCondition", option)
        return resData.data;
    }

}

const alarmPageStore = new AlarmPageStore();

export default alarmPageStore;