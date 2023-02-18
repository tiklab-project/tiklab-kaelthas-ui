'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/table/style/css');
var _Table = require('antd/es/table');
require('antd/es/space/style/css');
var _Space = require('antd/es/space');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var wikiAdd = require('./wikiAdd.js');
var mobxReact = require('mobx-react');
var reactRouterDom = require('react-router-dom');
var tiklabCoreUi = require('tiklab-core-ui');
var breadcrumb = require('../../../../common/breadcrumb/breadcrumb.js');
var inputSearch = require('../../../../common/input/inputSearch.js');
require('./wiki.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Table__default = /*#__PURE__*/_interopDefaultLegacy(_Table);
var _Space__default = /*#__PURE__*/_interopDefaultLegacy(_Space);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/wiki/components/wikiList.js";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_Input__default["default"].Search;

var Wikicontent = function Wikicontent(props) {
  var wikiStore = props.wikiStore;
  var findRepositoryList = wikiStore.findRepositoryList;
      wikiStore.addWikilist;
      wikiStore.searchwiki;
      var createDocumentRecent = wikiStore.createDocumentRecent,
      wikilist = wikiStore.wikilist,
      delewikiList = wikiStore.delewikiList;
      wikiStore.updateWiki;
      var findRecentRepositoryList = wikiStore.findRecentRepositoryList,
      createRepositoryFocus = wikiStore.createRepositoryFocus,
      findRepositoryFocusList = wikiStore.findRepositoryFocusList,
      deleteRepositoryFocusByCondition = wikiStore.deleteRepositoryFocusByCondition;
  var userId = tiklabCoreUi.getUser().userId;

  var _useState = React.useState("2"),
      _useState2 = _slicedToArray(_useState, 2),
      activeTabs = _useState2[0],
      setActiveTabs = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      focusRepositoryList = _useState4[0],
      setFocusRepositoryList = _useState4[1];

  var wiliTab = [{
    title: '所有知识库',
    key: '1',
    icon: "project"
  }, {
    title: '我最近浏览的',
    key: '2',
    icon: "programrencent"
  }, {
    title: '我收藏的',
    key: '3',
    icon: "programconcern"
  }, {
    title: '我创建的',
    key: '4',
    icon: "programbuild"
  }];
  React.useEffect(function () {
    findRecentRepositoryList({
      model: "wiki"
    });
    findRepositoryFocusList({}).then(function (data) {
      if (data.code === 0) {
        var ids = [];
        data.data.map(function (item) {
          ids.push(item.id);
        });
        setFocusRepositoryList(ids);
      }
    });
  }, []);
  var columns = [{
    title: "知识库名称",
    dataIndex: "name",
    key: "name",
    align: "left",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        onClick: function onClick() {
          return goWikidetail(record);
        },
        className: "wiki-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 39
        }
      }, record.iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
        src: '/images/' + record.iconUrl,
        alt: "",
        className: "img-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 25
        }
      }) : /*#__PURE__*/React__default["default"].createElement("img", {
        src: 'images/repository1.png',
        alt: "",
        className: "img-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 25
        }
      }), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "wiki-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 17
        }
      }, text));
    }
  }, // {
  //     title: "知识库编码",
  //     dataIndex: "id",
  //     key: "id",
  //     align: "left",
  // },
  {
    title: "负责人",
    dataIndex: ["master", "name"],
    key: "master",
    align: "left",
    width: "20%"
  }, {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "left",
    width: "20%"
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
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "left",
    width: "15%",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
        size: "middle",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123,
          columnNumber: 17
        }
      }, focusRepositoryList.indexOf(record.id) !== -1 ? /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "svg-icon",
        "aria-hidden": "true",
        onClick: function onClick() {
          return deleteFocusRepository(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126,
          columnNumber: 29
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-focus",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127,
          columnNumber: 33
        }
      })) : /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "svg-icon",
        "aria-hidden": "true",
        onClick: function onClick() {
          return addFocusRepository(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 29
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-nofocus",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 33
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "span-botton  delete",
        onClick: function onClick() {
          return delewikiList(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-delete",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 29
        }
      }))));
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
    createDocumentRecent(params); // wikiDetailStore.setWikiId(id)

    props.history.push({
      pathname: "/index/wikidetail/".concat(wiki.id, "/survey")
    });
  };

  var handleTableChange = function handleTableChange(pagination) {
    findRepositoryList({
      current: pagination.current
    });
  };

  var onSearch = function onSearch(value) {
    console.log(value); // switch (activeTabs) {
    //     case "1":
    //         findJoinProjectList({ projectName: value, creator: null })
    //         break;
    //     case "2":
    //         findRecentProjectPage({ projectName: value })
    //         break;
    //     case "3":
    //         findProjectList({ master: userId, projectName: value })
    //         break;
    //     case "4":
    //         findJoinProjectList({ creator: userId, projectName: value });
    //         break
    //     default:
    //         break;
    // }
  };

  var selectTabs = function selectTabs(key) {
    setActiveTabs(key);

    switch (key) {
      case "1":
        findRepositoryList({});
        break;

      case "2":
        findRecentRepositoryList({
          master: userId
        });
        break;

      case "3":
        findRepositoryFocusList({
          masterId: userId
        });
        break;

      case "4":
        findRepositoryList({
          masterId: userId
        });
        break;
    }
  };

  var addFocusRepository = function addFocusRepository(id) {
    createRepositoryFocus({
      repositoryId: id
    }).then(function (res) {
      if (res.code === 0) {
        focusRepositoryList.push(id);
        setFocusRepositoryList(_toConsumableArray(focusRepositoryList));
      }
    });
  };

  var deleteFocusRepository = function deleteFocusRepository(id) {
    var params = {
      masterId: userId,
      repositoryId: id
    };
    deleteRepositoryFocusByCondition(params).then(function (res) {
      if (res.code === 0) {
        var index = focusRepositoryList.indexOf(id);

        if (index > -1) {
          focusRepositoryList.splice(index, 1);
        }

        setFocusRepositoryList(_toConsumableArray(focusRepositoryList));
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 18,
      offset: 3
    },
    md: {
      span: 20,
      offset: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], {
    firstText: "\u77E5\u8BC6\u5E93",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(wikiAdd["default"], {
    name: "\u6DFB\u52A0\u77E5\u8BC6\u5E93",
    type: "add",
    selectTabs: selectTabs,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 234,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-tabs-search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-filter",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-tabs",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 29
    }
  }, wiliTab.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-tab ".concat(activeTabs === item.key ? "active-tabs" : ""),
      key: item.key,
      onClick: function onClick() {
        return selectTabs(item.key);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246,
        columnNumber: 48
      }
    }, item.title);
  })), /*#__PURE__*/React__default["default"].createElement(inputSearch["default"], {
    onChange: function onChange(value) {
      return onSearch(value);
    },
    placeholder: "知识库名称",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 29
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "table-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Table__default["default"], {
    columns: columns,
    dataSource: wikilist,
    rowKey: function rowKey(record) {
      return record.id;
    },
    onChange: handleTableChange,
    pagination: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 25
    }
  })))));
};

var wikiList = reactRouterDom.withRouter(mobxReact.inject('wikiStore')(mobxReact.observer(Wikicontent)));

exports["default"] = wikiList;
