'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/breadcrumb/style/css');
var _Breadcrumb = require('antd/es/breadcrumb');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
require('./brainMapFlowDetail.scss.js');
var brainMapFlowExamine = require('./brainMapFlowExamine.js');
var reactRouterDom = require('react-router-dom');
var brainMapFlowEdit = require('./brainMapFlowEdit.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Breadcrumb__default = /*#__PURE__*/_interopDefaultLegacy(_Breadcrumb);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMapFlow/components/brainMapFlowDetail.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_Input__default["default"].Search;

var BrainMapFlowDetail = function BrainMapFlowDetail(props) {
  var WikiCatalogueStore = props.WikiCatalogueStore,
      wikiwork = props.wikiwork;

  var _useState = React.useState({
    nodes: [],
    edges: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      graphData = _useState2[0],
      setGraphData = _useState2[1];

  var docDetail = WikiCatalogueStore.docDetail;
      WikiCatalogueStore.setDocDetail;
      var updateDocument = WikiCatalogueStore.updateDocument,
      findDocument = WikiCatalogueStore.findDocument;
  wikiwork.findWorkItem;
  React.useEffect(function () {}, []);

  var _useState3 = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: ""
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      docInfo = _useState4[0],
      setDocInfo = _useState4[1];

  var _useState5 = React.useState("examine"),
      _useState6 = _slicedToArray(_useState5, 2),
      editOrExamine = _useState6[0],
      seteditOrExamine = _useState6[1];

  var changePageType = function changePageType(type) {
    seteditOrExamine(type);
  };

  var documentId = localStorage.getItem("documentId"); // const [value, setValue] = useState([
  // 	{
  // 		type: "paragraph",
  // 		children: [{ text: "" }],
  // 	},
  // ])
  // 初始化

  React.useEffect(function () {
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          var jsonData = JSON.parse(data.data.details);
          console.log(jsonData);
          setGraphData(_objectSpread({}, jsonData));
        }

        setDocInfo(data.data);
      }
    });
  }, [documentId]); // 保存内容

  var save = function save(type) {
    seteditOrExamine(type);
    saveDocument(); // editRef.current.submit()
  };

  var saveDocument = function saveDocument() {
    // setValue(value)
    var serialize = JSON.stringify(graphData);
    var data = {
      id: documentId,
      details: serialize
    };
    updateDocument(data);
    console.log(graphData);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 21
    }
  }, "\u77E5\u8BC6\u5E93\u7BA1\u7406"), /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 25
    }
  }, "\u6587\u6863\u8BE6\u60C5"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documnet-detail-button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 17
    }
  }, editOrExamine === "examine" ? /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: function onClick() {
      return changePageType("edit");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 54
    }
  }, "\u7F16\u8F91") : /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: function onClick() {
      return save("examine");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 29
    }
  }, "\u4FDD\u5B58"))), editOrExamine === "examine" ? /*#__PURE__*/React__default["default"].createElement(brainMapFlowExamine["default"], _extends({
    docDetail: docDetail,
    findDocument: findDocument,
    graphData: graphData,
    docInfo: docInfo
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 21
    }
  })) : /*#__PURE__*/React__default["default"].createElement(brainMapFlowEdit["default"], _extends({
    docDetail: docDetail,
    docInfo: docInfo,
    graphData: graphData,
    setGraphData: setGraphData
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 21
    }
  })));
};

var brainMapFlowDetail = reactRouterDom.withRouter(mobxReact.inject('wikiStore', "WikiCatalogueStore", "wikiwork")(mobxReact.observer(BrainMapFlowDetail)));

exports["default"] = brainMapFlowDetail;
