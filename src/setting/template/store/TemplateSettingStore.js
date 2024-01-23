import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class TemplateSettingStore {

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

    @observable templateList = [];


    @action
    setSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    //查询模板列表
    @action
    findTemplatePage = async () => {
        const templateList = await Service("/template/findTemplate", this.searchCondition);
        this.templateList = templateList.data;
        return templateList.data;
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
    deleteMonitorById = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service('/templateMonitor/deleteTemplateMonitor', params)

    }

    //修改模板下的监控项
    @action
    updateTemplateMonitor = async (option) => {
        await Service("/templateMonitor/updateTemplateMonitor", option)
    }

    //根据模板id查询模板下的监控项
    @action
    findTemplateMonitorByTemplateId = async (id) =>{
        const params = new FormData();
        params.append("templateId",id);
        const resData = Service("/templateMonitor/findTemplateMonitorByTemplateId",params)
        return resData;
    }


}

const templateSettingStore = new TemplateSettingStore();

export default templateSettingStore;