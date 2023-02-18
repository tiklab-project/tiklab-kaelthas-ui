'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/select/style/css');
var _Select = require('antd/es/select');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
var button = require('../../../../common/button/button.js');
require('moment/locale/zh-cn');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Select__default = /*#__PURE__*/_interopDefaultLegacy(_Select);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/wiki/components/wikiAdd1.js";

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
var layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

var WikiAddmodal = function WikiAddmodal(props) {
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var searchwiki = props.searchwiki;
      props.wikiTypelist;
      props.getWikiTypeList;
      var getUseList = props.getUseList,
      uselist = props.uselist;

  var _useState3 = React.useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      wikiId = _useState4[0],
      setWikiId = _useState4[1];

  var showModal = function showModal() {
    setVisible(true); // getWikiTypeList()

    getUseList();

    if (props.type !== "add") {
      searchwiki(props.id).then(function (response) {
        // const time = response["startTime"]
        form.setFieldsValue({
          name: response.name,
          desc: response.desc,
          master: response.master.id,
          limits: response.limits // startTime: response.startTime.format("YYYY-MM-DD"),
          // endTime: response.endTime.format("YYYY-MM-DD"),
          // wikiState: response.projectState,
          // startTime:[moment(response.startTime, dateFormat), moment(response.endTime, dateFormat)]

        });
        setWikiId(response.id);
      });
    }
  };

  var onCancel = function onCancel() {
    form.resetFields();
    setVisible(false);
  };

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {
      // const time = values["startTime"]
      var data = _objectSpread(_objectSpread({}, values), {}, {
        // startTime: time[0].format("YYYY-MM-DD"),
        // endTime: time[1].format("YYYY-MM-DD"),
        id: wikiId
      });

      if (props.type === "add") {
        props.addWikilist(values);
      } else {
        props.updateWiki(data);
      }

      setVisible(false);
    });
  }; // 周期

  var limits = [{
    name: "全部成员",
    id: "0"
  }, {
    name: "知识库成员",
    id: "1"
  }];
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "addmodel",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, props.type !== "edit" ? /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: showModal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }, props.name) : /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 19
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: showModal,
    className: "span-botton",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 24
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-chuangzuo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 29
    }
  })))), /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: props.name,
    visible: visible,
    onOk: onFinish,
    onCancel: onCancel,
    cancelText: "\u53D6\u6D88",
    okText: "\u786E\u5B9A",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], _extends({}, layout, {
    name: "basic",
    initialValues: {
      remember: true
    },
    form: form,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u540D\u79F0",
    name: "name",
    rules: [{
      required: true,
      message: '请输入知识库名称'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u77E5\u8BC6\u5E93\u540D\u79F0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u8D1F\u8D23\u4EBA",
    name: "master",
    rules: [{
      required: false,
      message: '请输入知识库编码'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    placeholder: "\u8D1F\u8D23\u4EBA",
    allowClear: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 25
    }
  }, uselist && uselist.map(function (item, index) {
    return /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
      value: item.id,
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 44
      }
    }, item.name);
  }))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u53EF\u89C1\u4EBA\u5458",
    name: "limits",
    rules: [{
      required: false,
      message: '请选择可见人员'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    placeholder: "\u53EF\u89C1\u4EBA\u5458",
    allowClear: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 25
    }
  }, limits && limits.map(function (item, index) {
    return /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
      value: item.id,
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 44
      }
    }, item.name);
  }))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u63CF\u8FF0",
    name: "desc",
    rules: [{
      required: false,
      message: '请输入知识库描述'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u77E5\u8BC6\u5E93\u63CF\u8FF0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u56FE\u6807",
    name: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "project-icon-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 25
    }
  }, iconList && iconList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: item.key,
      className: "project-icon  ".concat(item.iconUrl === iconUrl ? "icon-select" : null),
      onClick: function onClick() {
        setIconUrl(item.iconUrl);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 202,
        columnNumber: 44
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: '/images/' + item.iconUrl,
      alt: "",
      className: "img-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 41
      }
    }));
  })))))));
};

exports["default"] = WikiAddmodal;
