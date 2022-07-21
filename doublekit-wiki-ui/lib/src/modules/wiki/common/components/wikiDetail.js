'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
var React = require('react');
var wikiDetailAside = require('./wikiDetailAside.js');
require('./wikiDetail.scss.js');
var reactRouterConfig = require('react-router-config');
var mobxReact = require('mobx-react');
require('doublekit-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/common/components/wikiDetail.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WikiDetail = function WikiDetail(props) {
  // 解析props
  var wikiStore = props.wikiStore,
      wikiDetailStore = props.wikiDetailStore,
      systemRoleStore = props.systemRoleStore,
      route = props.route; // 解析wikiStore，wikiDetailStore

  var searchwiki = wikiStore.searchwiki,
      getWikilist = wikiStore.getWikilist,
      wikilist = wikiStore.wikilist;
  var setWikiId = wikiDetailStore.setWikiId;
  systemRoleStore.getInitProjectPermissions; // 当前知识库名字

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      wikiname = _useState2[0],
      setWikiname = _useState2[1]; // 获取当前知识库id


  var wikiId = localStorage.getItem("wikiId");
  React.useEffect(function () {
    // 从信息页面跳入知识库详情页面时，获取知识库id
    var search = props.location.search;

    if (search !== "") {
      search = search.split("=");
      localStorage.setItem("wikiId", search[1]);
      setWikiId(search[1]);
    }

    searchwiki(localStorage.getItem("wikiId")).then(function (res) {
      setWikiname(res.name);
    }); //获取知识库列表

    getWikilist(); // systemRoleStore.getInitProjectPermissions(getUser().userId, localStorage.getItem("wikiId"))

    return;
  }, [wikiId]);
  return /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wikidetail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiDetailAside["default"], _extends({
    wikiName: wikiname,
    wikilist: wikilist,
    searchwiki: searchwiki
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wikidetail-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    className: "wikidetail-content-col",
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 20,
      offset: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 21
    }
  }, reactRouterConfig.renderRoutes(route.routes)))));
};

var wikiDetail = mobxReact.inject("systemRoleStore", 'wikiStore', 'wikiDetailStore')(mobxReact.observer(WikiDetail));

exports["default"] = wikiDetail;
