'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-user-ui/es/domain-user-list/style');
var _DomainUserList = require('tiklab-user-ui/es/domain-user-list');
var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _DomainUserList__default = /*#__PURE__*/_interopDefaultLegacy(_DomainUserList);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/user/wikiDomainUser.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var WikiDomainUser = function WikiDomainUser(props) {
  var wikiId = JSON.parse(localStorage.getItem("wiki")).id;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      backgroundColor: "#fff",
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_DomainUserList__default["default"], _extends({}, props, {
    domainId: wikiId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 13
    }
  })));
};

var wikiDomainUser = mobxReact.inject("privilegeDomainRoleStore")(mobxReact.observer(WikiDomainUser));

exports["default"] = wikiDomainUser;
