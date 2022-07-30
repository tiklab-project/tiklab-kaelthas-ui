'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-privilege-ui/es/domain-role-list/style');
var _DomainRoleList = require('tiklab-privilege-ui/es/domain-role-list');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _DomainRoleList__default = /*#__PURE__*/_interopDefaultLegacy(_DomainRoleList);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/user/wikiDomainRole.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var WikiDomainRole = function WikiDomainRole(props) {
  var wikiId = JSON.parse(localStorage.getItem("wiki")).id;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      backgroundColor: "#fff",
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_DomainRoleList__default["default"], _extends({}, props, {
    domainId: wikiId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  })));
};

exports["default"] = WikiDomainRole;
