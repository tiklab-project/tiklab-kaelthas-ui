'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('doublekit-privilege-ui/es/system-role-list/style');
var _SystemRoleList = require('doublekit-privilege-ui/es/system-role-list');
var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _SystemRoleList__default = /*#__PURE__*/_interopDefaultLegacy(_SystemRoleList);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/sysmgr/privilege/projectRole.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ProjectRole = function ProjectRole(props) {
  console.log(props);
  return (
    /*#__PURE__*/
    // <div className="test">
    React__default["default"].createElement(_SystemRoleList__default["default"], _extends({
      group: 'system'
    }, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 13
      }
    })) // </div>

  );
};

var projectRole = mobxReact.inject("privilegeDomainRoleStore")(mobxReact.observer(ProjectRole));

exports["default"] = projectRole;
