'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
var React = require('react');
require('./moveLogList.scss.js');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/moveLogList.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MoveLogList = function MoveLogList(props) {
  var wikiCatalogueList = props.wikiCatalogueList,
      moveLogListVisible = props.moveLogListVisible,
      setMoveLogListVisible = props.setMoveLogListVisible,
      setWikiCatalogueList = props.setWikiCatalogueList,
      formatType = props.formatType,
      moveCategoryId = props.moveCategoryId,
      findWikiCatalogue = props.findWikiCatalogue,
      updateDocument = props.updateDocument,
      updateWikiCatalogue = props.updateWikiCatalogue,
      moveCategoryParentId = props.moveCategoryParentId;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1];

  var wikiId = props.match.params.wikiId;

  var onFinish = function onFinish() {
    var value;

    if (formatType === "category") {
      if (selectKey) {
        value = {
          parentCategory: {
            id: selectKey
          },
          id: moveCategoryId
        };
      } else {
        value = {
          id: moveCategoryId
        };
      }

      updateWikiCatalogue(value).then(function (res) {
        if (res.code === 0) {
          findWikiCatalogue(wikiId).then(function (data) {
            setWikiCatalogueList(data);
          });
          setMoveLogListVisible(false);
        }
      });
    } else {
      if (selectKey) {
        value = {
          category: {
            id: selectKey
          },
          id: moveCategoryId
        };
      } else {
        value = {
          id: moveCategoryId
        };
      }

      updateDocument(value).then(function (res) {
        if (res.code === 0) {
          findWikiCatalogue(wikiId).then(function (data) {
            setWikiCatalogueList(data);
          });
          setMoveLogListVisible(false);
        }
      });
    }
  };
  /**
  * 折叠菜单
  */


  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      expandedTree = _useState4[0],
      setExpandedTree = _useState4[1]; // 树的展开与闭合


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

  var logTree = function logTree(data, levels, faid) {
    var newLevels = 0;
    return data && data.length > 0 && data.map(function (category) {
      if (category.formatType === "category" && moveCategoryParentId !== category.id) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "".concat(!isExpandedTree(faid) || selectKey !== faid ? null : 'wiki-menu-submenu-hidden'),
          key: category.id,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80,
            columnNumber: 24
          }
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "wiki-menu-submenu ".concat(category.id === selectKey ? "wiki-menu-select" : "", " "),
          key: category.id,
          onClick: function onClick() {
            return setSelectKey(category.id);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 17
          }
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            paddingLeft: levels * 10
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 21
          }
        }, category.children && category.children.length > 0 ? isExpandedTree(category.id) ? /*#__PURE__*/React__default["default"].createElement("svg", {
          className: "icon",
          "aria-hidden": "true",
          onClick: function onClick() {
            return setOpenOrClose(category.id);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 63
          }
        }, /*#__PURE__*/React__default["default"].createElement("use", {
          xlinkHref: "#icon-right",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 37
          }
        })) : /*#__PURE__*/React__default["default"].createElement("svg", {
          className: "icon",
          "aria-hidden": "true",
          onClick: function onClick() {
            return setOpenOrClose(category.id);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 93,
            columnNumber: 37
          }
        }, /*#__PURE__*/React__default["default"].createElement("use", {
          xlinkHref: "#icon-down",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 41
          }
        })) : /*#__PURE__*/React__default["default"].createElement("svg", {
          className: "icon",
          "aria-hidden": "true",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95,
            columnNumber: 46
          }
        }, /*#__PURE__*/React__default["default"].createElement("use", {
          xlinkHref: "",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96,
            columnNumber: 37
          }
        })), /*#__PURE__*/React__default["default"].createElement("svg", {
          className: "icon",
          "aria-hidden": "true",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 25
          }
        }, /*#__PURE__*/React__default["default"].createElement("use", {
          xlinkHref: "#icon-folder",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 29
          }
        })), /*#__PURE__*/React__default["default"].createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102,
            columnNumber: 25
          }
        }, category.name, " "))), category.children && category.children.length > 0 && (newLevels = levels + 1) && logTree(category.children, newLevels, category.id));
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: "\u9009\u62E9\u79FB\u52A8\u76EE\u5F55",
    visible: moveLogListVisible,
    onOk: function onOk() {
      return onFinish();
    },
    onCancel: function onCancel() {
      return setMoveLogListVisible(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "move-menu",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 13
    }
  }, moveLogListVisible && wikiCatalogueList && logTree(wikiCatalogueList, 1, 0)));
};

var MoveLogList$1 = reactRouter.withRouter(MoveLogList);

exports["default"] = MoveLogList$1;
