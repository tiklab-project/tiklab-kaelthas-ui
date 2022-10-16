'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/dropdown/style/css');
var _Dropdown = require('antd/es/dropdown');
require('antd/es/space/style/css');
var _Space = require('antd/es/space');
require('antd/es/badge/style/css');
var _Badge = require('antd/es/badge');
require('antd/es/avatar/style/css');
var _Avatar = require('antd/es/avatar');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
var React = require('react');
var reactI18next = require('react-i18next');
var reactRouter = require('react-router');
var icons = require('@ant-design/icons');
var tiklabCoreUi = require('tiklab-core-ui');
var vipOne = require('../../../assets/images/vip-one.png.js');
var vipTwo = require('../../../assets/images/vip-two.png.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(_Dropdown);
var _Space__default = /*#__PURE__*/_interopDefaultLegacy(_Space);
var _Badge__default = /*#__PURE__*/_interopDefaultLegacy(_Badge);
var _Avatar__default = /*#__PURE__*/_interopDefaultLegacy(_Avatar);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/localHeader.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Header = function Header(props) {
  var logo = props.logo,
      AppConfigComponent = props.AppConfigComponent;
      props.languageSelectData;
      var projectLogout = props.projectLogout,
      routers = props.routers;

  var _useState = React.useState(props.location.pathname),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var setCurrentLink = _useState2[1];

  tiklabCoreUi.getUser().loginType;

  var _useTranslation = reactI18next.useTranslation(),
      i18n = _useTranslation.i18n;

  var _useState3 = React.useState(i18n.language),
      _useState4 = _slicedToArray(_useState3, 2);
      _useState4[0];
      _useState4[1];

  var isEE = tiklabCoreUi.getVersionInfo().release;
  JSON.parse(localStorage.getItem("authConfig")).authType;
  var eeText = isEE === 2 ? vipTwo["default"] : vipOne["default"];
  var path = props.location.pathname;

  var changeCurrentLink = function changeCurrentLink(item) {
    setCurrentLink(item.to);
    props.history.push(item.to);
  };

  var renderRouter = function renderRouter() {
    if (routers) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: 'frame-header-link',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        key: "home",
        onClick: function onClick() {
          return changeCurrentLink(routers[0]);
        },
        className: "frame-header-link-item ".concat(path.indexOf("home") !== -1 ? 'frame-header-link-active' : null),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 21
        }
      }, " ", routers[0].title), /*#__PURE__*/React__default["default"].createElement("div", {
        key: "wiki",
        onClick: function onClick() {
          return changeCurrentLink(routers[1]);
        },
        className: "frame-header-link-item ".concat(path.indexOf("wiki") !== -1 ? 'frame-header-link-active' : null),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 21
        }
      }, " ", routers[1].title));
    }
  };

  var useMenu = /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "0",
    onClick: function onClick() {
      return projectLogout();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 17
    }
  }, "\u9000\u51FA")));
  /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    onClick: function onClick() {
      return goSet("/index/organ/organ");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, "\u5E10\u53F7\u4E0E\u6210\u5458")), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    onClick: function onClick() {
      return goSet("/index/sysmgr/systemFeature");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 17
    }
  }, "\u7CFB\u7EDF\u8BBE\u7F6E")));

  var goSet = function goSet(url) {
    props.history.push(url);
    setCurrentLink("set");
  };

  var languageMenu = /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 13
    }
  }, "\u4E2D\u6587"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  }, "\u82F1\u6587"));
  return /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "frame-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    span: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-right',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 17
    }
  }, AppConfigComponent, logo && /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-logo',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 30
    }
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: logo,
    alt: 'logo',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 67
    }
  })), renderRouter())), /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    span: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-right',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-right-search-wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 21
    }
  }, props.search), /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-right-text',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "#/index/userMessage",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Badge__default["default"], {
    count: 5,
    size: "small",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Avatar__default["default"], {
    size: "small",
    style: {
      background: "transparent",
      fontSize: "22px"
    },
    icon: /*#__PURE__*/React__default["default"].createElement(icons.MessageOutlined, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 114
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 33
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-language",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: languageMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    style: {
      width: "28px",
      height: "28px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-language",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 41
    }
  }))))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-set",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    style: {
      width: "25px",
      height: "25px"
    },
    onClick: function onClick() {
      return goSet("/index/sysmgr/systemFeature");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-shezhi",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 33
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-user",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    style: {
      width: "28px",
      height: "28px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-touxiang",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: useMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 37
    }
  }, tiklabCoreUi.getUser().name, /*#__PURE__*/React__default["default"].createElement(icons.DownOutlined, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 41
    }
  }))))), /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      marginRight: "20px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: eeText,
    alt: "",
    width: "20px",
    height: "20px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 29
    }
  }))))));
};

var LocalHeader = reactRouter.withRouter(Header);

exports["default"] = LocalHeader;