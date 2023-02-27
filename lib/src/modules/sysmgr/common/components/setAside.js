'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var icons = require('@ant-design/icons');
var reactRouterDom = require('react-router-dom');
require('mobx-react');
var setRouter = require('./setRouter.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/common/components/setAside.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//import "../../../../assets/font-icon/iconfont";
var SetAside = function SetAside(props) {
  // 无子级菜单处理
  var _useState = React.useState("/index/organ/organ"),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1]; //true 内嵌 false 统一


  var authType = JSON.parse(localStorage.getItem("authConfig")).authType;
  JSON.parse(localStorage.getItem("authConfig")).authUrl;

  var _useState3 = React.useState(setRouter.setDevEamRouter),
      _useState4 = _slicedToArray(_useState3, 2),
      router = _useState4[0],
      setRouterMenu = _useState4[1];

  var select = function select(key, index) {
    props.history.push(key);
    setSelectKey(key);
  };

  React.useEffect(function () {
    if (env === "local" && authType === true) {
      setRouterMenu(setRouter.setDevEamRouter);
    }

    if (env === "local" && authType === false) {
      setRouterMenu(setRouter.setDevRouter);
    }

    if (env !== "local" && authType === true) {
      setRouterMenu(setRouter.setPrdEamRouter);
    }

    if (env !== "local" && authType === false) {
      setRouterMenu(setRouter.setPrdRouter);
    }

    return;
  }, []);

  var renderMenu = function renderMenu(data, deep, index) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      style: {
        cursor: "pointer",
        paddingLeft: "".concat(deep * 20 + 20)
      },
      className: "orga-aside-li orga-aside-second ".concat(data.key === selectKey ? "orga-aside-select" : ""),
      onClick: function onClick() {
        return select(data.key);
      },
      key: data.code,
      code: data.encoded,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "orga-aside-item-left",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "svg-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-".concat(data.icon),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 21
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 17
      }
    }, data.title)));
  }; // 树的展开与闭合


  var _useState5 = React.useState(["/index/organ/organ"]),
      _useState6 = _slicedToArray(_useState5, 2),
      expandedTree = _useState6[0],
      setExpandedTree = _useState6[1];

  var isExpandedTree = function isExpandedTree(key) {
    return expandedTree.some(function (item) {
      return item === key;
    });
  };

  var setOpenOrClose = function setOpenOrClose(key) {
    if (isExpandedTree(key)) {
      setExpandedTree(expandedTree.filter(function (item) {
        return item !== key;
      }));
    } else {
      setExpandedTree(expandedTree.concat(key));
    }
  };

  var renderSubMenu = function renderSubMenu(item, deep, index) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      key: item.code,
      title: item.title,
      className: "orga-aside-li",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "orga-aside-item orga-aside-first",
      style: {
        paddingLeft: "".concat(deep * 20 + 20)
      },
      onClick: function onClick() {
        return setOpenOrClose(item.key);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      to: item.key,
      className: "orga-aside-item-left",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "svg-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-".concat(item.icon),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 29
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "orga-aside-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 25
      }
    }, item.title)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "orga-aside-item-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96,
        columnNumber: 21
      }
    }, item.children ? isExpandedTree(item.key) ? /*#__PURE__*/React__default["default"].createElement(icons.DownOutlined, {
      style: {
        fontSize: "10px"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 33
      }
    }) : /*#__PURE__*/React__default["default"].createElement(icons.UpOutlined, {
      style: {
        fontSize: "10px"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 33
      }
    }) : "")), /*#__PURE__*/React__default["default"].createElement("ul", {
      title: item.title,
      className: "orga-aside-ul ".concat(isExpandedTree(item.key) ? null : 'orga-aside-hidden'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 17
      }
    }, item.children && item.children.map(function (item) {
      var deepnew = deep + 1;
      return item.children && item.children.length ? renderSubMenu(item, deepnew) : renderMenu(item, deepnew);
    })));
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "orga-aside",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("ul", {
    style: {
      padding: 0
    },
    key: "0",
    className: "orga-aside-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 17
    }
  }, router && router.map(function (firstItem, index) {
    return firstItem.children && firstItem.children.length > 0 ? renderSubMenu(firstItem, 0) : renderMenu(firstItem, 0);
  }))));
};

var SetAside$1 = reactRouterDom.withRouter(SetAside);

exports["default"] = SetAside$1;
