'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/table/style/css');
var _Table = require('antd/es/table');
require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
require('antd/es/breadcrumb/style/css');
var _Breadcrumb = require('antd/es/breadcrumb');
require('antd/es/space/style/css');
var _Space = require('antd/es/space');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var wikiAdd = require('./wikiAdd.js');
var mobxReact = require('mobx-react');
var reactRouterDom = require('react-router-dom');
var doublekitCoreUi = require('doublekit-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Table__default = /*#__PURE__*/_interopDefaultLegacy(_Table);
var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var _Breadcrumb__default = /*#__PURE__*/_interopDefaultLegacy(_Breadcrumb);
var _Space__default = /*#__PURE__*/_interopDefaultLegacy(_Space);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/wiki/components/wikiContent.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var Search = _Input__default["default"].Search;

var Wikicontent = function Wikicontent(props) {
  var wikiStore = props.wikiStore,
      wikilist = props.wikilist,
      wikiTypelist = props.wikiTypelist,
      getWikiTypeList = props.getWikiTypeList,
      getUseList = props.getUseList,
      uselist = props.uselist;
  var getWikilist = wikiStore.getWikilist,
      addWikilist = wikiStore.addWikilist,
      searchwiki = wikiStore.searchwiki,
      createDocumentRecent = wikiStore.createDocumentRecent,
      wikiPageParams = wikiStore.wikiPageParams,
      delewikiList = wikiStore.delewikiList,
      updateWiki = wikiStore.updateWiki;
  var userId = doublekitCoreUi.getUser().userId; // const [wikilist,getWikiList] = useState([])

  React.useEffect(function () {
    getWikilist(); // .then((data)=> {
    //     getWikiList([...data.dataList])
    // })
  }, []);
  var columns = [{
    title: "知识库名称",
    dataIndex: "name",
    key: "wikiName",
    align: "center",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return goWikidetail(record);
        },
        className: "span-botton",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 38
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-zhishi",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 29
        }
      })), text);
    }
  }, {
    title: "知识库编码",
    dataIndex: "id",
    key: "id",
    align: "center"
  }, {
    title: "负责人",
    dataIndex: ["master", "name"],
    key: "master",
    align: "center"
  }, // {
  //     title: "知识库状态",
  //     dataIndex: "wikiState",
  //     key: "wikiState",
  //     align: "center",
  //     render: (text) =>(()=>{
  //                 switch(text){
  //                     case "1": 
  //                         return <span>未开始</span>
  //                     case "2": 
  //                         return <span>已开始</span>
  //                     case "3": 
  //                         return <span>已结束</span>
  //                     }
  //             })()
  // },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    align: "center"
  }, {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
        size: "middle",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 13
        }
      }, /*#__PURE__*/React__default["default"].createElement(wikiAdd["default"], {
        type: "edit",
        id: record.id,
        name: "\u7F16\u8F91",
        searchwiki: searchwiki,
        updateWiki: updateWiki,
        getWikiTypeList: getWikiTypeList,
        wikiTypelist: wikiTypelist,
        getUseList: getUseList,
        uselist: uselist,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 17
        }
      }), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "span-botton  delete",
        onClick: function onClick() {
          return delewikiList(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-delete",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 25
        }
      })), "\u5220\u9664"));
    }
  }];

  var goWikidetail = function goWikidetail(wiki) {
    var params = {
      name: wiki.name,
      model: "wiki",
      modelId: wiki.id,
      master: {
        id: userId
      },
      repository: {
        id: wiki.id
      }
    };
    createDocumentRecent(params);
    localStorage.setItem("wiki", JSON.stringify(wiki)); // wikiDetailStore.setWikiId(id)

    props.history.push({
      pathname: "/index/wikidetail"
    });
  };

  var onSearch = function onSearch(value) {
    getWikilist({
      name: value
    });
  };

  var handleTableChange = function handleTableChange(pagination) {
    getWikilist({
      current: pagination.current
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 17
    }
  }, "\u77E5\u8BC6\u5E93\u7BA1\u7406"), /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 21
    }
  }, "\u77E5\u8BC6\u5E93\u5217\u8868"))), /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 22,
      offset: 1
    },
    lg: {
      span: 22,
      offset: 2
    },
    md: {
      span: 20,
      offset: 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search-add",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(Search, {
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
    allowClear: true,
    onSearch: onSearch,
    style: {
      width: 300
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement(wikiAdd["default"], {
    name: "\u6DFB\u52A0\u77E5\u8BC6\u5E93",
    type: "add",
    addWikilist: addWikilist,
    searchwiki: searchwiki,
    wikiTypelist: wikiTypelist,
    getWikiTypeList: getWikiTypeList,
    getUseList: getUseList,
    uselist: uselist,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "table-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Table__default["default"], {
    columns: columns,
    dataSource: wikilist,
    rowKey: function rowKey(record) {
      return record.id;
    },
    onChange: handleTableChange,
    pagination: _objectSpread({}, wikiPageParams),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 21
    }
  })))));
};

var Wikicontent$1 = mobxReact.inject('wikiDetailStore', 'wikiStore')(mobxReact.observer(reactRouterDom.withRouter(Wikicontent)));

exports["default"] = Wikicontent$1;
