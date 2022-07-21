'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
require('mobx-react');
var orgaAside = require('./orgaAside.js');
require('./orga.scss.js');
var reactRouterConfig = require('react-router-config');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/sysmgr/common/components/orga.js";
var Sider = _Layout__default["default"].Sider,
    Content = _Layout__default["default"].Content;

var Orga = function Orga(props) {
  var route = props.route;
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "orga",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    width: 200,
    className: "site-layout-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(orgaAside["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement(Content, {
    className: "orga-background",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 20,
      offset: 2
    },
    style: {
      padding: "10px"
    },
    className: "orga-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 25
    }
  }, reactRouterConfig.renderRoutes(route.routes))))));
};

var orga = reactRouter.withRouter(Orga);

exports["default"] = orga;
