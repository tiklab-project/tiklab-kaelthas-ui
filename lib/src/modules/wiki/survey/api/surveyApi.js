'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../../common/utils/requset.js');
var tiklabCoreUi = require('tiklab-core-ui');

function FindRepository(data) {
  return tiklabCoreUi.Axios.request({
    url: "/repository/findRepository",
    method: "post",
    data: data
  });
}
function Findlogpage(data) {
  return tiklabCoreUi.Axios.request({
    url: "/oplog/findlogpage",
    method: "post",
    data: data
  });
}

exports.FindRepository = FindRepository;
exports.Findlogpage = Findlogpage;
