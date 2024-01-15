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

    //根据id修改
    @action
    updateMonitorById = async (option) => {

        return Service('/Configuration/Host/Monitor/updateMonitorById', option);
    }

    //删除
    @action
    deleteMonitorById = async (id) =>{

        const resData = await Service('/Configuration/Host/Monitor/deleteMonitorById',id)
        console.log(resData)
        return resData;
    }

}

const monitorStore = new MonitorStore();
export default monitorStore