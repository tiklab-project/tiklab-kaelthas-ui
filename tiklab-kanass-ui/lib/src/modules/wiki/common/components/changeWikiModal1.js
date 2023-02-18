'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
var React = require('react');
require('react-router-dom');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/changeWikiModal1.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ChangeWikiModal = function ChangeWikiModal(props) {
  var searchwiki = props.searchwiki,
      wikilist = props.wikilist,
      changeWikiVisible = props.changeWikiVisible,
      setChangeWikiVisible = props.setChangeWikiVisible; // 切换知识库窗口弹窗，鼠标移入与移出效果

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      selectWiki = _useState2[0],
      setSelectWiki = _useState2[1];
  /**
   * 隐藏切换知识库弹窗
   */


  var handleCancel = function handleCancel() {
    setChangeWikiVisible(false);
  };
  /**
   * 切换知识库
   * @param {id} id 
   */


  var selectWikiId = function selectWikiId(wiki) {
    // 切换选中知识库，获取知识库详情
    searchwiki(wiki.id); // 讲当前知识库id存入localStorage

    localStorage.setItem("wiki", JSON.stringify(wiki)); // 重置事项id
    // 关闭切换弹窗

    setChangeWikiVisible(false); // 切换路由
    // props.history.push(selectKey)
    // 强制刷新

    location.reload();
  };
  /**
   * 切换知识库弹窗，鼠标移入
   * @param {*} id 
   */


  var handleMouseOver = function handleMouseOver(id) {
    setSelectWiki(id);
  };
  /**
   * 切换知识库弹窗，鼠标移出
   */


  var handleMouseOut = function handleMouseOut() {
    setSelectWiki("");
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    className: "wiki-modal",
    title: "\u9009\u62E9\u77E5\u8BC6\u5E93",
    visible: changeWikiVisible,
    onCancel: handleCancel,
    footer: [/*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
      key: "back",
      onClick: handleCancel,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 21
      }
    }, "\u53D6\u6D88")],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 13
    }
  }, wikilist && wikilist.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-name ".concat(item.id === selectWiki ? "wiki-selectName" : ""),
      onClick: function onClick() {
        return selectWikiId(item);
      },
      key: item.id,
      onMouseOver: function onMouseOver() {
        return handleMouseOver(item.id);
      },
      onMouseOut: handleMouseOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69,
        columnNumber: 32
      }
    }, item.name);
  })));
};

var changeWikiModal1 = mobxReact.inject("wikiDetailStore")(mobxReact.observer(ChangeWikiModal));

exports["default"] = changeWikiModal1;
