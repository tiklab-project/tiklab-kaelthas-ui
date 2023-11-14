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
    @observable expandedTree = [];
    @observable aaa = [];
    // 目录树
    @observable repositoryCatalogueList = [];
    @observable docDetail = [{
        title: "",
        type: "",
        content: ""
    }]
    @action
    setAAA = (value) => {
        this.aaa = value;
        console.log(this.aaa)
    }
    @action
    setExpandedTree = (value) => {
        this.expandedTree = value;
        console.log(this.expandedTree)
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
    findRepositoryCatalogue= async(value)=> {
        const data = await Service("/category/findCategoryListTree", value)
        return data;
    }

    @action
    findDocument = async(id) => {
        const params = new FormData()
        params.append("id", id)
        const data = await Service("/document/findDocument", params);
        return data;
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
    deleteRepositoryLog= async(params)=> {
        const data = await Service("/category/deleteCategoryAndSort", params);
        return data;
    }

    @action
    findCategory= async(value)=> {
        const params = new FormData()
        params.append("id", value.id)
        const data = await Service("/category/findCategory", params);
        return data;
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
    findDmUserList= async(id)=> {
        const params ={
            domainId: id,
            pageParam: {pageSize: 10, currentPage: 1}
        }
        const data = await Service("/dmUser/findDmUserList", params);
        return data.data;
    }

    @action
    createDocumentRecent= async(value)=> {
        const data = await Service("/documentRecent/createDocumentRecent", value);
        return data.data;
    }
    @action
    deleteDocument= async(params)=> {
        const data = await Service("/document/deleteDocumentAndSort", params);
        return data;
    }
}

export default new CategoryStore();