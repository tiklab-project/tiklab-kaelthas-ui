'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

function Search(data) {
  return tiklabCoreUi.Axios.request({
    url: "/search/searchForTop",
    method: "post",
    data: data //请求类型为post 时，
    // params: data 请求类型为get时

  });
}
function SearchSort(data) {
  return tiklabCoreUi.Axios.request({
    url: "/search/searchForCount",
    method: "post",
    data: data
  });
}
function SearchForPage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/search/searchForPage",
    method: "post",
    data: data
  });
}

exports.Search = Search;
exports.SearchForPage = SearchForPage;
exports.SearchSort = SearchSort;
