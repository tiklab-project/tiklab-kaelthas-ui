'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
var React = require('react');
var mobxReact = require('mobx-react');
var reactRouterDom = require('react-router-dom');
require('./documentEdit.scss.js');
var index_es$1 = require('../../../../../node_modules/slate/dist/index.es.js');
var index_es = require('../../../../../node_modules/slate-react/dist/index.es.js');
var tiklabSlateUi = require('tiklab-slate-ui');
var button = require('../../../../common/button/button.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/documentEdit.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  var wikiId = props.match.params.wikiId;

  var _useState3 = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = React.useState(function () {
    return index_es.withReact(index_es$1.createEditor());
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      editor = _useState6[0];

  React.useEffect(function () {
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          setValue(JSON.parse(data.data.details));
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
    props.history.push("/index/wikidetail/".concat(wikiId, "/doc/").concat(documentId)); // editRef.current.submit()
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
      lineNumber: 68,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 17
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: function onClick() {
      return save();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 21
    }
  }, "\u4FDD\u5B58"), /*#__PURE__*/React__default["default"].createElement(button["default"], {
    onClick: function onClick() {
      return props.history.goBack();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 21
    }
  }, "\u53D6\u6D88"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 25
    }
  })))), /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.EditorBigMenu, {
    editor: editor,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "document-examine-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
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
      lineNumber: 81,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.EditorBigContent, {
    value: value,
    onChange: function onChange(value) {
      return saveDocument(value);
    },
    editor: editor,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 21
    }
  }))));
};

var DocumentEdit$1 = mobxReact.inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(mobxReact.observer(reactRouterDom.withRouter(DocumentEdit)));

exports["default"] = DocumentEdit$1;
