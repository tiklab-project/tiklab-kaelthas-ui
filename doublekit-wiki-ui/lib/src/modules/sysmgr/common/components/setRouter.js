'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 10:20:12
 */
var orgaRouter = [{
  title: '权限中心',
  icon: 'systemcenter',
  key: "/index/sysmgr/systemFeature",
  encoded: "system",
  children: [{
    title: '功能管理',
    icon: 'systemcenter',
    key: '/index/sysmgr/systemFeature',
    encoded: "systemFeature"
  }, {
    title: '角色管理',
    icon: 'systemcenter',
    key: '/index/sysmgr/systemRole',
    encoded: "systemRole"
  }, {
    title: '功能管理',
    icon: 'projectpriviliage',
    key: '/index/sysmgr/projectFeature',
    encoded: "projectFeature"
  }, {
    title: '角色管理',
    icon: 'projectpriviliage',
    key: '/index/sysmgr/projectRole',
    encoded: "projectRole"
  }]
}, // {
//     title: "目录管理",
//     icon: 'category',
//     key: '/index/sysmgr/loadData',
//     encoded: "LoadData",
// },
{
  title: "licence管理",
  icon: 'category',
  key: '/index/sysmgr/licence',
  encoded: "Licence"
}, {
  title: "插件管理",
  icon: 'category',
  key: '/index/sysmgr/plugin',
  encoded: "Plugin"
}];

exports["default"] = orgaRouter;
