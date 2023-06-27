/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:34:53
 */
import { Service } from "../../../common/utils/requset";
import { observable, action} from "mobx";
export class CategoryStore {
    // 知识库id
    @observable repositoryCatalogue = [];
    @observable
    expandedTree = [0];
    // 目录树
    @observable repositoryCatalogueList = [];
    @observable docDetail = [{
        title: "",
        type: "",
        content: ""
    }]

    @action
    setExpandedTree = (value) => {
        this.expandedTree = value;
    }
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    @action
    setRepositoryCatalogueList = (value) => {
        this.repositoryCatalogueList = value
    }
    /**
     * 设置知识库id
     * @param {*} id 
     */
    @action
    findRepositoryCatalogue= async(id)=> {
        const categoryQuery = {
            repositoryId: id
        }
        
        const data = await Service("/category/findCategoryListTree", categoryQuery)
        return data.data;
    }

    @action
    addRepositoryCatalogue= async(params)=> {
        const data = await Service("/category/createCategory", params);
        return data;
    }

    @action
    updateRepositoryCatalogue= async(params)=> {
        const data = await Service("/category/updateCategory", params);
        return data;
    }

    // 删除目录
    @action
    deleteRepositoryLog= async(id)=> {
        const params = new FormData()
        params.append("id", id)
        const data = await Service("/category/deleteCategory", params);
        return data;
    }

    @action
    detailRepositoryLog= async(params)=> {
        const data = new FormData()
        data.append("id", params.id)
        const detailRepositoryLog = await Service("/category/findCategory", data);
        return detailRepositoryLog.data;
    }

    @action
    setDocDetail = (data) => {
        this.docDetail = {...this.docDetail,...data}
    }

    // 创建文档
    @action
    createDocument = async(params) => {
        const data = await Service("/document/createDocument", params);
        return data;
    }
    // 创建文档
    @action
    updateDocument = async(params) => {
        const data = await Service("/document/updateDocument", params);
        return data;
    }

    // 获取文档

    @action
    findCategoryDocument= async(id)=> {
        const params = new FormData()
        params.append("id", id)
        const data = await Service("/category/findCategoryDocument", params);
        return data;
    }

    // 查找项目成员
    @action
    findDmPrjRolePage= async(id)=> {
        const params ={
            domainId: id,
            pageParam: {pageSize: 10, currentPage: 1}
        }
        const data = await Service("/dmUser/findDmUserPage", params);
        return data.data;
    }

    @action
    createDocumentRecent= async(value)=> {
        const data = await Service("/documentRecent/createDocumentRecent", value);
        return data.data;
    }
    @action
    deleteDocument= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await Service("/document/deleteDocument", param);
        return data;
    }
}

export default new CategoryStore();