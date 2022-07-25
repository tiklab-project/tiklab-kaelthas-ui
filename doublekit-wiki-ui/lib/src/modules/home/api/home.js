'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../common/utils/requset.js');
var doublekitCoreUi = require('doublekit-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-11-22 14:02:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-11-23 09:13:59
 */
function FindDocumentList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/document/findDocumentList",
    method: "post",
    data: data
  });
}
function FindDocumentRecentList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/documentRecent/findDocumentRecentList",
    method: "post",
    data: data
  });
}

exports.FindDocumentList = FindDocumentList;
exports.FindDocumentRecentList = FindDocumentRecentList;
