import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
import {Axios} from "thoughtware-core-ui";

export class DbGraphicsStore {

    @observable graphicsList = [];

    @observable total = 0;

    @observable monitorList = [];

    @observable monitorTotal = 0;

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    //根据条件查询
    @action
    findGraphicsPage = async () => {
        const resData = await Service("/dbGraphics/findGraphicsPage", this.searchCondition);
        this.graphicsList = resData.data.dataList;
        this.total = resData.data.totalRecord
        return resData.data;
    }

    @action
    findMonitorIds = async (value) => {
        const resData = await Axios.post("/dbGraphics/findMonitorIds", value);
        return resData.data;
    }


    //根据数据库id查询监控项列表
    @action
    findAllMonitor = async () => {
        const list = await Service("/dbMonitor/findAllMonitor", this.searchCondition)
        this.monitorList = list.data
        return list.data;
    }

    //新增
    @action
    createGraphics = async (option) => {
        const resData = await Service("/dbGraphics/createGraphics", option);
        return resData;
    }

    //修改
    @action
    updateGraphics = async (option) => {
        const resData = await Service("/dbGraphics/updateGraphics", option);
        return resData;
    }

    //删除
    @action
    deleteGraphics = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service("/dbGraphics/deleteGraphics", params);
    }


}

const dbGraphicsStore = new DbGraphicsStore();
export default dbGraphicsStore;