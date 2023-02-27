'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
require('./inputSearch.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/common/input/inputSearch.js";

var InputSearch = function InputSearch(props) {
  var onChange = props.onChange,
      placeholder = props.placeholder;

  var handleChange = function handleChange(value) {
    onChange(value.target.value);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search-input",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 17
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    bordered: false,
    allowClear: true,
    key: "search",
    placeholder: placeholder,
    onChange: function onChange(value) {
      return handleChange(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 13
    }
  }));
};

exports["default"] = InputSearch;
