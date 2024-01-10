import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/GraphicsMock'

export class GraphicsStore {

    @observable data = [];

    //查询所有
    @action
    getGraphicsStoreList = async () => {
        const resData = await Service("/graphicsStore/getGraphicsStoreList");
        this.data = resData;
        return resData.data;
    }

    //根据名称查询
    @action
    getGraphicsStoreByName = async (name) =>{
        const resData = await Service("/graphicsStore/getGraphicsStoreByName",{name:name});
        this.data = resData;

        return resData;
    }

    //新增
    @action
    addGraphicsStore = async (option) =>{
        const resData = await Service("/graphicsStore/addGraphicsStore",option);
        this.data = resData;
        return resData;
    }

    //修改
    @action
    updateGraphicsStoreById = async (option) =>{
        const resData = await Service("/graphicsStore/updateGraphicsStoreById",option);
        this.data = resData;
        return resData;
    }

    //删除
    @action
    deleteGraphicsStoreById = async (id) =>{
        const resData = await Service("/graphicsStore/deleteGraphicsStoreById",id);
        this.data = resData;
        return resData;
    }


}

const graphicsStore = new GraphicsStore();
export default graphicsStore;