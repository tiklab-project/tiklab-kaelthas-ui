'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
var reactRouterDom = require('react-router-dom');
require('./documentEdit.scss.js');
var doublekitSlateUi = require('doublekit-slate-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/common/components/documentEdit.js";
_Input__default["default"].Search;

var DocumentEdit = function DocumentEdit(props) {
  var value = props.value,
      onChange = props.onChange,
      docInfo = props.docInfo;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, docInfo.name, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "examine-type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 58
    }
  }, "\u7C7B\u578B\uFF1A", docInfo.formatType === "document" ? "文档" : "目录")), /*#__PURE__*/React__default["default"].createElement(doublekitSlateUi.DocumentEditor, {
    onChange: onChange,
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 13
    }
  }));
};

var DocumentEdit$1 = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(mobxReact.observer(reactRouterDom.withRouter(DocumentEdit)));

exports["default"] = DocumentEdit$1;
