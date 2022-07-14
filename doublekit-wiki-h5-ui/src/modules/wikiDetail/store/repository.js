import { observable, action } from "mobx";
import {
    FindWikiCatalogue, FindRepository, CreateCategory, DeleteDocument,
    DeleteCategory, FindDocumentTemplatePage, CreateDocument, UpdateCategory, UpdateDocument
} from "../api/repository"
export class WikiCatalogueStore {
    @observable wikiCatalogueList = [];
    @observable templatePageParams = {
        current: 1,
        pageSize: 10,
        total: 1
    };
    @observable addVisible = false;
    @observable editVisible = false;
    @observable detail = ""
    @observable categoryId = "";
    @observable categoryType = "";
    @observable previewTemplateVisible = false
    @observable actionVisible = false
    @observable wikiName = ""
    @action
    setPreviewTemplateVisible = (value) => {
        this.previewTemplateVisible = value
    }

    @action
    setAddVisible = (value) => {
        this.addVisible = value
    }

    @action
    setEditVisible = (value) => {
        this.editVisible = value
    }

    @action 
    setActionVisible = (value) => {
        this.actionVisible = value
    }

    @action 
    setWikiName = (value) => {
        this.wikiName = value
    }

    @action
    setDetail = (value) => {
        this.detail = value
    }

    @action
    setCategoryId = (value) => {
        this.categoryId = value
    }
    @action
    setCategoryType = (value) => {
        this.categoryType = value
    }

    @action
    findWikiCatalogue = async (id) => {
        const params = {
            repositoryId: id
        }
        const data = await FindWikiCatalogue(params);
        if (data.code === 0) {
            this.wikiCatalogueList = data.data
        }
        return data.data;
    }

    @action
    findRepository = async (value) => {
        const params = new FormData();
        params.append("id", value.id)
        const data = await FindRepository(params)
        return data;
    }

    @action
    createCategory = async (value) => {
        const data = await CreateCategory(value)
        return data;
    }

    @action
    deleteDocument = async (id) => {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteDocument(param);
        return data;
    }

    @action
    deleteCategory = async (id) => {
        const param = new FormData()
        param.append("id", id)
        const data = await DeleteCategory(param);
        return data;
    }

    @action
    findDocumentTemplatePage = async (value) => {
        Object.assign(this.templatePageParams, { ...value })
        const params = {
            name: this.templatePageParams.name,
            orderParams: [{
                name: "name",
                orderType: "asc"
            }],
            pageParam: {
                pageSize: 10,
                currentPage: this.templatePageParams.current
            }
        }
        const data = await FindDocumentTemplatePage(params)
        return data;
    }

    // 创建文档
    @action
    createDocument = async (params) => {
        const data = await CreateDocument(params);
        return data;
    }

    @action
    updateCategory = async (params) => {
        const data = await UpdateCategory(params);
        return data;
    }
    @action
    updateDocument = async (params) => {
        const data = await UpdateDocument(params);
        return data;
    }


}

export const WIKICATELOGUE_STORE = "wikiCatalogueStore"