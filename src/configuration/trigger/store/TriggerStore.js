import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/TriggerMock'

export class TriggerStore {

    @observable data = [];

    //查询全部
    @action
    getTriggerList = async () => {

        const data = await Service('/trigger/getTriggerList')

        return data.data;

    }

    //根据名称查询
    @action
    findTriggerByName = async (name) =>{
        const resData = await Service('/trigger/findTriggerByName', {name:name});
        this.data = resData;
        console.log(resData)
        return resData;

    }

    //新增
    @action
    addTrigger = async (option) =>{
        const resData = await Service('/trigger/addTrigger',option);
        this.data = resData;
        return resData;
    }

    //根据id进行修改
    @action
    updateTriggerById = async(option) =>{
        const resData = await Service('/trigger/updateTriggerById',option);
        this.data = resData;
        return resData;
    }

    //根据id进行删除
    @action
    deleteTriggerById = async (id) =>{
        const resData = await Service('/trigger/deleteTriggerById', {id:id});
        this.data = resData;
        return resData;
    }

}

const triggerStore = new TriggerStore();

export default triggerStore;