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
  title: "模板管理",
  icon: 'category',
  key: '/index/sysmgr/template',
  encoded: "LoadData"
}, {
  title: '权限中心',
  icon: 'systemcenter',
  key: "/index/sysmgr/systemFeature",
  encoded: "system",
  children: [{
    title: '系统功能管理',
    icon: 'systemcenter',
    key: '/index/sysmgr/systemFeature',
    encoded: "systemFeature"
  }, {
    title: '系统角色管理',
    icon: 'systemcenter',
    key: '/index/sysmgr/systemRole',
    encoded: "systemRole"
  }, {
    title: '项目功能管理',
    icon: 'projectpriviliage',
    key: '/index/sysmgr/projectFeature',
    encoded: "projectFeature"
  }, {
    title: '项目角色管理',
    icon: 'projectpriviliage',
    key: '/index/sysmgr/projectRole',
    encoded: "projectRole"
  }]
}, {
  title: "消息中心",
  icon: 'messagecenter',
  key: '/index/sysmgr/messageTemplate',
  encoded: "SysMessage",
  code: 7,
  children: [{
    title: '消息管理',
    icon: 'messagecenter',
    key: '/index/sysmgr/messageManagement',
    encoded: "SysMessageManagement",
    code: 7 - 1
  }, {
    title: '消息模板管理',
    icon: 'messagecenter',
    key: '/index/sysmgr/messageTemplate',
    encoded: "SysMessageTemplate",
    code: 7 - 2
  }, {
    title: '消息类型管理',
    icon: 'messagecenter',
    key: '/index/sysmgr/messageType',
    encoded: "SysMessageType",
    code: 7 - 3
  }, {
    title: '消息发送方式',
    icon: 'messagecenter',
    key: '/index/sysmgr/messageSendType',
    encoded: "SysMessageType",
    code: 7 - 4
  }]
}, {
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
