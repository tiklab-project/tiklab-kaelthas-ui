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
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setMonitorSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.monitorSearchCondition, {...value})
    }

    //查询模板列表
    @action
    findTemplatePage = async () => {
        const templateList = await Service("/system/findTemplate", this.searchCondition);
        this.templateList = templateList.data.dataList;
        this.total = templateList.data.totalRecord
    }

    //创建模板
    @action
    createTemplate = async (option) => {
        const resTemplateId = await Service("/system/createTemplate", option)
        return resTemplateId;
    }

    //根据模板id删除模板
    @action
    deleteTemplate = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service("/system/deleteTemplate", params);
    }

    //修改模板
    @action
    updateTemplate = async (option) => {
        await Service("/system/updateTemplate", option);
    }

    //根据监控项id删除模板下监控项
    @action
    deleteMonitorById = async (params) => {
        await Service('/template/deleteTemplateMonitor', params);
    }

    //修改模板下的监控项
    @action
    updateTemplateMonitor = async (option) => {
        await Service("/template/updateTemplateMonitor", option)
    }

    //根据模板id查询模板下的监控项
    @action
    findMonitorByTemplateId = async () =>{
        const resData = await Service("/monitor/findMonitorByTemplateId",this.monitorSearchCondition)
        this.monitorList = resData.data.dataList
        this.monitorTotal = resData.data.totalRecord
    }

    //向模板下添加监控系
    @action
    createMonitor = (value) =>{
        return Service("/template/createTemplateMonitor", value);
    }


}

const templateSettingStore = new TemplateSettingStore();

export default templateSettingStore;