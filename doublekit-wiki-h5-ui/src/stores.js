/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-23 09:51:20
 */
import { createContext } from 'react';

import {WIKIREPOSITORY_STORE,WikiRepositoryStore} from "./modules/wiki/store/wikiRepositoryStore";

import {WIKICATELOGUE_STORE,WikiCatalogueStore} from "./modules/wikiDetail/store/repository";

function createStores() {
    return {
        [WIKIREPOSITORY_STORE]: new WikiRepositoryStore(),
        [WIKICATELOGUE_STORE]: new WikiCatalogueStore()
    }
}

const store = createStores();

export default store;