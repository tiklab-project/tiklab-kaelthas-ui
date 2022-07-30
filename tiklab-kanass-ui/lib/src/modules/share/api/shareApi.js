'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-15 13:20:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-15 13:58:10
 */

function DocumentView(data) {
  return tiklabCoreUi.Axios.request({
    url: "/document/view",
    method: "post",
    data: data
  });
} // 获取评论

function CommnetView(data) {
  return tiklabCoreUi.Axios.request({
    url: "/comment/view",
    method: "post",
    data: data
  });
} // 验证密码

function VerifyAuthCode(data) {
  return tiklabCoreUi.Axios.request({
    url: "/share/verifyAuthCode ",
    method: "post",
    data: data
  });
} // 判断是否需要验证码

function JudgeAuthCode(data) {
  return tiklabCoreUi.Axios.request({
    url: "/share/judgeAuthCode  ",
    method: "post",
    data: data
  });
}

exports.CommnetView = CommnetView;
exports.DocumentView = DocumentView;
exports.JudgeAuthCode = JudgeAuthCode;
exports.VerifyAuthCode = VerifyAuthCode;
