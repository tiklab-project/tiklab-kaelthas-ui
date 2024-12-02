import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
export class DbMonitorStore {


    @observable dbMonitorList = [];

    @observable total = 1;

    @observable expression = [];

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
    updateDbMonitor = async (option) => {
        return Service('/dbMonitor/updateDbMonitor', option);
    }

    //删除
    @action
    deleteDbMonitor = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service('/dbMonitor/deleteDbMonitor',params)

    }

    //根据监控类型查询监控item
    @action
    findDbMonitorPage = async () => {
        const resData = await Service("/dbMonitor/findDbMonitorPage",this.searchCondition)
        this.dbMonitorList = resData.data.dataList
        this.total = resData.data.totalRecord
        return resData.data;
    }

    @action
    createDbMonitor = async (params) => {
        return await Service("/dbMonitor/createDbMonitor", params)
    }

    @action
    findItemListByType = async (value) => {
        const resData = await Service("/dbMonitor/findItemListByType",value)
        this.expression = resData.data;
        return resData.data;
    }

}

const dbMonitorStore = new DbMonitorStore();
export default dbMonitorStore