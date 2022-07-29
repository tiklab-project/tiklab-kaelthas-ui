'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
var wikiDetailAside = require('./wikiDetailAside.js');
require('./wikiDetail.scss.js');
var reactRouterConfig = require('react-router-config');
var mobxReact = require('mobx-react');
require('doublekit-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/common/components/wikiDetail.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var WikiDetail = function WikiDetail(props) {
  // 解析props
  var wikiStore = props.wikiStore,
      wikiDetailStore = props.wikiDetailStore,
      systemRoleStore = props.systemRoleStore,
      route = props.route; // 解析wikiStore，wikiDetailStore

  var searchwiki = wikiStore.searchwiki,
      getWikilist = wikiStore.getWikilist,
      wikilist = wikiStore.wikilist;
  wikiDetailStore.setWikiId;
  systemRoleStore.getInitProjectPermissions; // 当前知识库名字

  var wiki = JSON.parse(localStorage.getItem("wiki"));
  var wikiname = wiki.name; // 获取当前知识库id

  var wikiId = wiki.id;
  React.useEffect(function () {
    // 从信息页面跳入知识库详情页面时，获取知识库id
    props.location.search; // if(search !== "") {
    //     search = search.split("=")
    //     localStorage.setItem("wiki", search[1]);
    //     setWikiId(search[1])
    // }
    // searchwiki(localStorage.getItem("wikiId")).then((res)=> {
    //     setWikiname(res.name)
    // })
    //获取知识库列表

    getWikilist(); // systemRoleStore.getInitProjectPermissions(getUser().userId, localStorage.getItem("wikiId"))

    return;
  }, [wikiId]);
  return /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wikidetail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiDetailAside["default"], _extends({
    wikiName: wikiname,
    wikilist: wikilist,
    searchwiki: searchwiki
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wikidetail-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 13
    }
  }, reactRouterConfig.renderRoutes(route.routes)));
};

var wikiDetail = mobxReact.inject("systemRoleStore", 'wikiStore', 'wikiDetailStore')(mobxReact.observer(WikiDetail));

exports["default"] = wikiDetail;
