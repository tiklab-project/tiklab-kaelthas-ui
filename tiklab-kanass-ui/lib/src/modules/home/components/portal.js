'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-eam-ui/es/verify-user-hoc/style');
var _verifyUserHoc = require('tiklab-eam-ui/es/verify-user-hoc');
require('tiklab-eam-ui/es/use-work-app-config/style');
var _useWorkAppConfig3 = require('tiklab-eam-ui/es/use-work-app-config');
var React = require('react');
var logo_k = require('../../../assets/images/logo_k.png.js');
var reactRouterConfig = require('react-router-config');
var localHeader = require('./localHeader.js');
require('./header.scss.js');
var search = require('../../search/components/search.js');
var _utils = require('tiklab-plugin-ui/es/_utils');
var apiboxImg = require('tiklab-eam-ui/es/assests/img/apibox.png');
var jenkinsImg = require('tiklab-eam-ui/es/assests/img/jenkins.png');
var projectImg = require('tiklab-eam-ui/es/assests/img/project.png');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _verifyUserHoc__default = /*#__PURE__*/_interopDefaultLegacy(_verifyUserHoc);
var _useWorkAppConfig3__default = /*#__PURE__*/_interopDefaultLegacy(_useWorkAppConfig3);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var apiboxImg__default = /*#__PURE__*/_interopDefaultLegacy(apiboxImg);
var jenkinsImg__default = /*#__PURE__*/_interopDefaultLegacy(jenkinsImg);
var projectImg__default = /*#__PURE__*/_interopDefaultLegacy(projectImg);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/portal.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Portal = function Portal(props) {
  var headerRouter = [{
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
  var productIcons = {
    postin: apiboxImg__default["default"],
    teamwire: projectImg__default["default"],
    teston: jenkinsImg__default["default"],
    kanass: apiboxImg__default["default"]
  };

  var _useWorkAppConfig = _useWorkAppConfig3__default["default"](false, productIcons),
      _useWorkAppConfig2 = _slicedToArray(_useWorkAppConfig, 3),
      component = _useWorkAppConfig2[0],
      ModalComponent = _useWorkAppConfig2[1],
      editOrAddModal = _useWorkAppConfig2[2];

  var route = props.route;

  var projectLogout = function projectLogout() {
    props.history.push({
      pathname: '/logout',
      state: window.location.href
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(localHeader["default"], _extends({}, props, {
    logo: logo_k["default"],
    AppConfigComponent: component,
    projectLogout: projectLogout,
    search: /*#__PURE__*/React__default["default"].createElement(search["default"], _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 25
      }
    })),
    routers: headerRouter,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 13
    }
  }, reactRouterConfig.renderRoutes(route.routes)), ModalComponent, editOrAddModal);
};

var IndexHoc = _verifyUserHoc__default["default"](Portal);

function mapStateToProps(state) {
  return {
    pluginStore: state.pluginStore
  };
}

var portal = _utils.connect(mapStateToProps)(IndexHoc);

exports["default"] = portal;
