'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var wikiStore = require('./modules/wiki/wiki/store/wikiStore.js');
var wikiDetailStore = require('./modules/wiki/common/store/wikiDetailStore.js');
var search = require('./modules/search/store/search.js');
var wikiLogStore = require('./modules/wiki/common/store/wikiLogStore.js');
var homeStore = require('./modules/home/store/homeStore.js');
var templateStore = require('./modules/template/store/templateStore.js');
var wikiCommon = require('./modules/wiki/common/store/wikiCommon.js');
var shareStore = require('./modules/share/store/shareStore.js');
var wikiWork = require('./modules/wiki/common/store/wikiWork.js');
var surveyStore = require('./modules/wiki/survey/store/surveyStore.js');
var store$1 = require('tiklab-eam-ui/es/store');
var tiklabSlateUi = require('tiklab-slate-ui');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createStores() {
  var _ref;

  return _ref = {}, _defineProperty(_ref, wikiStore.WIKI_STORE, new wikiStore.WikiStore()), _defineProperty(_ref, wikiDetailStore.WIKIDETAIL_STORE, new wikiDetailStore.WikiDetailStore()), _defineProperty(_ref, search.SEARCH_STORE, new search.SearchStore()), _defineProperty(_ref, wikiLogStore.WIKICATELOGUE_STORE, new wikiLogStore.WikiCatalogueStore()), _defineProperty(_ref, tiklabSlateUi.SLATE_STORE, new tiklabSlateUi.SlateStore()), _defineProperty(_ref, templateStore.TEMPLATE_STORE, new templateStore.TemplateStore()), _defineProperty(_ref, wikiCommon.WIKICOMMON_STORE, new wikiCommon.WikiCommon()), _defineProperty(_ref, shareStore.SHARE_STORE, new shareStore.ShareStore()), _defineProperty(_ref, wikiWork.WIKIWORK_STORE, new wikiWork.WikiWork()), _defineProperty(_ref, store$1.EAM_STORE, new store$1.EamStore()), _defineProperty(_ref, homeStore.HOME_STORE, new homeStore.HomeStore()), _defineProperty(_ref, surveyStore.SURVEY_STORE, new surveyStore.SurveyStore()), _ref;
}

var store = createStores();

exports.store = store;
