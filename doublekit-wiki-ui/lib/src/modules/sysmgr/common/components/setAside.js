'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var icons = require('@ant-design/icons');
var reactRouterDom = require('react-router-dom');
var setRouter = require('./setRouter.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/sysmgr/common/components/setAside.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OrgaAside = function OrgaAside(props) {
  // 无子级菜单处理
  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1];

  var select = function select(key) {
    setSelectKey(key);
    props.history.push(key);
    console.log(setRouter["default"]);
  };

  var renderMenu = function renderMenu(data, deep) {
    return (
      /*#__PURE__*/
      // <PrivilegeButton code={data.encoded} key={data.key}>
      React__default["default"].createElement("li", {
        className: "orga-aside-li ".concat(data.key === selectKey ? "orga-aside-select" : ""),
        onClick: function onClick() {
          return select(data.key);
        },
        style: {
          paddingLeft: "".concat(deep * 20 + 20),
          cursor: "pointer"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-".concat(data.icon),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 25
        }
      })), data.title) // </PrivilegeButton>

    );
  }; // 树的展开与闭合


  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      expandedTree = _useState4[0],
      setExpandedTree = _useState4[1];

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

  var _useState5 = React.useState(0),
      _useState6 = _slicedToArray(_useState5, 2);
      _useState6[0];
      _useState6[1]; // 子级菜单处理


  var renderSubMenu = function renderSubMenu(_ref, deep) {
    var title = _ref.title,
        key = _ref.key,
        children = _ref.children;
        _ref.encoded;
        var icon = _ref.icon;
    return (
      /*#__PURE__*/
      // <PrivilegeButton code={encoded} key={key}>
      React__default["default"].createElement("li", {
        key: key,
        title: title,
        className: "orga-aside-li",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "orga-aside-item",
        style: {
          paddingLeft: "".concat(deep * 20 + 20)
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        to: key,
        style: {
          color: "#0053ca"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 29
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-".concat(icon),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 33
        }
      })), title), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "orga-aside-item-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 25
        }
      }, children ? isExpandedTree(key) ? /*#__PURE__*/React__default["default"].createElement(icons.DownOutlined, {
        onClick: function onClick() {
          return setOpenOrClose(key);
        },
        style: {
          fontSize: "10px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 37
        }
      }) : /*#__PURE__*/React__default["default"].createElement(icons.UpOutlined, {
        onClick: function onClick() {
          return setOpenOrClose(key);
        },
        style: {
          fontSize: "10px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 37
        }
      }) : "")), /*#__PURE__*/React__default["default"].createElement("ul", {
        key: key,
        title: title,
        className: "orga-aside-ul ".concat(isExpandedTree(key) ? null : 'orga-aside-hidden'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81,
          columnNumber: 21
        }
      }, children && children.map(function (item) {
        var deepnew = deep + 1;
        return item.children && item.children.length ? renderSubMenu(item, deepnew) : renderMenu(item, deepnew);
      }))) // </PrivilegeButton>

    );
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "orga-aside",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("ul", {
    style: {
      padding: 0
    },
    className: "orga-aside-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 17
    }
  }, setRouter["default"] && setRouter["default"].map(function (firstItem) {
    return firstItem.children && firstItem.children.length > 0 ? renderSubMenu(firstItem, 0) : renderMenu(firstItem, 0);
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "orga-change",
    onClick: function onClick() {
      return props.history.push("/index/organ/organ");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 17
    }
  }, "\u7EC4\u7EC7\u7BA1\u7406")));
};

var SetAside = reactRouterDom.withRouter(OrgaAside);

exports["default"] = SetAside;
