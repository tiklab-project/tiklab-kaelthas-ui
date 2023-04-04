/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:34:53
 */
import { observable, action} from "mobx";
import {FindRepositoryCatalogue,AddRepositoryCatalogue,DetailRepositoryLog,AddRepositoryCataDocument,
    UpdateRepositoryCatalogue,DeleteRepositoryLog,UpdateDocument,FindDocument,DeleteDocument,
    FindCategoryDocument,FindDmPrjRolePage, CreateDocumentRecent} from "../api/RepositoryLog"
export class RepositoryCatalogueStore {
    // 知识库id
    @observable repositoryCatalogue = [];
    @observable
    expandedTree = [0];
    // const [expandedTree, setExpandedTree] = useState([0])
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
        const data = await FindRepositoryCatalogue(categoryQuery);
        return data.data;
    }

    @action
    addRepositoryCatalogue= async(params)=> {
        const data = await AddRepositoryCatalogue(params);
        return data;
    }

    @action
    updateRepositoryCatalogue= async(params)=> {
        const data = await UpdateRepositoryCatalogue(params);
        return data;
    }

    // 删除目录
    @action
    deleteRepositoryLog= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteRepositoryLog(param);
        return data;
    }

    @action
    detailRepositoryLog= async(params)=> {
        const data = new FormData()
        data.append("id", params.id)
        const detailRepositoryLog = await DetailRepositoryLog(data);
        // this.docDetail = detailRepositoryLog.data.list[0];
        return detailRepositoryLog.data;
    }

    @action
    setDocDetail = (data) => {
        this.docDetail = {...this.docDetail,...data}
    }

    // 创建文档
    @action
    addRepositoryCataDocument = async(params) => {
        const data = await AddRepositoryCataDocument(params);
        return data;
    }
    // 创建文档
    @action
    updateDocument = async(params) => {
        const data = await UpdateDocument(params);
        return data;
    }

    // 获取文档
    @action
    findDocument = async(id) => {
        const params = new FormData()
        params.append("id", id)
        const data = await FindDocument(params);
        return data;
    }

     // 删除文档
    @action
    deleteDocument= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteDocument(param);
        return data;
    }

    @action
    findCategoryDocument= async(id)=> {
        const param = new FormData()
        param.append("id", id)
        const data = await FindCategoryDocument(param);
        return data;
    }

    // 查找项目成员
    @action
    findDmPrjRolePage= async(id)=> {
        const param ={
            domainId: id,
            pageParam: {pageSize: 10, currentPage: 1}
        }
        const data = await FindDmPrjRolePage(param);
        return data.data;
    }

    @action
    createDocumentRecent= async(value)=> {
        
        const data = await CreateDocumentRecent(value);
        return data.data;
    }
}

export const REPOSITORYCATELOGUE_STORE = "RepositoryCatalogueStore"