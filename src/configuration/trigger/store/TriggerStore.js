import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/TriggerMock'

export class TriggerStore {

    @observable data = [];

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

    //根据条件查询
    @action
    getTriggerList = async () => {

        const data = await Service('/trigger/getTrigger',this.searchCondition)

        return data.data;

    }

    @action
    setSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
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