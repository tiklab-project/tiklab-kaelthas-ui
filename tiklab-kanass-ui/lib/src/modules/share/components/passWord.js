'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
var logo = require('../../../assets/images/logo.png.js');
require('./passWord.scss.js');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/share/components/passWord.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PassWord = function PassWord(props) {
  var shareStore = props.shareStore;
  var verifyAuthCode = shareStore.verifyAuthCode;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var change = function change(e) {
    setValue(e.target.value);
  };

  var jump = function jump() {
    verifyAuthCode({
      shareLink: "".concat(props.match.params.shareId).concat(props.location.search),
      authCode: value
    }).then(function (data) {
      if (data.data === "true") {
        props.history.push({
          pathname: "/shareDocument/".concat(props.match.params.id, "/").concat(props.match.params.shareId).concat(props.location.search),
          state: {
            password: data.data
          }
        });
      }
    });
  };

  React.useEffect(function () {});
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "documment-password",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 12
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "password-log",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: logo["default"],
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 13
    }
  }, "\u77E5\u8BC6\u5E93")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "password-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "box-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 17
    }
  }, "admin")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "box-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "box-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 17
    }
  }, "\u8BF7\u586B\u5199\u63D0\u53D6\u7801\uFF1A"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "box-input",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    onChange: function onChange(e) {
      return change(e);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    type: "primary",
    onClick: function onClick() {
      return jump();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 21
    }
  }, "\u786E\u5B9A")))));
}; // export default PassWord;


var passWord = mobxReact.inject("shareStore")(mobxReact.observer(reactRouter.withRouter(PassWord)));

exports["default"] = passWord;
