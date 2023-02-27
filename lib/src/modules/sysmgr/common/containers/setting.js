'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
require('mobx-react');
var setAside = require('../components/setAside.js');
require('../components/orga.scss.js');
var reactRouterConfig = require('react-router-config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/common/containers/setting.js";
var Sider = _Layout__default["default"].Sider,
    Content = _Layout__default["default"].Content;

var Setting = function Setting(props) {
  var route = props.route;
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "orga",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    width: 200,
    className: "site-layout-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(setAside["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement(Content, {
    className: "orga-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }, reactRouterConfig.renderRoutes(route.routes))));
};

exports["default"] = Setting;
