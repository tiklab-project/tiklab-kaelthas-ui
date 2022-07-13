import { observable, action} from "mobx";
import { FindCategoryDocument,FindCategory,FindDocument,UpdateDocument } from "../api/categoryApi"
export class WikiCategoryStore {
    @observable wikiCatalogue = [];
    @observable docDetail = [{
        title: "",
        type: "",
        content: ""
    }]

    @action
    findCategoryDocument= async(value)=> {
        const param = new FormData()
        param.append("id", value.id)
        const data = await FindCategoryDocument(param);
        return data;
    }

    @action
    findCategory = async(value)=> {
        const param = new FormData()
        param.append("id", value.id)
        const data = await FindCategory(param);
        return data;
    }

    @action
    findDocument = async(id) => {
        const params = new FormData()
        params.append("id", id)
        const data = await FindDocument(params);
        return data;
    }

    // 创建文档
    @action
    updateDocument = async(params) => {
        const data = await UpdateDocument(params);
        return data;
    }
}
export const WIKICATEGORY_STORE = "wikiCategoryStore"
