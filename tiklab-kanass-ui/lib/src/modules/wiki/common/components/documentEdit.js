'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
var reactRouterDom = require('react-router-dom');
require('./documentEdit.scss.js');
var tiklabSlateUi = require('tiklab-slate-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/documentEdit.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_Input__default["default"].Search;

var DocumentEdit = function DocumentEdit(props) {
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

  var _useState3 = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  React.useEffect(function () {
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          // setWorkData(JSON.parse(data.data.details),findWorkItem)
          setValue(JSON.parse(data.data.details)); // setWorkData(JSON.parse(data.data.details),findWorkItem)
        } else {
          setValue([{
            type: "paragraph",
            children: [{
              text: ""
            }]
          }]);
        }

        setDocInfo(data.data);
      }
    });
  }, [documentId]);

  var save = function save() {
    saveDocument(value);
    props.history.push("/index/wikidetail/doc/".concat(documentId)); // editRef.current.submit()
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
    className: "documnet-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 17
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    shape: "round",
    style: {
      backgroundColor: "#5d70ea",
      color: "#fff"
    },
    onClick: function onClick() {
      return save();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 21
    }
  }, "\u4FDD\u5B58"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 25
    }
  })))), /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.DocumentEditor, {
    onChange: saveDocument,
    value: value,
    minHeight: 300,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 13
    }
  }));
};

var DocumentEdit$1 = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(mobxReact.observer(reactRouterDom.withRouter(DocumentEdit)));

exports["default"] = DocumentEdit$1;
