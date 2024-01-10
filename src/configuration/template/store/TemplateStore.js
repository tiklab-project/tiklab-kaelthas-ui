import {action} from "mobx";
import {Service} from "../../../common/utils/requset";
import '../api/mock/TemplateMock'

export class TemplateStore {


    //查询全部模板
    @action
    getAllTemplate = async () =>{
        const resData = await Service("/template/getAllTemplate");
        console.log(resData);

        return resData;
    }

    //根据名称进行查询
    @action
    getTemplateByName = async (name) =>{
        const resData = await Service("/template/getTemplateByName",{name:name});

        return resData;
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