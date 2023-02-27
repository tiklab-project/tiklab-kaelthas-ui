'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/upload/style/css');
var _Upload = require('antd/es/upload');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/message/style/css');
var _message = require('antd/es/message');
var React = require('react');
var icons = require('@ant-design/icons');
require('./loadData.scss.js');
var breadcrumb = require('../../../common/breadcrumb/breadcrumb.js');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Upload__default = /*#__PURE__*/_interopDefaultLegacy(_Upload);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _message__default = /*#__PURE__*/_interopDefaultLegacy(_message);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/load-data/loadData.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoadData = function LoadData(props) {
  var _uploadProps;

  var ticket = tiklabCoreUi.getUser().ticket;
  var uploadProps = (_uploadProps = {
    name: 'uploadFile',
    action: "".concat(base_url, "/importDate/importJireDate"),
    headers: {
      authorization: 'authorization-text'
    }
  }, _defineProperty(_uploadProps, "headers", {
    ticket: ticket
  }), _defineProperty(_uploadProps, "onChange", function onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      _message__default["default"].success("".concat(info.file.name, " file uploaded successfully"));
    } else if (info.file.status === 'error') {
      _message__default["default"].error("".concat(info.file.name, " file upload failed."));
    }
  }), _uploadProps);
  return /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    lg: {
      span: 24
    },
    xxl: {
      span: "18",
      offset: "3"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "load",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], {
    firstText: "\u7CFB\u7EDF\u96C6\u6210",
    secondText: "jira\u96C6\u6210",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "load-jira",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 25
    }
  }, "\u4ECE\u672C\u5730\u6587\u4EF6\u5BFC\u5165Jira\u6570\u636E"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "load-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 25
    }
  }, "\u4E0A\u4F20\u9644\u4EF6\uFF1A", /*#__PURE__*/React__default["default"].createElement(_Upload__default["default"], _extends({}, uploadProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 29
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    icon: /*#__PURE__*/React__default["default"].createElement(icons.UploadOutlined, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 47
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 33
    }
  }, "\u5BFC\u5165\u5916\u90E8\u6570\u636E")))))));
};

exports["default"] = LoadData;
