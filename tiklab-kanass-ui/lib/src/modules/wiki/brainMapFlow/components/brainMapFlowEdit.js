'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
var React = require('react');
var mobxReact = require('mobx-react');
require('./brainMapFlowEdit.scss.js');
var reactRouterDom = require('react-router-dom');
var brainMapFlow = require('./brainMapFlow.js');
var button = require('../../../../common/button/button.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMapFlow/components/brainMapFlowEdit.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DocumentMindMapEdit = function DocumentMindMapEdit(props) {
  props.onChange;
      var WikiCatalogueStore = props.WikiCatalogueStore;
  var findDocument = WikiCatalogueStore.findDocument,
      updateDocument = WikiCatalogueStore.updateDocument;
  var documentId = localStorage.getItem("documentId");

  var _useState = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: "",
    master: {
      name: ""
    }
  }),
      _useState2 = _slicedToArray(_useState, 2),
      docInfo = _useState2[0],
      setDocInfo = _useState2[1];

  var _useState3 = React.useState({
    nodes: [],
    edges: []
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      graphData = _useState4[0],
      setGraphData = _useState4[1];

  var save = function save() {
    saveDocument(graphData); // props.history.push(`/index/wikidetail/mindmap/${documentId}`)

    props.history.goBack(); // editRef.current.submit()
  };

  var saveDocument = function saveDocument(value) {
    setGraphData(value);
    var serialize = JSON.stringify(value);
    var data = {
      id: documentId,
      details: serialize
    };
    updateDocument(data);
  };

  React.useEffect(function () {
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          // setWorkData(JSON.parse(data.data.details),findWorkItem)
          setGraphData(JSON.parse(data.data.details)); // setWorkData(JSON.parse(data.data.details),findWorkItem)
        } else {
          setGraphData({
            nodes: [],
            edges: []
          });
        }

        setDocInfo(data.data);
      }
    });
  }, [documentId]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "brainmap-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 17
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: function onClick() {
      return save();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  }, "\u4FDD\u5B58"), /*#__PURE__*/React__default["default"].createElement(button["default"], {
    onClick: function onClick() {
      return props.history.goBack();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 21
    }
  }, "\u53D6\u6D88"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 25
    }
  })))), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 18,
      offset: 3
    },
    md: {
      span: 20,
      offset: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(brainMapFlow["default"], {
    graphData: graphData,
    setGraphData: setGraphData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 21
    }
  }))));
};

var BrainMapFlowEdit = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(mobxReact.observer(reactRouterDom.withRouter(DocumentMindMapEdit)));

exports["default"] = BrainMapFlowEdit;
