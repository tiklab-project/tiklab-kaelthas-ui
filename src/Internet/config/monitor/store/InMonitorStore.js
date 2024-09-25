import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
export class InMonitorStore {


    @observable monitorList = [];

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



    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    @action
    setSearchNullCondition = (value) => {
        this.searchCondition = Object.assign({
            orderParams: [{
                name: "id",
                orderType: "desc"
            }],
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        },  { ...value })
    }

    //根据条件查询
    @action
    findMonitorPage = async () => {
        const resData = await Service('/internetMonitor/findMonitorPage', this.searchCondition);
        this.total = resData.data.totalRecord
        this.monitorList = resData.data.dataList
        return resData.data.dataList;
    }

    @action
    createMonitor = async (params) => {
        return await Service("/internetMonitor/createMonitor", params)
    }

    //删除
    @action
    deleteMonitor = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service('/internetMonitor/deleteMonitor',params)

    }

    //监控项修改
    @action
    updateMonitor = async (option) => {
        return Service('/internetMonitor/updateMonitor', option);
    }

    @action
    findItemList = async (param) => {
        const resData = await Service("/internetItem/findItemList",param)
        return resData.data;
    }

}

const monitorStore = new InMonitorStore();
export default monitorStore