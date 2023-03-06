/*
 * @Descripttion: 知识库详情store
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-31 13:26:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-05-08 14:36:00
 */
import { observable, action} from "mobx";

export class RepositoryDetailStore {
    // 知识库id
    @observable repositoryId = "";

    // 迭代id
    @observable sprintId = "";

    /**
     * 设置知识库id
     * @param {*} id 
     */
    @action
    setRepositoryId = (id)=> {
        this.repositoryId = id;
    }

    /**
     * 设置迭代id
     * @param {*} id 
     */
    @action
    setSprintId = (id)=> {
        this.sprintId = id;
    }

    
}

export const REPOSITORYDETAIL_STORE = "repositoryDetailStore"