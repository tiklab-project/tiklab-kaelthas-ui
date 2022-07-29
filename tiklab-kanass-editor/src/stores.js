/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 13:49:39
 */
import {SLATE_STORE,SlateStore} from "./modules/edit-slate/store/slateStore"

function createStores() {
    return {
        [SLATE_STORE]: new SlateStore()
    };
}

const store = createStores();

export {
    store
}