'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouter = require('react-router');
require('./breadcrumb.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/common/breadcrumb/breadcrumb.js";

var Breadcumb = function Breadcumb(props) {
  props.homeImage;
      var firstText = props.firstText,
      secondText = props.secondText,
      firstUrl = props.firstUrl,
      children = props.children;

  var goUrl = function goUrl() {
    if (firstUrl) {
      props.history.push(firstUrl);
    } else {
      props.history.goBack();
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "page-head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "page-breadcrumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    onClick: function onClick() {
      return goUrl();
    },
    className: "".concat(secondText ? "page-link" : ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, firstText), secondText && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-rightBlue",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 25
    }
  }, secondText))), children);
};

var Breadcumb$1 = reactRouter.withRouter(Breadcumb);

exports["default"] = Breadcumb$1;
