'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
require('moment/locale/zh-cn');
require('tiklab-core-ui');
var mobxReact = require('mobx-react');
require('./wikiAdd.scss.js');
var button = require('../../../../common/button/button.js');
var wikiAddInfo = require('./wikiAddInfo.js');
var breadcrumb = require('../../../../common/breadcrumb/breadcrumb.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/wiki/components/wikiAdd.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WikiAddmodal = function WikiAddmodal(props) {
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _React$useState = React__default["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var name = props.name,
      wikiStore = props.wikiStore,
      selectTabs = props.selectTabs;
  var addWikilist = wikiStore.addWikilist,
      getUseList = wikiStore.getUseList,
      findRepositoryList = wikiStore.findRepositoryList;

  var showModal = function showModal() {
    setVisible(true);
    getUseList();
  };

  var onCancel = function onCancel() {
    form.resetFields();
    setVisible(false);
  };

  var Head = function Head() {
    return /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], {
      firstText: "\u6DFB\u52A0\u77E5\u8BC6\u5E93",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      onClick: function onClick() {
        return setVisible(false);
      },
      className: "wikiadd-close",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "svg-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-close",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 25
      }
    }))));
  };

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: showModal,
    buttonText: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    visible: visible,
    onCancel: onCancel,
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A",
    footer: false,
    className: "wiki-addmodel",
    mask: false,
    closable: false,
    width: "100vw",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    className: "wiki-type-col",
    lg: {
      span: "18",
      offset: "3"
    },
    xl: {
      span: "14",
      offset: "5"
    },
    xxl: {
      span: "10",
      offset: "7"
    },
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(Head, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 29
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiAddInfo["default"], {
    addWikilist: addWikilist,
    findRepositoryList: findRepositoryList,
    setVisible: setVisible,
    selectTabs: selectTabs,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 33
    }
  })))))));
};

var WikiAddmodal$1 = mobxReact.inject("wikiStore")(mobxReact.observer(WikiAddmodal));

exports["default"] = WikiAddmodal$1;
