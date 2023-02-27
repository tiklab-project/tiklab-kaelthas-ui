'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-08 14:23:23
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:15:20
 */

function GreateDocumentTemplate(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentTemplate/createDocumentTemplate",
    method: "post",
    data: data
  });
} // 获取模板列表

function FindDocumentTemplatePage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentTemplate/findDocumentTemplatePage",
    method: "post",
    data: data
  });
} // 通过id查询文档模板

function FindDocumentTemplate(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentTemplate/findDocumentTemplate",
    method: "post",
    data: data
  });
} // 更新模板

function UpdateDocumentTemplate(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentTemplate/updateDocumentTemplate",
    method: "post",
    data: data
  });
} // 删除模板

function DeleteDocumentTemplate(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentTemplate/deleteDocumentTemplate",
    method: "post",
    data: data
  });
}

exports.DeleteDocumentTemplate = DeleteDocumentTemplate;
exports.FindDocumentTemplate = FindDocumentTemplate;
exports.FindDocumentTemplatePage = FindDocumentTemplatePage;
exports.GreateDocumentTemplate = GreateDocumentTemplate;
exports.UpdateDocumentTemplate = UpdateDocumentTemplate;
