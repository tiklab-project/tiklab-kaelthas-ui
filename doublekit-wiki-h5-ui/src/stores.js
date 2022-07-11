/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-23 09:51:20
 */
import { createContext } from 'react';


import {LOGIN_STATUS,LoginStore} from "doublekit-portal-h5";
import {SlateStore,SLATE_STORE} from "doublekit-slate-h5-ui"
function createStores() {
    return {
        [LOGIN_STATUS]:new LoginStore(),
        [SLATE_STORE]:new SlateStore(),
    }
}

const store = createStores();

export default store;