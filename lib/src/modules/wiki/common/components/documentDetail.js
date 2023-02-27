'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/breadcrumb/style/css');
var _Breadcrumb = require('antd/es/breadcrumb');
var React = require('react');
var mobxReact = require('mobx-react');
require('./documentDetail.scss.js');
var documnetExamine = require('./documnetExamine.js');
var reactRouterDom = require('react-router-dom');
var documentEdit = require('./documentEdit.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Breadcrumb__default = /*#__PURE__*/_interopDefaultLegacy(_Breadcrumb);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/documentDetail.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DocumentDetail = function DocumentDetail(props) {
  var WikiCatalogueStore = props.WikiCatalogueStore;
      props.wikiwork;
  var docDetail = WikiCatalogueStore.docDetail;
      WikiCatalogueStore.setDocDetail;
      var updateDocument = WikiCatalogueStore.updateDocument,
      findDocument = WikiCatalogueStore.findDocument;

  var _useState = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      docInfo = _useState2[0];
      _useState2[1];

  var _useState3 = React.useState("examine"),
      _useState4 = _slicedToArray(_useState3, 2),
      editOrExamine = _useState4[0],
      seteditOrExamine = _useState4[1];

  var changePageType = function changePageType(type) {
    seteditOrExamine(type);
  };

  var documentId = localStorage.getItem("documentId"); // 初始化
  // 保存内容

  var save = function save(type) {
    seteditOrExamine(type);
    saveDocument(value); // editRef.current.submit()
  };

  var saveDocument = function saveDocument(value) {
    setValue(value);
    var serialize = JSON.stringify(value);
    var data = {
      id: documentId,
      details: serialize
    };
    updateDocument(data);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 21
    }
  }, "\u77E5\u8BC6\u5E93\u7BA1\u7406"), /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 25
    }
  }, "\u6587\u6863\u8BE6\u60C5"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail-button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 17
    }
  }, editOrExamine === "examine" ? /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: function onClick() {
      return changePageType("edit");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 54
    }
  }, "\u7F16\u8F91") : /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: function onClick() {
      return save("examine");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 29
    }
  }, "\u4FDD\u5B58"))), editOrExamine === "examine" ? /*#__PURE__*/React__default["default"].createElement(documnetExamine["default"], _extends({
    docDetail: docDetail,
    findDocument: findDocument,
    docInfo: docInfo,
    value: value
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 47
    }
  })) : /*#__PURE__*/React__default["default"].createElement(documentEdit["default"], _extends({
    docDetail: docDetail,
    onChange: function onChange(value) {
      return saveDocument(value);
    },
    docInfo: docInfo,
    value: value
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 21
    }
  })));
};

var documentDetail = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore", "wikiwork")(mobxReact.observer(reactRouterDom.withRouter(DocumentDetail)));

exports["default"] = documentDetail;
