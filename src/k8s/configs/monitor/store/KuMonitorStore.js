import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
export class KuMonitorStore {


    @observable kuMonitorList = [];

    @observable total = 1;

    @observable searchCondition = {
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
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        },  { ...value })
    }

    //监控项修改
    @action
    updateKuMonitor = async (option) => {
        return Service('/kuMonitor/updateKuMonitor', option);
    }

    //删除
    @action
    deleteKuMonitor = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service('/kuMonitor/deleteKuMonitor',params)
    }

    //根据监控类型查询监控item
    @action
    findKuMonitorPage = async () => {
        const resData = await Service("/kuMonitor/findKuMonitorPage",this.searchCondition)
        this.kuMonitorList = resData.data.dataList
        this.total = resData.data.totalRecord
        return resData.data;
    }

    @action
    createKuMonitor = async (params) => {
        return await Service("/kuMonitor/createKuMonitor", params)
    }

    @action
    findItemList = async (value) => {
        const resData = await Service("/kuItem/findItemList",value)
        return resData.data;
    }

}

const dbMonitorStore = new KuMonitorStore();
export default dbMonitorStore