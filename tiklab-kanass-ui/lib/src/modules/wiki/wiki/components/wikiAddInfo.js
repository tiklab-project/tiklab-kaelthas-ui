'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/message/style/css');
var _message = require('antd/es/message');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
require('antd/es/date-picker/style/css');
var _DatePicker = require('antd/es/date-picker');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
require('antd/es/date-picker/locale/zh_CN');
require('./wikiAddInfo.scss.js');
var button = require('../../../../common/button/button.js');
var tiklabCoreUi = require('tiklab-core-ui');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _message__default = /*#__PURE__*/_interopDefaultLegacy(_message);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var _DatePicker__default = /*#__PURE__*/_interopDefaultLegacy(_DatePicker);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/wiki/components/wikiAddInfo.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var TextArea = _Input__default["default"].TextArea;
_DatePicker__default["default"].RangePicker;
var layout = {
  labelCol: {
    span: 6
  }
};
var iconList = [{
  iconUrl: "repository1.png",
  key: "repository1"
}, {
  iconUrl: "repository2.png",
  key: "repository2"
}, {
  iconUrl: "repository3.png",
  key: "repository3"
}, {
  iconUrl: "repository4.png",
  key: "repository4"
}, {
  iconUrl: "repository5.png",
  key: "repository5"
}];

var WikiAddInfo = function WikiAddInfo(props) {
  var addWikilist = props.addWikilist,
      setVisible = props.setVisible;
      props.findRepositoryList;
      var selectTabs = props.selectTabs;

  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];
  tiklabCoreUi.getUser().userId;

  var _useState = React.useState("repository1.png"),
      _useState2 = _slicedToArray(_useState, 2),
      iconUrl = _useState2[0],
      setIconUrl = _useState2[1];

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {
      var data = {
        name: values.name,
        desc: values.desc,
        limits: values.limits,
        iconUrl: iconUrl
      };
      addWikilist(data).then(function (res) {
        if (res.code === 40000) {
          _message__default["default"].error(res.msg);
        }

        if (res.code === 0) {
          _message__default["default"].success('添加成功');

          setVisible(false);
          selectTabs(4); // findRepositoryList({masterId: userId})
          // props.history.push(`/index/wikidetail/${res.data}/survey`)
        }
      });
    });
  };

  var checkLimit = function checkLimit(_, value) {
    console.log(value);

    if (value) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  var _useState3 = React.useState("0"),
      _useState4 = _slicedToArray(_useState3, 2),
      limtValue = _useState4[0],
      setLimitValue = _useState4[1];

  var LimitComponents = function LimitComponents(_ref) {
    var _ref$value = _ref.value,
        value = _ref$value === void 0 ? {} : _ref$value,
        onChange = _ref.onChange;

    var changeLimit = function changeLimit(id) {
      setLimitValue(id);
      onChange(id);
    };

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-limit",
      onChange: onChange,
      value: value,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      key: "0",
      className: "wiki-limits ".concat(limtValue === "0" ? "limit-select" : ""),
      onClick: function onClick() {
        return changeLimit("0");
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "limits-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 21
      }
    }, "\u516C\u5171", /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "svg-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-publish",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 29
      }
    }))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "limits-desc",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 21
      }
    }, "\u516C\u5171\u77E5\u8BC6\u5E93\uFF0C\u5168\u90E8\u6210\u5458\u53EF\u89C1")), /*#__PURE__*/React__default["default"].createElement("div", {
      key: "1",
      className: "wiki-limits ".concat(limtValue === "1" ? "limit-select" : ""),
      onClick: function onClick() {
        return changeLimit("1");
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "limits-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 21
      }
    }, "\u79C1\u5BC6", /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "svg-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-private",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 29
      }
    }))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "limits-desc",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 21
      }
    }, "\u79C1\u5BC6\u77E5\u8BC6\u5E93\uFF0C\u53EA\u6709\u77E5\u8BC6\u5E93\u6210\u5458\u53EF\u89C1")));
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-addinfo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], _extends({}, layout, {
    name: "basic",
    initialValues: {
      remember: true,
      limits: "0"
    },
    form: form,
    onFinish: onFinish,
    layout: "vertical",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u540D\u79F0",
    name: "name",
    rules: [{
      required: true,
      message: '使用中英文、数字、空格组合'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u4F7F\u7528\u4E2D\u82F1\u6587\u3001\u6570\u5B57\u3001\u7A7A\u683C\u7EC4\u5408",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u53EF\u89C1\u8303\u56F4",
    name: "limits",
    rules: [{
      validator: checkLimit
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(LimitComponents, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u77E5\u8BC6\u5E93\u63CF\u8FF0",
    name: "desc",
    rules: [{
      required: false,
      message: '请输入知识库描述'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(TextArea, {
    rows: 3,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u56FE\u6807",
    name: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-icon-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 25
    }
  }, iconList && iconList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: item.key,
      className: "wiki-icon  ".concat(item.iconUrl === iconUrl ? "icon-select" : null),
      onClick: function onClick() {
        setIconUrl(item.iconUrl);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 180,
        columnNumber: 44
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: '/images/' + item.iconUrl,
      alt: "",
      className: "img-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 182,
        columnNumber: 41
      }
    }));
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-add-submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(button["default"], {
    htmlType: "button",
    onClick: function onClick() {
      return setVisible(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 25
    }
  }, "\u53D6\u6D88"), /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    htmlType: "submit",
    onClick: onFinish,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 25
    }
  }, "\u63D0\u4EA4")))));
};

var WikiAddInfo$1 = reactRouter.withRouter(WikiAddInfo);

exports["default"] = WikiAddInfo$1;
