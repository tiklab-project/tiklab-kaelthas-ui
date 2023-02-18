'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/select/style/css');
var _Select = require('antd/es/select');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/message/style/css');
var _message = require('antd/es/message');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
require('antd/es/date-picker/style/css');
var _DatePicker = require('antd/es/date-picker');
var React = require('react');
var mobxReact = require('mobx-react');
require('moment/locale/zh-cn');
require('antd/es/date-picker/locale/zh_CN');
require('moment');
require('../components/basicInfo.scss.js');
var breadcrumb = require('../../../../common/breadcrumb/breadcrumb.js');
var changIcon = require('../components/changIcon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Select__default = /*#__PURE__*/_interopDefaultLegacy(_Select);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _message__default = /*#__PURE__*/_interopDefaultLegacy(_message);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var _DatePicker__default = /*#__PURE__*/_interopDefaultLegacy(_DatePicker);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wikiSet/basic-info/containers/basicInfo.js";

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
_DatePicker__default["default"].RangePicker;

var BasicInfo = function BasicInfo(props) {
  var layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 12
    }
  };
  var formTailLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8,
      offset: 4
    }
  };

  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  console.log(props.match.params.wikiId);
  var wikiId = props.match.params.wikiId;
  var wikiStore = props.wikiStore;
  wikiStore.delewikiList;
      var updateWiki = wikiStore.updateWiki,
      searchwiki = wikiStore.searchwiki,
      getUseList = wikiStore.getUseList,
      uselist = wikiStore.uselist;

  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      disable = _useState2[0],
      setDisabled = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      iconUrl = _useState4[0],
      setIconUrl = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      visible = _useState6[0],
      setVisible = _useState6[1];

  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2);
      _useState8[0];
      var setWikiInfo = _useState8[1]; // 周期
  React.useEffect(function () {
    info();
    getUseList();
    return;
  }, []);

  var info = function info() {
    searchwiki(wikiId).then(function (response) {
      if (response.code === 0) {
        var _data = response.data;
        setWikiInfo(_data); // setIconUrl(data.iconUrl)

        form.setFieldsValue({
          name: _data.name,
          limits: _data.limits,
          desc: _data.desc,
          master: _data.master.id
        });
      }
    });
  };

  var cancel = function cancel() {
    form.setFieldsValue({
      name: data.name,
      limits: data.limits,
      desc: data.desc,
      master: data.master
    });
  };

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {
      var data = _objectSpread(_objectSpread({}, values), {}, {
        master: {
          id: values.master
        },
        id: wikiId
      }); // if (props.type === "add") {
      //     addProlist(data)
      // } else {
      //     updateWiki(data)
      // }


      updateWiki(data).then(function (res) {
        if (res.code === 0) {
          _message__default["default"].info('修改成功');
        }
      }); // setVisible(false);
    });
  }; // 状态类型

  var _useState9 = React.useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isModalVisible = _useState10[0],
      setIsModalVisible = _useState10[1];

  var showModal = function showModal() {
    setIsModalVisible(true);
  };

  var handleOk = function handleOk() {
    deleproList(wikiId).then(function (response) {
      if (response.code === 0) {
        props.history.push("/index/wiki");
      }
    });
    setIsModalVisible(false);
  };

  var handleCancel = function handleCancel() {
    setIsModalVisible(false);
  };

  return /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    lg: {
      span: 24
    },
    xxl: {
      span: "18",
      offset: "3"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-basicinfo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], {
    firstText: "\u77E5\u8BC6\u5E93\u4FE1\u606F",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 25
    }
  }, "\u77E5\u8BC6\u5E93\u4FE1\u606F"), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, _extends({
    label: "\u77E5\u8BC6\u5E93\u56FE\u6807",
    className: "wiki-form-icon"
  }, layout, {
    labelAlign: "left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form-icon-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 33
    }
  }, iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
    src: '/images/' + iconUrl,
    alt: "",
    width: 60,
    height: 60,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 45
    }
  }) : /*#__PURE__*/React__default["default"].createElement("img", {
    src: 'images/repository1.png',
    alt: "",
    width: 60,
    height: 60,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 45
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 33
    }
  }, "\u77E5\u8BC6\u5E93\u56FE\u6807\uFF0C\u53EF\u70B9\u51FB\u66F4\u6539\u6309\u94AE\u4FEE\u6539icon"))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, _extends({}, formTailLayout, {
    labelAlign: "left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "change-botton",
    onClick: function onClick() {
      return setVisible(true);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 29
    }
  }, "\u66F4\u6539\u56FE\u6807")), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], _extends({}, layout, {
    name: "basic",
    initialValues: {
      remember: true
    },
    form: form,
    onFinish: onFinish,
    onFieldsChange: function onFieldsChange() {
      return setDisabled(false);
    },
    labelAlign: "left" // onValuesChange={onFinish}
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u540D\u79F0",
    name: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u77E5\u8BC6\u5E93\u540D\u79F0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u53EF\u89C1\u4EBA\u5458",
    name: "limits",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    allowClear: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
    value: "0",
    key: "0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 37
    }
  }, "\u5168\u90E8\u6210\u5458"), /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
    value: "1",
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 37
    }
  }, "\u77E5\u8BC6\u5E93\u6210\u5458"))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u8D1F\u8D23\u4EBA",
    name: "master",
    rules: [{
      required: false,
      message: '请输入知识库编码'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    placeholder: "\u8D1F\u8D23\u4EBA",
    allowClear: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 33
    }
  }, uselist && uselist.map(function (item, index) {
    return /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
      value: item.id,
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 259,
        columnNumber: 52
      }
    }, item.name);
  }))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u63CF\u8FF0",
    name: "desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u77E5\u8BC6\u5E93\u63CF\u8FF0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, _extends({}, formTailLayout, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 29
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    onClick: function onClick() {
      return cancel();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 33
    }
  }, "\u53D6\u6D88"), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    htmlType: "submit",
    type: "primary",
    disabled: disable,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 33
    }
  }, "\u4FDD\u5B58")))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 283,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 25
    }
  }, "\u5220\u9664\u77E5\u8BC6\u5E93"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-set-icon-block",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 289,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 290,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 33
    }
  }, " \u6B64\u77E5\u8BC6\u5E93\u53CA\u5176\u76EE\u5F55\u5C06\u5728\u56DE\u6536\u7AD9\u4E2D\u4FDD\u7559 60 \u5929\uFF0C\u4E4B\u540E\u5C06\u88AB\u6C38\u4E45\u5220\u9664"))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, _extends({}, formTailLayout, {
    labelAlign: "left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "change-botton",
    onClick: function onClick() {
      return showModal();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 301,
      columnNumber: 29
    }
  }, "\u5220\u9664\u77E5\u8BC6\u5E93")))), /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: "\u662F\u5426\u5220\u9664",
    visible: isModalVisible,
    closable: false,
    onOk: handleOk,
    onCancel: handleCancel,
    okText: "确定",
    cancelText: "取消",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310,
      columnNumber: 17
    }
  }, "\u6B64\u77E5\u8BC6\u5E93\u53CA\u5176\u76EE\u5F55\u5C06\u5728\u56DE\u6536\u7AD9\u4E2D\u4FDD\u7559 60 \u5929\uFF0C\u4E4B\u540E\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002"), /*#__PURE__*/React__default["default"].createElement(changIcon["default"], {
    visible: visible,
    setVisible: setVisible,
    updateWiki: updateWiki,
    setIconUrl: setIconUrl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 314,
      columnNumber: 17
    }
  })));
};

var basicInfo = mobxReact.inject("wikiStore")(mobxReact.observer(BasicInfo));

exports["default"] = basicInfo;
