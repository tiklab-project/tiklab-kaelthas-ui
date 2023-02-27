'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-licence-ui/es/version/style');
var _Version = require('tiklab-licence-ui/es/version');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Version__default = /*#__PURE__*/_interopDefaultLegacy(_Version);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/version/version.js";

var ProjectAuthConfig = function ProjectAuthConfig(props) {
  var dataSource = [{
    key: '1',
    title: "基本功能",
    feature: '项目管理',
    ce: false,
    ee: true,
    rowSpan: 4
  }, {
    key: '2',
    title: "基本功能",
    feature: '迭代管理',
    ce: false,
    ee: true,
    rowSpan: 0
  }, {
    key: '3',
    title: "基本功能",
    feature: '事项追踪',
    ce: false,
    ee: true,
    rowSpan: 0
  }, {
    key: '4',
    title: "基本功能",
    feature: '项目集管理',
    ce: true,
    ee: true,
    rowSpan: 0
  }, {
    key: '5',
    title: "升级功能",
    feature: '日历视图',
    ce: false,
    ee: true,
    rowSpan: 2
  }, {
    key: '6',
    title: "升级功能",
    feature: '甘特图',
    ce: true,
    ee: true,
    rowSpan: 0
  }, {
    key: '7',
    title: "",
    feature: '',
    colSpan: 4,
    rowSpan: 1
  }];
  return /*#__PURE__*/React__default["default"].createElement(_Version__default["default"], {
    bgroup: "teamwire",
    data: dataSource,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  });
};

exports["default"] = ProjectAuthConfig;
