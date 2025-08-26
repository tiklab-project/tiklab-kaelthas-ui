import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class TemplateStore {

    @observable total = 1;

    @observable
    templatePage = [];

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

    @observable monitorSearchCondition = {
        orderParams: [{
            name: "id",
            orderType: "desc"
        }],
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable
    monitorList = [];

    @observable
    monitorTotal = 0;

    //添加模板当中的模板列表
    @observable templateList = []

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setMonitorSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.monitorSearchCondition, {...value})
    }

    //根据条件查询主机当中的模板
    @action
    findTemplateByMonitor = async () =>{
        const resData = await Service("/template/findTemplate",this.searchCondition);
        this.total = resData.data?.totalRecord
        this.templatePage = resData.data?.dataList
        return resData.data?.dataList;
    }

    //查询所有模板
    @action
    getTemplateAll = async () =>{
        const resData = await Service("/template/findTemplateAll");
        this.templateList = resData.data;
        return resData.data;
    }

    //向主机当中添加模板
    @action
    addTemplate = async (option) =>{
        const resData = await Service("/template/addTemplate",option);
        return resData;
    }


    //从主机当中移除模板
    @action
    deleteTemplateById = async (params) =>{
        await Service("/template/removeTemplateForHost", params);
    }

    //根据模板id查询模板下的监控项
    @action
    findMonitorByTemplateId = async () =>{
        const resData = await Service("/monitor/findMonitorByTemplateId",this.monitorSearchCondition)
        this.monitorList = resData.data.dataList
        this.monitorTotal = resData.data.totalRecord
    }
}

const templateStore = new TemplateStore();
export default templateStore;