'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
var mobxReact = require('mobx-react');
require('./templatePreviewModal.scss.js');
var tiklabSlateUi = require('tiklab-slate-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/template/components/templatePreviewmodal.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplatePreviewmodal = function TemplatePreviewmodal(props) {
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var previewModalVisible = props.previewModalVisible,
      setPreviewModalVisible = props.setPreviewModalVisible,
      templateStore = props.templateStore,
      templateId = props.templateId;
  var findDocumentTemplate = templateStore.findDocumentTemplate;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      template = _useState2[0],
      setTemplate = _useState2[1];

  var _useState3 = React.useState([{
    type: "paragraph",
    children: [{
      text: "空白文档"
    }]
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {});
  };

  React.useEffect(function () {
    if (templateId && previewModalVisible) {
      findDocumentTemplate(templateId).then(function (data) {
        var value = data.data;

        if (data.code === 0) {
          // form.setFieldsValue({   
          //     name: value.name,
          //     description: value.description
          // })
          setTemplate(_objectSpread({}, value));
          setValue(JSON.parse(value.details));
        }
      });
    }
  }, [templateId, previewModalVisible]);

  var initTemplate = function initTemplate(value) {// setValue(value)
    // const serialize = JSON.stringify(value)
    // const data = {
    // 	id: documentId,
    // 	details: serialize
    // }
    // updateDocument(data)
  };

  return /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: "\u67E5\u770B\u6A21\u677F",
    visible: previewModalVisible,
    onOk: function onOk() {
      return onFinish();
    },
    onCancel: function onCancel() {
      return setPreviewModalVisible(false);
    },
    width: "80vh",
    className: "template-previewmodal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], {
    form: form,
    name: "basic",
    initialValues: {
      remember: true
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "previewmodal-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-paihang",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "previewmodal-from",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 25
    }
  }, template && template.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "doc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 25
    }
  }, template && template.description)))), /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.PreviewEditor, {
    value: value,
    onChange: function onChange(value) {
      return initTemplate();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 13
    }
  })));
}; // export default inject("WikiCatalogueStore")(observer(TemplatePreviewmodal));


var TemplatePreviewmodal$1 = mobxReact.inject("templateStore")(mobxReact.observer(TemplatePreviewmodal));

exports["default"] = TemplatePreviewmodal$1;
