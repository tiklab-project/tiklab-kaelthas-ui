'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-10 15:59:46
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-15 11:21:43
 */

function CreateComment(data) {
  return tiklabCoreUi.Axios.request({
    url: "/comment/createComment",
    method: "post",
    data: data
  });
} // 添加评论

function FindCommentPage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/comment/findCommentPage",
    method: "post",
    data: data
  });
} // 添加点赞

function CreateLike(data) {
  return tiklabCoreUi.Axios.request({
    url: "/like/createLike",
    method: "post",
    data: data
  });
} // 创建分享

function CreateShare(data) {
  return tiklabCoreUi.Axios.request({
    url: "/share/addShare",
    method: "post",
    data: data
  });
} // 更新分享格式

function UpdateShare(data) {
  return tiklabCoreUi.Axios.request({
    url: "/share/cutHaveOrNotAuthCode",
    method: "post",
    data: data
  });
}

exports.CreateComment = CreateComment;
exports.CreateLike = CreateLike;
exports.CreateShare = CreateShare;
exports.FindCommentPage = FindCommentPage;
exports.UpdateShare = UpdateShare;
