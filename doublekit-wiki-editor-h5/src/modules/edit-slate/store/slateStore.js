/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 13:48:56
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 13:48:56
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-27 15:54:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-22 09:14:36
 */
import { observable, action} from "mobx";
import { Upload } from "../api/editSlate"
export class SlateStore {
    @observable showMenu = false;

    @action
    setShowMenu = (value) => {
        this.showMenu = value;
    }

    @action
    upload = async(file) => {
        const params = new FormData();
        params.append("uploadFile",file)
        const data = await Upload(params);
        return data;
    }
}
export const SLATE_STORE = "slatestore"