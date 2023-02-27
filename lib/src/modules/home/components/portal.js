'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-eam-ui/es/verify-user-hoc/style');
var _verifyUserHoc = require('tiklab-eam-ui/es/verify-user-hoc');
var React = require('react');
var logo_k3 = require('../../../assets/images/logo_k3.png.js');
var reactRouterConfig = require('react-router-config');
var localHeader = require('./localHeader.js');
require('./header.scss.js');
var _utils = require('tiklab-plugin-ui/es/_utils');
var search = require('../../search/components/search.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _verifyUserHoc__default = /*#__PURE__*/_interopDefaultLegacy(_verifyUserHoc);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/portal.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Layout = function Layout(props) {
  var route = props.route ? props.route.routes : [];
  var routers = [{
    to: '/index/home',
    title: '首页',
    key: 'home'
  }, {
    to: '/index/wiki',
    title: '知识库',
    key: 'wiki'
  }, {
    to: '/index/sysmgr/systemFeature',
    title: '系统',
    key: 'sysmgr'
  }];

  var projectLogout = function projectLogout() {
    props.history.push({
      pathname: '/logout',
      state: {
        preRoute: props.location.pathname
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(localHeader["default"], _extends({}, props, {
    logo: logo_k3["default"],
    projectLogout: projectLogout,
    search: /*#__PURE__*/React__default["default"].createElement(search["default"], _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 25
      }
    })),
    routers: routers,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  }, reactRouterConfig.renderRoutes(route)));
};

var IndexHoc = _verifyUserHoc__default["default"](Layout, '/noAuth');

function mapStateToProps(state) {
  return {
    pluginStore: state.pluginStore
  };
}

var portal = _utils.connect(mapStateToProps)(IndexHoc);

exports["default"] = portal;
