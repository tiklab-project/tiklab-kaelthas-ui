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
    findAlarmPage = async () => {
        const resData = await Service("/alarm/findAlarmPage", this.searchCondition)
        this.alarmPage = resData.data.dataList;
        return resData.data.dataList;
    }

}

const alarmPageStore = new AlarmPageStore();

export default alarmPageStore;