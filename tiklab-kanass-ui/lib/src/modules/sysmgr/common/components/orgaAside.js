'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var icons = require('@ant-design/icons');
var reactRouterDom = require('react-router-dom');
var orgaRouter = require('./orgaRouter.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/common/components/orgaAside.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OrgaAside = function OrgaAside(props) {
  // 无子级菜单处理
  props.pluginsStore;

  var _useState = React.useState("/index/organ/organ"),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1]; // const {pluginConfig} = pluginsStore;


  var select = function select(key) {
    setSelectKey(key);
    props.history.push(key);
  };

  JSON.parse(localStorage.getItem("authConfig")).authType;

  var _useState3 = React.useState(orgaRouter["default"]),
      _useState4 = _slicedToArray(_useState3, 2),
      router = _useState4[0];
      _useState4[1];

  var renderMenu = function renderMenu(data, deep) {
    return (
      /*#__PURE__*/
      // <PrivilegeButton code={data.encoded} key={data.key}>
      React__default["default"].createElement("li", {
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
          lineNumber: 31,
          columnNumber: 13
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-".concat(data.icon),
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
      }, data.title)) // </PrivilegeButton>

    );
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

  var renderSubMenu = function renderSubMenu(item, deep) {
    return (
      /*#__PURE__*/
      // <PrivilegeButton code={item.encoded} key={item.key}>
      React__default["default"].createElement("li", {
        key: item.code,
        title: item.title,
        className: "orga-aside-li",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 17
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
          lineNumber: 67,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        to: item.key,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 29
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-".concat(item.icon),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 33
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "orga-aside-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 29
        }
      }, item.title)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "orga-aside-item-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 25
        }
      }, item.children ? isExpandedTree(item.key) ? /*#__PURE__*/React__default["default"].createElement(icons.DownOutlined, {
        style: {
          fontSize: "10px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 37
        }
      }) : /*#__PURE__*/React__default["default"].createElement(icons.UpOutlined, {
        style: {
          fontSize: "10px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 37
        }
      }) : "")), /*#__PURE__*/React__default["default"].createElement("ul", {
        title: item.title,
        className: "orga-aside-ul ".concat(isExpandedTree(item.key) ? null : 'orga-aside-hidden'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 21
        }
      }, item.children && item.children.map(function (item) {
        var deepnew = deep + 1;
        return item.children && item.children.length ? renderSubMenu(item, deepnew) : renderMenu(item, deepnew);
      }))) // </PrivilegeButton>

    );
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "orga-aside",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
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
      lineNumber: 102,
      columnNumber: 17
    }
  }, router && router.map(function (firstItem) {
    return firstItem.children && firstItem.children.length > 0 ? renderSubMenu(firstItem, 0) : renderMenu(firstItem, 0);
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "orga-change",
    onClick: function onClick() {
      return props.history.push("/index/sysmgr/systemFeature");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 17
    }
  }, "\u8BBE\u7F6E")));
};

var OrgaAside$1 = reactRouterDom.withRouter(OrgaAside);

exports["default"] = OrgaAside$1;
