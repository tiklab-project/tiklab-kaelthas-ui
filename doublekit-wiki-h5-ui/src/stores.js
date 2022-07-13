/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-23 09:51:20
 */
import { createContext } from 'react';
import {SlateStore,SLATE_STORE} from "doublekit-slate-h5-ui"
import {WIKIREPOSITORY_STORE,WikiRepositoryStore} from "./modules/wiki/store/wikiRepositoryStore";

import {WIKICATELOGUE_STORE,WikiCatalogueStore} from "./modules/wikiDetail/store/repository";
import {WIKICATEGORY_STORE, WikiCategoryStore} from "./modules/category/store/categoryStore"
import {DOCUMENTCOMMON_STORE, DocumentCommon} from "./modules/category/store/doucmentCommon"
import {TEMPLATE_STORE,TemplateStore } from "./modules/template/store/templateStore"
function createStores() {
    return {
        [WIKIREPOSITORY_STORE]: new WikiRepositoryStore(),
        [WIKICATELOGUE_STORE]: new WikiCatalogueStore(),
        [WIKICATEGORY_STORE]: new WikiCategoryStore(),
        [DOCUMENTCOMMON_STORE]: new DocumentCommon(),
        [SLATE_STORE]: new SlateStore(),
        [TEMPLATE_STORE]: new TemplateStore()
    }
}

const store = createStores();

export default store;