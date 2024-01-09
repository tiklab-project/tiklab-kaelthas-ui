import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class MonitorStore {


    @observable data = [];
    @observable name = '内核占用CPU时间百分比';


    //查询全部
    @action
    findMonitorList = async () => {
        const data = await Service('/Configuration/Host/Monitor')
        return data.data;
    }

    //根据名称查询
    @action
    findMonitorByName = async ({name}) => {
        if (''.localeCompare(name) === 0){
            return ;
        }

        const data = await Service('/Configuration/Host/Monitor/monitorFindByName', {name});

        console.log("根据名称查询的数据:",data.data)
        return data.data;
    }

    //根据id修改

    //删除

}

const monitorStore = new MonitorStore();
export default monitorStore