import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/MonitorMock'
export class MonitorStore {


    @observable data = [];

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

        const data = await Service('/monitor/findMonitorCondition', this.searchCondition);

        console.log("根据名称查询的数据:", data)
        return data.data;
    }

    @action
    setSearchCondition = async (value) => {
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
        await Service("/monitor/addMonitor", params)
    }

}

const monitorStore = new MonitorStore();
export default monitorStore