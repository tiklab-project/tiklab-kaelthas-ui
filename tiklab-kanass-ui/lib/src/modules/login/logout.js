'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-eam-ui/es/logout/style');
var _Logout = require('tiklab-eam-ui/es/logout');
var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Logout__default = /*#__PURE__*/_interopDefaultLegacy(_Logout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/login/logout.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ProjectLogout = function ProjectLogout(props) {
  return /*#__PURE__*/React__default["default"].createElement(_Logout__default["default"], _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 9
    }
  }));
};

var logout = mobxReact.inject("eamStore")(mobxReact.observer(ProjectLogout));

exports["default"] = logout;
