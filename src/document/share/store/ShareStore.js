/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-15 13:23:14
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-15 14:50:10
 */
import { observable, action } from "mobx";
import { Service } from "../../../common/utils/requset";
export class ShareStore {

    @action
    documentView = async(value)=> {
        const params = new FormData()
        params.append("id", value.documentId)
        const data = await Service("/document/view", params);
        return data;
    }

    @action
    commentView = async(value)=> {
        const data = await Service("/comment/view", value);
        return data;
    }

    @action
    verifyAuthCode = async(value)=> {
        const data = await Service("/share/verifyAuthCode", value);
        return data;
    }

    @action
    judgeAuthCode = async(value)=> {
        const params = new FormData()
        params.append("shareLink", value.shareLink)
        const data = await Service("/share/judgeAuthCode", value);
        return data;
    }
}
export const SHARE_STORE = "shareStore"
