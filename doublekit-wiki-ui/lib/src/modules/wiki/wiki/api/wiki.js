'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../common/utils/requset.js');
var doublekitCoreUi = require('doublekit-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:01:48
 */

function GetAllWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/project/findAllProject ",
    method: "post",
    data: data
  });
} // 请求接口

function GetWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/findRepositoryPage",
    method: "post",
    data: data
  });
} // 添加知识库

function AddWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/createRepository",
    method: "post",
    data: data
  });
}
function DeleWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/deleteRepository",
    method: "post",
    data: data
  });
}
function UpdateWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/updateRepository",
    method: "post",
    data: data
  });
}
function SearchWikiList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/findRepositoryList",
    method: "post",
    data: data
  });
}
function SearchWiki(data) {
  return doublekitCoreUi.Axios.request({
    url: "/repository/findRepository",
    method: "post",
    data: data
  });
} // 查找所有事项类型

function GetWikiTypeList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/projectType/findAllProjectType",
    method: "post",
    data: data //请求类型为post 时，
    // params: data 请求类型为get时

  });
} // 查找所有用户类型

function GetUseList(data) {
  return doublekitCoreUi.Axios.request({
    url: "/user/findAllUser",
    method: "post",
    data: data //请求类型为post 时，
    // params: data 请求类型为get时

  });
}

exports.AddWikiList = AddWikiList;
exports.DeleWikiList = DeleWikiList;
exports.GetAllWikiList = GetAllWikiList;
exports.GetUseList = GetUseList;
exports.GetWikiList = GetWikiList;
exports.GetWikiTypeList = GetWikiTypeList;
exports.SearchWiki = SearchWiki;
exports.SearchWikiList = SearchWikiList;
exports.UpdateWikiList = UpdateWikiList;