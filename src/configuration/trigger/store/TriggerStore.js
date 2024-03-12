import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class TriggerStore {

    @observable data = [];

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

    @observable monitorList = []

    //根据条件查询
    @action
    getTriggerList = async () => {

        const resData = await Service('/trigger/findTrigger',this.searchCondition)

        this.total = resData.data.totalRecord
        return resData.data;

    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    //根据主机id查询监控项列表
    @action
    findMonitorListById = async (option) => {
        const monitorList = await Service("/monitor/findAllMonitor", option)
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

    @action
    findTriggerExpressionAll = async () => {
        const triggerExAll = await Service("/triggerExpression/findTriggerExpressionAll")
        return triggerExAll.data;
    }

}

const triggerStore = new TriggerStore();

export default triggerStore;