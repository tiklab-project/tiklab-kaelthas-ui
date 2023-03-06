/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-29 17:53:09
 */
import { createContext } from 'react';

import {REPOSITORY_STORE,RepositoryStore} from "./repository/repository/store/RepositoryStore";
import {REPOSITORYDETAIL_STORE,RepositoryDetailStore} from "./repository/common/store/RepositoryDetailStore";
import {SEARCH_STORE,SearchStore} from "./home/search/store/search";
import {REPOSITORYCATELOGUE_STORE,RepositoryCatalogueStore} from "./repository/common/store/RepositoryLogStore"
import {HOME_STORE, HomeStore} from "./home/home/store/homeStore"
import {TEMPLATE_STORE,TemplateStore} from "./setting/template/store/templateStore"
import {REPOSITORYCOMMON_STORE,RepositoryCommon} from "./repository/common/store/RepositoryCommon"
import {SHARE_STORE,ShareStore} from "./document/share/store/ShareStore"
import {REPOSITORYWORK_STORE,RepositoryWork} from "./repository/common/store/RepositoryWork";
import {SURVEY_STORE, SurveyStore} from "./repository/survey/store/SurveyStore";

import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store';
import {SLATE_STORE,SlateStore} from "tiklab-slate-ui"

function createStores() {
    return {
        [REPOSITORY_STORE]:new RepositoryStore(),
        [REPOSITORYDETAIL_STORE]: new RepositoryDetailStore(),
        [SEARCH_STORE]: new SearchStore(),
        [REPOSITORYCATELOGUE_STORE]: new RepositoryCatalogueStore(),
        [SLATE_STORE]: new SlateStore(),
        [TEMPLATE_STORE]: new TemplateStore(),
        [REPOSITORYCOMMON_STORE]: new RepositoryCommon(),
        [SHARE_STORE]: new ShareStore(),
        [REPOSITORYWORK_STORE]: new RepositoryWork(),
        [EAM_STORE]: new EamStore(),
        [HOME_STORE]: new HomeStore(),
        [SURVEY_STORE]: new SurveyStore()
    };
}

const store = createStores();

export {
    store
}