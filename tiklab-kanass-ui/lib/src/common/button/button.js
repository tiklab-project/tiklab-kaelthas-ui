'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./button.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/common/button/button.js";

var Button = function Button(props) {
  var buttonText = props.buttonText,
      children = props.children,
      onClick = props.onClick,
      type = props.type,
      style = props.style;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    onClick: onClick,
    style: style,
    className: "project-botton ".concat(type === "primary" ? "project-primary" : "project-dashed"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 3
    }
  }, children, buttonText);
};

exports["default"] = Button;
