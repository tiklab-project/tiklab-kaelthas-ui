import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class TemplateSettingStore{

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
        const templateList = await Service("/template/findTemplate",this.searchCondition);
        this.templateList = templateList.data;
        return templateList.data;
    }

    //创建模板
    @action
    createTemplate = async (option) => {
        const resTemplateId = await Service("/template/createTemplate", option)
        return resTemplateId;
    }

    @action
    deleteTemplate = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service("/template/deleteTemplate", params);
    }


}

const templateSettingStore = new TemplateSettingStore();

export default templateSettingStore;