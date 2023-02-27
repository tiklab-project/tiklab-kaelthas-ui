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
 * @LastEditTime: 2021-12-21 15:25:35
 */

function FindWikiCatalogue(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/findCategoryListTree",
    method: "post",
    data: data
  });
}
function AddWikiCatalogue(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/createCategory",
    method: "post",
    data: data
  });
} //更新目录

function UpdateWikiCatalogue(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/updateCategory",
    method: "post",
    data: data
  });
} // // 根据id查找目录
// export function FindWikiCatalogueById(data){
//     return service.request({
//         url: "/category/findCategory",
//         method: "post",
//         data
//     })
// }

function DetailWikiLog(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/findCategory",
    method: "post",
    data: data
  });
} // 删除目录

function DeleteWikiLog(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/deleteCategory",
    method: "post",
    data: data
  });
} // 创建文档

function AddWikiCataDocument(data) {
  return tiklabCoreUi.Axios.request({
    url: "/document/createDocument",
    method: "post",
    data: data
  });
} // 更新文档

function UpdateDocument(data) {
  return tiklabCoreUi.Axios.request({
    url: "/document/updateDocument",
    method: "post",
    data: data
  });
} // 获取文档

function FindDocument(data) {
  return tiklabCoreUi.Axios.request({
    url: "/document/findDocument",
    method: "post",
    data: data
  });
} // 上传附件

function Upload(data) {
  return tiklabCoreUi.Axios.request({
    url: "/dfs/upload",
    method: "post",
    data: data
  });
} // 删除文档

function DeleteDocument(data) {
  return tiklabCoreUi.Axios.request({
    url: "/document/deleteDocument",
    method: "post",
    data: data
  });
} // 根据id 查找目录的第一级文档

function FindCategoryDocument(data) {
  return tiklabCoreUi.Axios.request({
    url: "/category/findCategoryDocument",
    method: "post",
    data: data
  });
} // 根据id 查找知识库成员

function FindDmPrjRolePage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/dmUser/findDmUserPage",
    method: "post",
    data: data
  });
}
function CreateDocumentRecent(data) {
  return tiklabCoreUi.Axios.request({
    url: "/documentRecent/createDocumentRecent",
    method: "post",
    data: data
  });
}

exports.AddWikiCataDocument = AddWikiCataDocument;
exports.AddWikiCatalogue = AddWikiCatalogue;
exports.CreateDocumentRecent = CreateDocumentRecent;
exports.DeleteDocument = DeleteDocument;
exports.DeleteWikiLog = DeleteWikiLog;
exports.DetailWikiLog = DetailWikiLog;
exports.FindCategoryDocument = FindCategoryDocument;
exports.FindDmPrjRolePage = FindDmPrjRolePage;
exports.FindDocument = FindDocument;
exports.FindWikiCatalogue = FindWikiCatalogue;
exports.UpdateDocument = UpdateDocument;
exports.UpdateWikiCatalogue = UpdateWikiCatalogue;
exports.Upload = Upload;
