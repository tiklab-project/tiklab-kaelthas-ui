'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-27 11:07:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-27 13:27:37
 */

function FindAllProject(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/project/findAllProject",
    method: "post",
    data: data
  });
}
function FindWorkItemPage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/workItem/findWorkItemPage",
    method: "post",
    data: data
  });
} // 事项类型

function FindAllWorkType(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/workType/findAllWorkType",
    method: "post",
    data: data
  });
} //获取事项状态

function FindAllWorkStatus(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/workStatus/findAllWorkStatus",
    method: "post",
    data: data
  });
} // 获取用户列表

function FindAllUser(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/user/findAllUser",
    method: "post",
    data: data
  });
} //根据id查找事项

function FindWorkItem(data) {
  return tiklabCoreUi.Axios.request({
    url: "/api/project/workItem/findWorkItem",
    method: "post",
    data: data
  });
}

exports.FindAllProject = FindAllProject;
exports.FindAllUser = FindAllUser;
exports.FindAllWorkStatus = FindAllWorkStatus;
exports.FindAllWorkType = FindAllWorkType;
exports.FindWorkItem = FindWorkItem;
exports.FindWorkItemPage = FindWorkItemPage;
