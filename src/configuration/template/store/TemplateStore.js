import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/TemplateMock'

export class TemplateStore {

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

    //添加模板当中的模板列表
    @observable templateList = []

    @action
    setSearchCondition = async (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }


    //根据条件查询主机当中的模板
    @action
    findTemplateByMonitor = async () =>{
        const resData = await Service("/monitor/findTemplateByMonitor",this.searchCondition);

        return resData.data.dataList;
    }

    //查询所有模板
    @action
    getTemplateAll = async (name) =>{
        const params = new FormData();
        params.append("name",name);
        const resData = await Service("/template/getTemplateAllByName",params);
        this.templateList = resData.data;

        return resData.data;
    }

    //新增
    @action
    addTemplate = async (option) =>{
        const resData = await Service("/monitor/addTemplate",option);
        return resData;
    }


    //删除单个
    @action
    deleteTemplateById = async (params) =>{

        await Service("/monitor/deleteTemplateById", params);
    }
}

const templateStore = new TemplateStore();
export default templateStore;