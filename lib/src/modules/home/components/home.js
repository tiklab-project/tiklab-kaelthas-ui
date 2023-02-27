'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/empty/style/css');
var _Empty = require('antd/es/empty');
require('antd/es/tabs/style/css');
var _Tabs = require('antd/es/tabs');
var React = require('react');
require('./home.scss.js');
var mobxReact = require('mobx-react');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Empty__default = /*#__PURE__*/_interopDefaultLegacy(_Empty);
var _Tabs__default = /*#__PURE__*/_interopDefaultLegacy(_Tabs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/home.js";

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
_Tabs__default["default"].TabPane;

var Home = function Home(props) {
  var homeStore = props.homeStore;
  homeStore.findDocumentList;
      var findDocumentRecentList = homeStore.findDocumentRecentList,
      opLogList = homeStore.opLogList,
      findLogpage = homeStore.findLogpage,
      findRecentRepositoryList = homeStore.findRecentRepositoryList;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      recentViewDocumentList = _useState4[0],
      setRecentViewDocumentList = _useState4[1];

  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      recentWikiDocumentList = _useState6[0],
      setRecentWikiDocumentList = _useState6[1];

  var userId = tiklabCoreUi.getUser().id;
  React.useEffect(function () {
    findLogpage({
      userId: userId
    }); // const params = {
    //     orderParams: [{
    //         name: "updateTime",
    //         orderType: "asc"
    //     }]
    // }
    // findDocumentList(params).then(res => {
    //     console.log(res)
    //     if (res.code === 0) {
    //         setRecentEditDocumentList([...res.data])
    //     }
    // })

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
    findRecentRepositoryList({
      model: "wiki"
    }).then(function (res) {
      if (res.code === 0) {
        setRecentWikiDocumentList(res.data);
      }
    });
  }, []);

  var goWikiDetail = function goWikiDetail(wiki) {
    // localStorage.setItem("wiki", JSON.stringify(wiki.repository))
    props.history.push("/index/wikidetail/".concat(wiki.id, "/survey"));
  };

  var goDocumentDetail = function goDocumentDetail(item) {
    // localStorage.setItem("wiki", JSON.stringify(item.repository))
    if (item.model === "document") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/".concat(item.repository.id, "/doc/").concat(item.modelId));
    }

    if (item.model === "mindMap") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/".concat(item.repository.id, "/mindmap/").concat(item.modelId));
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "home-row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
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
    className: "home-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-repository",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "repository-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 29
    }
  }, "\u6700\u8FD1\u8BBF\u95EE\u77E5\u8BC6\u5E93"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "repository-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 29
    }
  }, recentWikiDocumentList && recentWikiDocumentList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "repository-item",
      key: item.id,
      onClick: function onClick() {
        return goWikiDetail(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "item-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 49
      }
    }, item.iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
      src: '/images/' + item.iconUrl,
      alt: "",
      className: "img-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88,
        columnNumber: 61
      }
    }) : /*#__PURE__*/React__default["default"].createElement("img", {
      src: 'images/repository1.png',
      alt: "",
      className: "img-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 61
      }
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 53
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "item-work",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "process-work",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 53
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        color: "#999"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 83
      }
    }, "\u6587\u6863"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 124
      }
    }, item.documentNum, "\u7BC7")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "end-work",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 53
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        color: "#999"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 79
      }
    }, "\u76EE\u5F55"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 120
      }
    }, item.categoryNum, "\u4E2A")))));
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-box-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 33
    }
  }, "\u6700\u8FD1\u67E5\u770B\u7684\u6587\u6863")), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
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
        lineNumber: 122,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-name",
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "document-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 49
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 45
      }
    }, item.repository.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 45
      }
    }, item.master.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 45
      }
    }, item.recentTime));
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-dynamic",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-box-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 33
    }
  }, "\u76F8\u5173\u52A8\u6001"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "more",
    onClick: function onClick() {
      props.history.push("/index/dynamic");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-rightjump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 41
    }
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 29
    }
  }, opLogList.length > 0 ? opLogList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.data
      },
      className: "dynamic-item",
      key: item.id,
      onClick: function onClick() {
        return goOpLogDetail(item.link);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 48
      }
    });
  }) : /*#__PURE__*/React__default["default"].createElement(_Empty__default["default"], {
    image: "/images/nodata.png",
    description: "\u6682\u65F6\u6CA1\u6709\u52A8\u6001~",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 41
    }
  })))))));
};

var home = mobxReact.inject("homeStore")(mobxReact.observer(Home));

exports["default"] = home;
