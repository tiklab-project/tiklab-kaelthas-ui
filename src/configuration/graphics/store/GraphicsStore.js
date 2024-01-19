import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/GraphicsMock'

export class GraphicsStore {

    @observable monitorList = [];

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
    setSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    //根据条件查询
    @action
    getGraphicsStoreList = async () => {
        const resData = await Service("/graphics/findGraphics",this.searchCondition);
        this.data = resData;
        return resData.data;
    }

    //根据名称查询
    @action
    getGraphicsStoreByName = async (name) =>{
        const resData = await Service("/graphics/getGraphicsStoreByName",{name:name});
        this.data = resData;

        return resData;
    }


    //根据主机id查询监控项列表
    @action
    findMonitorListById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)
        const monitorList = await Service("/monitor/findMonitorListById", formData)
        this.monitorList = monitorList.data;
        return monitorList.data;
    }

    //新增
    @action
    addGraphicsStore = async (option) =>{
        const resData = await Service("/graphics/addGraphics",option);
        this.data = resData;
        return resData;
    }

    //修改
    @action
    updateGraphicsStoreById = async (option) =>{
        const resData = await Service("/graphics/updateGraphics",option);
        this.data = resData;
        return resData;
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