import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/MonitorMock'
export class MonitorStore {


    @observable data = [];

    @observable total = 1;

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

    //根据条件查询
    @action
    findMonitorCondition = async () => {

        const resData = await Service('/monitor/findMonitorCondition', this.searchCondition);
        this.total = resData.data.totalRecord
        return resData.data.dataList;
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })

    }

    //监控项修改
    @action
    updateMonitorById = async (option) => {

        return Service('/monitor/updateMonitor', option);
    }

    //删除
    @action
    deleteMonitorById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service('/monitor/deleteMonitorById',params)

    }

    //根据监控类型查询监控item
    @action
    findMonitorItemByName = async (name) => {
        const params = new FormData();
        params.append("name",name)
        const resData = await Service("/monitor/findMonitorItemByName",params)
        return resData.data;
    }

    @action
    addMonitor = async (params) => {
        await Service("/monitor/createMonitor", params)
    }

    @action
    findMonitorItemAll = async () => {
        const resData = await Service("/monitor/findMonitorItemAll")
        return resData.data;
    }

}

const monitorStore = new MonitorStore();
export default monitorStore