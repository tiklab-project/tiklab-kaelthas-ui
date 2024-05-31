import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class TemplateSettingStore {

    @observable total = 1;

    @observable monitorTotal = 1;

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

    @observable templateList = [];


    @action
    setSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setMonitorSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.monitorSearchCondition, {...value})
    }

    //查询模板列表
    @action
    findTemplatePage = async () => {
        const templateList = await Service("/template/findTemplate", this.searchCondition);
        this.templateList = templateList.data.dataList;
        this.total = templateList.data.totalRecord
    }

    //创建模板
    @action
    createTemplate = async (option) => {
        const resTemplateId = await Service("/template/createTemplate", option)
        return resTemplateId;
    }

    //根据模板id删除模板
    @action
    deleteTemplate = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service("/template/deleteTemplate", params);
    }

    @action
    updateTemplate = async (option) => {
        await Service("/template/updateTemplate", option);
    }

    //根据监控项id删除监控项
    @action
    deleteMonitorById = async (params) => {
        return await Service('/templateMonitor/deleteTemplateMonitor', params);
    }

    //修改模板下的监控项
    @action
    updateTemplateMonitor = async (option) => {
        await Service("/templateMonitor/updateTemplateMonitor", option)
    }

    //根据模板id查询模板下的监控项
    @action
    findMonitorByTemplateId = async () =>{
        const resData = await Service("/monitor/findMonitorByTemplateId",this.monitorSearchCondition)
        this.monitorList = resData.data.dataList
        this.monitorTotal = resData.data.totalRecord
    }

    @action
    createMonitor = (value) =>{
        return Service("/templateMonitor/createTemplateMonitor", value);
    }


}

const templateSettingStore = new TemplateSettingStore();

export default templateSettingStore;