'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./dnd-node.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMapFlow/components/dnd-node.js";
var DndNode = function DndNode(props) {
  var _props$size = props.size,
      size = _props$size === void 0 ? {
    width: 126,
    height: 104
  } : _props$size,
      data = props.data;
  var width = size.width,
      height = size.height;
  var label = data.label,
      stroke = data.stroke,
      fill = data.fill,
      fontFill = data.fontFill,
      fontSize = data.fontSize;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "container",
    style: {
      width: width,
      height: height,
      borderColor: stroke,
      backgroundColor: fill,
      color: fontFill,
      fontSize: fontSize
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }
  }, label));
};

exports.DndNode = DndNode;
