import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/MonitorMock'
export class MonitorStore {


    @observable data = [];


    //查询全部
    @action
    findMonitorList = async () => {
        const data = await Service('/Configuration/Host/Monitor')
        return data.data;
    }

    //根据名称查询
    @action
    findMonitorByName = async (name) => {

        if (''.localeCompare(name) === 0) {
            return;
        }

        let params = {
            name: name
        }

        const data = await Service('/Configuration/Host/Monitor/monitorFindByName', params);

        console.log("根据名称查询的数据:", data)
        return data;
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