'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-privilege-ui/es/system-role-list/style');
var _SystemRoleList = require('tiklab-privilege-ui/es/system-role-list');
var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _SystemRoleList__default = /*#__PURE__*/_interopDefaultLegacy(_SystemRoleList);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/privilege/systemRole.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SystemRoleWrap = function SystemRoleWrap(props) {
  return /*#__PURE__*/React__default["default"].createElement(_SystemRoleList__default["default"], _extends({}, props, {
    bgroup: 'teamwire',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 13
    }
  }));
};

var systemRole = mobxReact.inject("systemRoleStore")(mobxReact.observer(SystemRoleWrap));

exports["default"] = systemRole;
