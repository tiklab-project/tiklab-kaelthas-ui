/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-29 17:53:09
 */
import { createContext } from 'react';

import {WIKI_STORE,WikiStore} from "./repository/repository/store/WikiStore";
import {WIKIDETAIL_STORE,WikiDetailStore} from "./repository/common/store/WikiDetailStore";
import {SEARCH_STORE,SearchStore} from "./home/search/store/search";
import {WIKICATELOGUE_STORE,WikiCatalogueStore} from "./repository/common/store/WikiLogStore"
import {HOME_STORE, HomeStore} from "./home/home/store/homeStore"
import {TEMPLATE_STORE,TemplateStore} from "./setting/template/store/templateStore"
import {WIKICOMMON_STORE,WikiCommon} from "./repository/common/store/WikiCommon"
import {SHARE_STORE,ShareStore} from "./document/share/store/ShareStore"
import {WIKIWORK_STORE,WikiWork} from "./repository/common/store/WikiWork";
import {SURVEY_STORE, SurveyStore} from "./repository/survey/store/SurveyStore";

import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store';
import {SLATE_STORE,SlateStore} from "tiklab-slate-ui"

function createStores() {
    return {
        [WIKI_STORE]:new WikiStore(),
        [WIKIDETAIL_STORE]: new WikiDetailStore(),
        [SEARCH_STORE]: new SearchStore(),
        [WIKICATELOGUE_STORE]: new WikiCatalogueStore(),
        [SLATE_STORE]: new SlateStore(),
        [TEMPLATE_STORE]: new TemplateStore(),
        [WIKICOMMON_STORE]: new WikiCommon(),
        [SHARE_STORE]: new ShareStore(),
        [WIKIWORK_STORE]: new WikiWork(),
        [EAM_STORE]: new EamStore(),
        [HOME_STORE]: new HomeStore(),
        [SURVEY_STORE]: new SurveyStore()
    };
}

const store = createStores();

export {
    store
}