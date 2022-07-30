'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/tooltip/style/css');
var _Tooltip = require('antd/es/tooltip');
var React = require('react');
var xflow = require('@antv/xflow');
require('./node.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(_Tooltip);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMap/components/edge1.js";

var Edge1 = function Edge1(props) {
  xflow.useAppContext(); // console.log('edge useAppContext', ctx);
  // console.log('edge props:', props);

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edge1-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 5
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Tooltip__default["default"], {
    title: "\u8FD9\u662F\u8FDE\u7EBF\u4E0A\u6E32\u67D3\u7684React\u5185\u5BB9" // defaultVisible={true}
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 9
    }
  }, "hover\u6211")));
};

exports["default"] = Edge1;
