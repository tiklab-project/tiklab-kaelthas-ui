/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-18 09:44:02
 */
import { observable, action  } from "mobx";
import { Service } from "../../../common/utils/requset";
//删除事项
export class SearchStore{
    @observable searchList = []
    @observable sortList = []
    @observable keyword = ""
    @observable searchCondition = {
        pageSize: 10,
        currentPage: 1
    }

    @action
    setKeyWord = (value) => {
        this.keyword = value
    }
    @action
    getSearch = async(value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        const data = await Service("/search/searchForTop",value);
        if(data.code=== 0){
            this.searchList = data.data.responseList;
        }
        return data;
    }

    @action
    getSearchSore = async(value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        const data = await Service("/search/searchForCount",value);
        if(data.code=== 0){
            this.sortList = data.data.responseList;
        }
        return data;
    }

    @action
    searchForPage = async(value) => {
        Object.assign(this.searchCondition, {...value})
        const params={
            index: this.searchCondition.index,
            keyword: this.searchCondition.keyword,
            pageCondition: {
                pageSize: 10,
                currentPage: this.searchCondition.currentPage,
                lastRecord: this.searchCondition.lastRecord,
            }
        }
        const data = await Service("/search/searchForPage",params);
        if(data.code=== 0){
            this.searchCondition.total = response.data.totalRecord;
        }
        return data;
    }
}

export const SEARCH_STORE = "searchStore"