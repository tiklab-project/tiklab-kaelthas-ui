'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
var wikiAside = require('./wikiAside.js');
var wikiContent = require('./wikiContent.js');
require('./wiki.scss.js');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/wiki/components/wiki.js";
var Sider = _Layout__default["default"].Sider;

var Wiki = function Wiki(props) {
  var wikiStore = props.wikiStore;
  var getWikilist = wikiStore.getWikilist,
      wikilist = wikiStore.wikilist,
      wikiTypelist = wikiStore.wikiTypelist,
      getWikiTypeList = wikiStore.getWikiTypeList,
      getUseList = wikiStore.getUseList,
      uselist = wikiStore.uselist; // 初始化获取知识库列表

  React.useEffect(function () {
    getWikilist();
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wiki-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiAside["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wiki-table",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiContent["default"], {
    wikilist: wikilist,
    wikiTypelist: wikiTypelist,
    getWikiTypeList: getWikiTypeList,
    getUseList: getUseList,
    uselist: uselist,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 21
    }
  }))));
};

var wiki = mobxReact.inject('wikiStore')(mobxReact.observer(Wiki));

exports["default"] = wiki;
