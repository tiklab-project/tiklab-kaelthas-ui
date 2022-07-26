'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/tabs/style/css');
var _Tabs = require('antd/es/tabs');
var React = require('react');
require('./home.scss.js');
var mobxReact = require('mobx-react');
var doublekitCoreUi = require('doublekit-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Tabs__default = /*#__PURE__*/_interopDefaultLegacy(_Tabs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/home/components/home.js";

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
var TabPane = _Tabs__default["default"].TabPane;

var Home = function Home(props) {
  var homeStore = props.homeStore;
  var findDocumentList = homeStore.findDocumentList,
      findDocumentRecentList = homeStore.findDocumentRecentList;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      recentEditDocumentList = _useState2[0],
      setRecentEditDocumentList = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      recentViewDocumentList = _useState4[0],
      setRecentViewDocumentList = _useState4[1];

  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      recentWikiDocumentList = _useState6[0],
      setRecentWikiDocumentList = _useState6[1];

  var userId = doublekitCoreUi.getUser().id;
  React.useEffect(function () {
    var params = {
      orderParams: [{
        name: "updateTime",
        orderType: "asc"
      }]
    };
    findDocumentList(params).then(function (res) {
      console.log(res);

      if (res.code === 0) {
        setRecentEditDocumentList(_toConsumableArray(res.data));
      }
    });
    var recentParams = {
      masterId: userId,
      models: ["document", "mindMap"],
      orderParams: [{
        name: "recentTime",
        orderType: "asc"
      }]
    };
    findDocumentRecentList(recentParams).then(function (res) {
      console.log(res);

      if (res.code === 0) {
        setRecentViewDocumentList(_toConsumableArray(res.data));
      }
    });
    var wikiParams = {
      masterId: userId,
      model: "wiki",
      orderParams: [{
        name: "recentTime",
        orderType: "asc"
      }]
    };
    findDocumentRecentList(wikiParams).then(function (res) {
      console.log(res);

      if (res.code === 0) {
        setRecentWikiDocumentList(_toConsumableArray(res.data));
      }
    });
  }, []);

  var goWikiDetail = function goWikiDetail(wiki) {
    localStorage.setItem("wiki", JSON.stringify(wiki.repository));
    props.history.push("/index/wikidetail");
  };

  var goDocumentDetail = function goDocumentDetail(item) {
    localStorage.setItem("wiki", JSON.stringify(item.repository));

    if (item.model === "document") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/doc/".concat(item.modelId));
    }

    if (item.model === "mindMap") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/mindmap/".concat(item.modelId));
    }
  };

  var goEditDetail = function goEditDetail(item) {
    localStorage.setItem("wiki", JSON.stringify(item.repository));

    if (item.typeId === "document") {
      localStorage.setItem("documentId", item.id);
      props.history.push("/index/wikidetail/doc/".concat(item.id));
    }

    if (item.typeId === "mindMap") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/mindmap/".concat(item.id));
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-repository",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "repository-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }, "\u6700\u8FD1\u8BBF\u95EE\u77E5\u8BC6\u5E93"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "repository-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 21
    }
  }, recentWikiDocumentList && recentWikiDocumentList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 40
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "repository-item",
      key: item.id,
      onClick: function onClick() {
        return goWikiDetail(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 45
      }
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "title",
      key: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
        columnNumber: 41
      }
    }, item.name)));
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Tabs__default["default"], {
    defaultActiveKey: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(TabPane, {
    tab: "\u6700\u8FD1\u67E5\u770B\u6587\u6863",
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 29
    }
  }, recentViewDocumentList && recentViewDocumentList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-list-item",
      key: item.id,
      onClick: function onClick() {
        return goDocumentDetail(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-name",
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "document-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 49
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 45
      }
    }, item.repository.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 45
      }
    }, item.master.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 45
      }
    }, item.updateTime), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-point",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133,
        columnNumber: 53
      }
    }))));
  }))), /*#__PURE__*/React__default["default"].createElement(TabPane, {
    tab: "\u6700\u8FD1\u4FEE\u6539\u6587\u6863",
    key: "2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 29
    }
  }, recentEditDocumentList && recentEditDocumentList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-list-item",
      key: item.id,
      onClick: function onClick() {
        return goEditDetail(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-name",
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "document-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 49
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 45
      }
    }, item.repository.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 45
      }
    }, item.master.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 45
      }
    }, item.updateTime), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-point",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 53
      }
    }))));
  })))))));
};

var home = mobxReact.inject("homeStore")(mobxReact.observer(Home));

exports["default"] = home;
