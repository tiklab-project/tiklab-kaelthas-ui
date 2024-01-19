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

    @observable monitorList = []

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

    //根据主机id查询监控项列表
    @action
    findMonitorListById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)
        const monitorList = await Service("/monitor/findMonitorListById", formData)
        this.monitorList = monitorList.data;
        return monitorList.data;
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

    //修改触发器
    @action
    updateTrigger = async(option) =>{
        await Service('/trigger/updateTrigger',option);

    }

    //根据id进行删除
    @action
    deleteTriggerById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const resData = await Service('/trigger/deleteById', params);
        this.data = resData;
        return resData;
    }

}

const triggerStore = new TriggerStore();

export default triggerStore;