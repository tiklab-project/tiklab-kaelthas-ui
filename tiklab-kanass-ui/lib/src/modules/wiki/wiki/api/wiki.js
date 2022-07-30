'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:01:48
 */

function GetAllWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/project/findAllProject ",
    method: "post",
    data: data
  });
} // 请求接口

function GetWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/findRepositoryPage",
    method: "post",
    data: data
  });
} // 添加知识库

function AddWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/createRepository",
    method: "post",
    data: data
  });
}
function DeleWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/deleteRepository",
    method: "post",
    data: data
  });
}
function UpdateWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/updateRepository",
    method: "post",
    data: data
  });
}
function SearchWikiList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/findRepositoryList",
    method: "post",
    data: data
  });
}
function SearchWiki(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/findRepository",
    method: "post",
    data: data
  });
} // 查找所有事项类型

function GetWikiTypeList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/projectType/findAllProjectType",
    method: "post",
    data: data //请求类型为post 时，
    // params: data 请求类型为get时

  });
} // 查找所有用户类型

function GetUseList(data) {
  return tiklabCoreUi.Axios.request({
    url: "/user/findAllUser",
    method: "post",
    data: data //请求类型为post 时，
    // params: data 请求类型为get时

  });
}
function CreateDocumentRecent(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentRecent/createDocumentRecent",
    method: "post",
    data: data
  });
}

exports.AddWikiList = AddWikiList;
exports.CreateDocumentRecent = CreateDocumentRecent;
exports.DeleWikiList = DeleWikiList;
exports.GetAllWikiList = GetAllWikiList;
exports.GetUseList = GetUseList;
exports.GetWikiList = GetWikiList;
exports.GetWikiTypeList = GetWikiTypeList;
exports.SearchWiki = SearchWiki;
exports.SearchWikiList = SearchWikiList;
exports.UpdateWikiList = UpdateWikiList;
