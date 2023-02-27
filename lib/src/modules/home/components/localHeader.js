'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/dropdown/style/css');
var _Dropdown = require('antd/es/dropdown');
require('antd/es/space/style/css');
var _Space = require('antd/es/space');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('tiklab-eam-ui/es/work-app-config/style');
var _WorkAppConfig = require('tiklab-eam-ui/es/work-app-config');
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
require('tiklab-eam-ui/es/profile/style');
var _Profile = require('tiklab-eam-ui/es/profile');
var React = require('react');
var reactI18next = require('react-i18next');
var reactRouter = require('react-router');
var tiklabCoreUi = require('tiklab-core-ui');
var message = require('./message.js');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(_Dropdown);
var _Space__default = /*#__PURE__*/_interopDefaultLegacy(_Space);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _WorkAppConfig__default = /*#__PURE__*/_interopDefaultLegacy(_WorkAppConfig);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var _Profile__default = /*#__PURE__*/_interopDefaultLegacy(_Profile);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/localHeader.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Header = function Header(props) {
  var logo = props.logo;
      props.languageSelectData;
      var routers = props.routers,
      homeStore = props.homeStore;
  var menuKey = sessionStorage.getItem("menuKey") && props.location.pathname !== "/index/home" ? sessionStorage.getItem("menuKey") : "home";
  React.useEffect(function () {}, []);
  homeStore.currentLink;
      var setCurrentLink = homeStore.setCurrentLink;

  var _useTranslation = reactI18next.useTranslation(),
      i18n = _useTranslation.i18n;

  var _useState = React.useState(i18n.language),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showLanguage = _useState4[0],
      setShowLanguage = _useState4[1];

  var user = tiklabCoreUi.getUser();

  var changeCurrentLink = function changeCurrentLink(item) {
    localStorage.removeItem("sprintId");
    props.history.push(item.to);
    setCurrentLink(item.key);
    sessionStorage.setItem("menuKey", item.key);
  };

  var renderRouter = function renderRouter() {
    if (routers) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: 'frame-header-link',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        key: "home",
        onClick: function onClick() {
          return changeCurrentLink(routers[0]);
        },
        className: "frame-header-link-item ".concat(menuKey === "home" ? 'frame-header-link-active' : null),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 21
        }
      }, " ", routers[0].title), /*#__PURE__*/React__default["default"].createElement("div", {
        key: "wiki",
        onClick: function onClick() {
          return changeCurrentLink(routers[1]);
        },
        className: "frame-header-link-item ".concat(menuKey === "wiki" ? 'frame-header-link-active' : null),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 21
        }
      }, " ", routers[1].title));
    }
  };

  var logOut = function logOut() {
    props.history.push({
      pathname: '/logout',
      state: window.location.href
    });
  };

  var useMenu = /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 13
    }
  }, "\u4E2A\u4EBA\u8D44\u6599"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Profile__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-info-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-info-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 21
    }
  }, user.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-info-email",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 21
    }
  }, user.phone || "暂无"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "user-language",
    onMouseEnter: function onMouseEnter() {
      return setShowLanguage(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setShowLanguage(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "language-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "language-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    fill: "#fff",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 20
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-yuyan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 25
    }
  })), "\u8BED\u8A00\u5207\u6362"), /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    fill: "#fff",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 25
    }
  }))), showLanguage && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "language-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "language-box-item language-box-select",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 25
    }
  }, "\u4E2D\u6587"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "language-box-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 25
    }
  }, "\u82F1\u6587"))), /*#__PURE__*/React__default["default"].createElement("div", {
    onClick: logOut,
    className: "user-logout",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-logout",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 21
    }
  })), "\u9000\u51FA"));

  var goSet = function goSet(url) {
    props.history.push(url);
    setCurrentLink("set");
    sessionStorage.setItem("menuKey", "set");
  };

  /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }, "\u4E2D\u6587"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 13
    }
  }, "\u82F1\u6587"));
  var helpMenu = /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 13
    }
  }, "\u5E2E\u52A9"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "help-item-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-doc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 25
    }
  })), "\u6587\u6863"), /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-jump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 21
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "help-item-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-cuservice",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 25
    }
  })), "\u793E\u533A\u652F\u6301"), /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-jump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 21
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "help-item-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-workorder",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 25
    }
  })), "\u5728\u7EBF\u5DE5\u5355"), /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-jump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 21
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "help-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "help-item-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-community",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 25
    }
  })), "\u5728\u7EBF\u5BA2\u670D"), /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-jump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 21
    }
  }))));
  return /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "frame-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    span: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-left',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_WorkAppConfig__default["default"], {
    isSSO: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 21
    }
  }), logo && /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-logo',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 30
    }
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: logo,
    alt: 'logo',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 67
    }
  })), renderRouter())), /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    span: 12,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-right',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-right-search-wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 21
    }
  }, props.search), /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'frame-header-right-text',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-set",
    "data-title": "\u7CFB\u7EDF\u8BBE\u7F6E",
    onClick: function onClick() {
      return goSet("/index/setting/organ");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "header-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-iconsetsys",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 41
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(message["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-help",
    "data-title": "\u5E2E\u52A9\u4E0E\u652F\u6301",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: helpMenu,
    trigger: "click",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "header-icon",
    style: {
      stroke: '#fff'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-help",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 45
    }
  })))))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "frame-header-name",
    "data-title": "\u4E2A\u4EBA\u8D44\u6599\u4E0E\u8BBE\u7F6E",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: useMenu,
    trigger: "click",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Profile__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 41
    }
  })))))))));
};

var LocalHeader = reactRouter.withRouter(mobxReact.inject('homeStore')(mobxReact.observer(Header)));

exports["default"] = LocalHeader;
