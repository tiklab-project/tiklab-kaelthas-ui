'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactI18next = require('react-i18next');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wikiSet/common/components/wikiSetAside.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Sider = _Layout__default["default"].Sider;

var WikiSetAside = function WikiSetAside(props) {
  console.log(props);

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var wikiId = props.match.params.wikiId;
  JSON.parse(localStorage.getItem("wiki")).wikiName; // 路由

  var wikirouter = [{
    title: '知识库信息',
    icon: 'survey',
    key: "/index/wikiSet/".concat(wikiId, "/basicInfo"),
    encoded: "Survey"
  }, {
    title: "".concat(t('user')),
    icon: 'survey',
    key: "/index/wikiSet/".concat(wikiId, "/user"),
    encoded: "User"
  }, {
    title: "".concat(t('privilege')),
    icon: 'survey',
    key: "/index/wikiSet/".concat(wikiId, "/domainRole"),
    encoded: "Privilege"
  }]; // 当前选中路由

  var _useState = React.useState("/index/wikiSet/".concat(wikiId, "/basicInfo")),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1]; // 菜单是否折叠


  var _useState3 = React.useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isShowText = _useState4[0];
      _useState4[1]; // 当前项目id
  // const wikiId = props.match.params.id


  React.useEffect(function () {
    // 初次进入激活导航菜单
    setSelectKey(props.location.pathname);
    return;
  }, [wikiId]);
  /**
   * 点击左侧菜单
   * @param {*} key 
   */

  var selectKeyFun = function selectKeyFun(key) {
    setSelectKey(key);
    props.history.push(key);
  };

  var backWiki = function backWiki() {
    props.history.push("/index/wikidetail/".concat(wikiId, "/survey"));
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    trigger: null,
    collapsible: true,
    collapsed: !isShowText,
    collapsedWidth: "50",
    width: "200",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-aside ".concat(isShowText ? "" : "wiki-icon"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "".concat(isShowText ? "" : "wiki-notext"),
    style: {
      marginRight: "20px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 25
    }
  }, "\u8BBE\u7F6E")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-back",
    onClick: function onClick() {
      return backWiki();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "menu-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-backwiki",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 25
    }
  }, "\u8FD4\u56DE\u77E5\u8BC6\u5E93")), /*#__PURE__*/React__default["default"].createElement("ul", {
    className: "wiki-menu",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 21
    }
  }, wikirouter && wikirouter.map(function (Item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-menu-submenu ".concat(Item.key === selectKey ? "wiki-menu-select" : ""),
      key: Item.key,
      onClick: function onClick() {
        return selectKeyFun(Item.key);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 40
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "".concat(isShowText ? "" : "wiki-notext"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 37
      }
    }, Item.title));
  })))));
};

var WikiSetAside$1 = reactRouterDom.withRouter(WikiSetAside);

exports["default"] = WikiSetAside$1;
