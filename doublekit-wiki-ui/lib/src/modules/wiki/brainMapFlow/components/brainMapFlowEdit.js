'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
require('./brainMapFlowEdit.scss.js');
var reactRouterDom = require('react-router-dom');
var brainMapFlow = require('./brainMapFlow.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/brainMapFlow/components/brainMapFlowEdit.js";
_Input__default["default"].Search;

var DocumentEdit = function DocumentEdit(props) {
  props.value;
      props.onChange;
      var docInfo = props.docInfo,
      graphData = props.graphData,
      setGraphData = props.setGraphData;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, docInfo.name, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "examine-type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 58
    }
  }, "\u7C7B\u578B\uFF1A\u8111\u56FE")), /*#__PURE__*/React__default["default"].createElement(brainMapFlow["default"], {
    graphData: graphData,
    setGraphData: setGraphData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }));
};

var BrainMapFlowEdit = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(mobxReact.observer(reactRouterDom.withRouter(DocumentEdit)));

exports["default"] = BrainMapFlowEdit;
