'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
require('react-router-dom');
var mobxReact = require('mobx-react');
var tiklabSlateUi = require('tiklab-slate-ui');
require('./templateAddmodal.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/template/components/templateAddmodal.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateAddmodal = function TemplateAddmodal(props) {
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var addModalVisible = props.addModalVisible,
      setAddModalVisible = props.setAddModalVisible,
      modalName = props.modalName,
      templateStore = props.templateStore,
      setTemplateList = props.setTemplateList,
      editOrAdd = props.editOrAdd,
      templateId = props.templateId;
  var greateDocumentTemplate = templateStore.greateDocumentTemplate,
      findDocumentTemplatePage = templateStore.findDocumentTemplatePage,
      findDocumentTemplate = templateStore.findDocumentTemplate,
      updateDocumentTemplate = templateStore.updateDocumentTemplate;

  var _useState = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      editorValue = _useState2[0],
      setEditorValue = _useState2[1];

  var changeEditor = function changeEditor(value) {
    setEditorValue(value);
  };

  React.useEffect(function () {
    if (editOrAdd === "edit" && addModalVisible) {
      findDocumentTemplate(templateId).then(function (data) {
        var value = data.data;

        if (data.code === 0) {
          form.setFieldsValue({
            name: value.name,
            description: value.description
          });
          setEditorValue(JSON.parse(value.details));
        }
      });
    }
  }, [editOrAdd, templateId, addModalVisible]);
  React.useEffect(function () {
    if (editOrAdd === "add") {
      form.resetFields();
    }
  }, [editOrAdd]);

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {
      var serialize = JSON.stringify(editorValue);

      if (editOrAdd === "edit") {
        var data = _objectSpread(_objectSpread({}, values), {}, {
          details: serialize,
          id: templateId
        });

        updateDocumentTemplate(data).then(function (data) {
          if (data.code === 0) {
            setAddModalVisible(false);
            findDocumentTemplatePage().then(function (data) {
              if (data.code === 0) {
                setTemplateList(data.data.dataList);
              }
            });
          }
        });
      } else {
        var _data = _objectSpread(_objectSpread({}, values), {}, {
          details: serialize
        });

        greateDocumentTemplate(_data).then(function (data) {
          if (data.code === 0) {
            setAddModalVisible(false);
            findDocumentTemplatePage().then(function (data) {
              if (data.code === 0) {
                setTemplateList(data.data.dataList);
              }
            });
          }
        });
      }
    });
  };

  var _onCancel = function onCancel() {
    setAddModalVisible(false);
    form.resetFields();
  };

  return /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: modalName,
    visible: addModalVisible,
    onOk: function onOk() {
      return onFinish();
    },
    onCancel: function onCancel() {
      return _onCancel();
    },
    width: "80vw",
    className: "template-addmodal",
    destroyOnClose: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], {
    form: form,
    name: "basic",
    initialValues: {
      remember: true
    },
    style: {
      marginBottom: "20px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "addmodal-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-paihang",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "addmodal-from",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    name: "name",
    rules: [{
      required: true,
      message: '请输入模板名称!'
    }],
    wrapperCol: {
      span: 6
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    name: "description",
    rules: [{
      required: true,
      message: '请输入模板描述!'
    }],
    style: {
      marginBottom: 0
    },
    wrapperCol: {
      span: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u6A21\u677F\u63CF\u8FF0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 29
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.DocumentEditor, {
    value: editorValue,
    onChange: function onChange(value) {
      return changeEditor(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 13
    }
  })));
};

var TemplateAddmodal$1 = mobxReact.inject("templateStore")(mobxReact.observer(TemplateAddmodal));

exports["default"] = TemplateAddmodal$1;
