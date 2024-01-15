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
    getAllTemplate = async () =>{
        const resData = await Service("/template/findTemplateByCondition",this.searchCondition);

        return resData.data.dataList;
    }

    //根据名称进行查询
    @action
    getTemplateByName = async (name) =>{
        const resData = await Service("/template/findTemplateByName",{name:name});
        this.templateList = resData.data;

        return resData.data;
    }

    //新增
    @action
    addTemplate = async (option) =>{
        const resData = await Service("/template/addTemplate",option);
        return resData;
    }


    //删除单个
    @action
    deleteTemplateById = async (id) =>{
        const resData = await Service("/template/deleteTemplate", {id:id});
        return resData;
    }
}

const templateStore = new TemplateStore();
export default templateStore;