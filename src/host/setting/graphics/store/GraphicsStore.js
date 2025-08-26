import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
import {Axios} from "tiklab-core-ui";

export class GraphicsStore {

    @observable graphicsList = [];

    @observable total = 0;

    @observable monitorList = [];

    @observable monitorTotal = 0;

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

    //根据条件查询
    @action
    findGraphics = async () => {
        const resData = await Service("/graphics/findGraphics",this.searchCondition);
        this.graphicsList = resData.data.dataList;
        this.total = resData.data.totalRecord
        return resData.data;
    }

    @action
    findMonitorIds = async (value) =>{
        const resData = await Axios.post("/graphics/findMonitorIds",value)
        return resData.data
    }

    //根据名称查询
    @action
    getGraphicsStoreByName = async (name) =>{
        const resData = await Service("/graphics/getGraphicsStoreByName",{name:name});
        this.graphicsList = resData.data.dataList;
        return resData;
    }


    //根据主机id查询监控项列表
    @action
    findMonitorListById = async () => {
        const list = await Service("/monitor/findAllMonitor", this.searchCondition)
        this.monitorList = list.data
        return list.data;
    }

    //新增
    @action
    addGraphics = async (option) =>{
        return await Service("/graphics/addGraphics", option);
    }

    //修改
    @action
    updateGraphics = async (option) =>{
        return await Service("/graphics/updateGraphics", option);
    }

    //删除
    @action
    deleteGraphicsStoreById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service("/graphics/deleteGraphics",params);
    }


}

const graphicsStore = new GraphicsStore();
export default graphicsStore;