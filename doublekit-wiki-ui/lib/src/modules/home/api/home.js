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

function StatProjectWorkItem(data) {
  return doublekitCoreUi.Axios.request({
    url: "/workItemStat/statProjectWorkItem",
    method: "post",
    data: data
  });
} // 获取我的事项统计

function StatWorkItemByBusStatus(data) {
  return doublekitCoreUi.Axios.request({
    url: "/workItemStat/statWorkItemByBusStatus",
    method: "post",
    data: data
  });
} // 获取我的迭代统计

function ManageSprint(data) {
  return doublekitCoreUi.Axios.request({
    url: "/workItemStat/statManageSprint",
    method: "post",
    data: data
  });
} // 获取所有事项分类

function WorkType(data) {
  return doublekitCoreUi.Axios.request({
    url: "/workType/findAllWorkType",
    method: "post",
    data: data
  });
} // 获取所有事项状态

function FindWorkStatusListBySorts(data) {
  return doublekitCoreUi.Axios.request({
    url: "/workStatus/findWorkStatusListBySorts",
    method: "post",
    data: data
  });
}

exports.FindWorkStatusListBySorts = FindWorkStatusListBySorts;
exports.ManageSprint = ManageSprint;
exports.StatProjectWorkItem = StatProjectWorkItem;
exports.StatWorkItemByBusStatus = StatWorkItemByBusStatus;
exports.WorkType = WorkType;
