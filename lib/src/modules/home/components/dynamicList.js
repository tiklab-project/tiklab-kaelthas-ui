'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/select/style/css');
var _Select = require('antd/es/select');
var React = require('react');
var breadcrumb = require('../../../common/breadcrumb/breadcrumb.js');
var mobxReact = require('mobx-react');
var tiklabCoreUi = require('tiklab-core-ui');
require('./dynamicList.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Select__default = /*#__PURE__*/_interopDefaultLegacy(_Select);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/dynamicList.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DynamicList = function DynamicList(props) {
  var homeStore = props.homeStore,
      wikiStore = props.wikiStore;
  var findLogpage = homeStore.findLogpage,
      opLogList = homeStore.opLogList;
  var findRepositoryList = wikiStore.findRepositoryList,
      wikilist = wikiStore.wikilist;
  var userId = tiklabCoreUi.getUser().userId;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      firstText = _useState4[0],
      setFirstText = _useState4[1];

  var wikiId = props.match.params.wikiId;
  React.useEffect(function () {
    if (props.route.path === "/index/dynamic") {
      setFirstText("首页");
      findRepositoryList({});
      findLogpage({
        userId: userId
      });
    }

    console.log(props);

    if (props.route.path === "/index/wikidetail/:wikiId/dynamicList") {
      setFirstText("知识库概况");
      findLogpage({
        userId: userId,
        repositoryId: wikiId
      });
    }

    return;
  }, []);

  var selectProject = function selectProject(option) {
    console.log(option);
    findLogpage({
      userId: userId,
      repositoryId: option
    }); // getModuleList(option)
    // getsprintlist(option)
    // getSelectUserList(option);
  }; // useEffect(() => {
  //     const dynamicValue = {
  //         pageSize: 20
  //     }
  //     findDynamicPage(dynamicValue).then(res => {
  //         if(res.code === 0) {
  //             setDynamicList(res.data.dataList)
  //         }
  //     })
  //     return;
  // },[])


  return /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "dynamic-row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 18,
      offset: 3
    },
    md: {
      span: 20,
      offset: 2
    },
    className: "dynamic-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-list-page",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-list-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], _extends({}, props, {
    firstText: firstText,
    secondText: "\u65E5\u5FD7\u5217\u8868" // firstUrl="/index/home"
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-filter",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    placeholder: "\u77E5\u8BC6\u5E93",
    allowClear: true,
    className: "dynamic-select",
    key: "selectProject",
    onSelect: selectProject,
    width: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 29
    }
  }, wikilist && wikilist.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
      value: item.id,
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 48
      }
    }, item.name);
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 21
    }
  }, opLogList && opLogList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.data
      },
      className: "dynamic-list-item",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 40
      }
    });
  })))));
};

var dynamicList = mobxReact.inject('homeStore', 'wikiStore')(mobxReact.observer(DynamicList));

exports["default"] = dynamicList;
