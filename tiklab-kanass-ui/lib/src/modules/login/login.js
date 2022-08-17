'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-eam-ui/es/login/style');
var _Login = require('tiklab-eam-ui/es/login');
var React = require('react');
var logo = require('../../assets/images/logo.png.js');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Login__default = /*#__PURE__*/_interopDefaultLegacy(_Login);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/login/login.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ProjectLogin = function ProjectLogin(props) {
  return /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Login__default["default"], _extends({}, props, {
    logoImg: logo["default"],
    loginGoRouter: '/index/home',
    title: '知识库管理',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  })));
};

var login = mobxReact.inject("eamStore")(mobxReact.observer(ProjectLogin));

exports["default"] = login;
