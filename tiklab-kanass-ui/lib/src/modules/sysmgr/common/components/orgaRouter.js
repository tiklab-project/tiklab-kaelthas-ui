'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:09:01
 */
var orgaRouter = [{
  title: "组织管理",
  icon: 'category',
  key: '/index/organ/organ',
  encoded: "SysOrga",
  code: 1 - 1
}, {
  title: '用户管理',
  icon: 'category',
  key: '/index/organ/user',
  encoded: "SysUser",
  code: 1 - 2
}, {
  title: "目录管理",
  icon: 'category',
  key: '/index/organ/directory',
  encoded: "SysMessage",
  code: 1 - 3
}];

exports["default"] = orgaRouter;
