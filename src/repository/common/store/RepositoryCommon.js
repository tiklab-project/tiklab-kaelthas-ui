/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-10 15:56:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-10 16:51:01
 */
import { observable, action} from "mobx";
import {CreateComment,FindCommentPage,CreateLike,CreateShare,UpdateShare} from "../api/RepositoryCommon"
export class RepositoryCommon {
    @observable repositoryCommonList = [];
    @observable commonPageParams = {
        pageParam: {
            pageSize: 10,
            currentPage: 1,
        }
    };
    @action
    createComment = async(value)=> {
        console.log(value)
        const data = await CreateComment(value);
        return data.data;
    }

    @action
    findCommentPage = async(value)=> {
        const data = await FindCommentPage(value)
        return data;
    }

    @action
    createLike = async(value)=> {
        const data = await CreateLike(value)
        return data;
    }

    @action
    createShare = async(value)=> {
        const data = await CreateShare(value)
        return data;
    }

    @action
    updateShare = async(value)=> {
        const data = await UpdateShare(value)
        return data;
    }
}

export const REPOSITORYCOMMON_STORE = "repositoryCommon"