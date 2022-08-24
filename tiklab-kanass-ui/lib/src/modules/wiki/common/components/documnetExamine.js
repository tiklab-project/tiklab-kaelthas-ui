'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
var React = require('react');
var mobxReact = require('mobx-react');
var tiklabSlateUi = require('tiklab-slate-ui');
require('./documentExamine.scss.js');
var share = require('./share.js');
var tiklabCoreUi = require('tiklab-core-ui');
var moment = require('moment');
require('mobx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/documnetExamine.js";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DocumentExamine = function DocumentExamine(props) {
  var wikiCommon = props.wikiCommon,
      WikiCatalogueStore = props.WikiCatalogueStore;
  var documentId = localStorage.getItem("documentId");
  WikiCatalogueStore.docDetail;
      WikiCatalogueStore.setDocDetail;
      WikiCatalogueStore.updateDocument;
      var findDocument = WikiCatalogueStore.findDocument;
  var createComment = wikiCommon.createComment,
      findCommentPage = wikiCommon.findCommentPage,
      createLike = wikiCommon.createLike,
      createShare = wikiCommon.createShare,
      updateShare = wikiCommon.updateShare;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      shareVisible = _useState2[0],
      setShareVisible = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      commonList = _useState4[0],
      setCommonList = _useState4[1];

  var userId = tiklabCoreUi.getUser().userId;

  var _useState5 = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: "",
    master: {
      name: ""
    }
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      docInfo = _useState6[0],
      setDocInfo = _useState6[1];

  var wiki = JSON.parse(localStorage.getItem("wiki"));

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showComment = _useState8[0],
      setShowComment = _useState8[1]; // const [currentPage, setCurrentPage] = useState(1)


  var currentPage = 1;

  var _useState9 = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState10 = _slicedToArray(_useState9, 2),
      value = _useState10[0],
      setValue = _useState10[1];

  React.useEffect(function () {
    var value = {
      documentId: documentId,
      pageParam: {
        pageSize: 1,
        currentPage: currentPage
      }
    };
    findCommentPage(value).then(function (data) {
      if (data.code === 0) {
        setCommonList(data.data.dataList);
      }
    });
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          // setWorkData(JSON.parse(data.data.details),findWorkItem)
          setValue(JSON.parse(data.data.details)); // setWorkData(JSON.parse(data.data.details),findWorkItem)
        } else {
          setValue([{
            type: "paragraph",
            children: [{
              text: ""
            }]
          }]);
        }

        setDocInfo(data.data);
      }
    });
  }, [documentId]);

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      commontContent = _useState12[0],
      setCommontContent = _useState12[1];

  var commonInput = function commonInput(value) {
    setCommontContent(value.target.value);
  };

  var announce = function announce() {
    var value = {
      document: {
        id: documentId
      },
      details: commontContent,
      user: {
        id: userId
      }
    };
    createComment(value).then(function (data) {
      var newCommon = _objectSpread(_objectSpread({}, value), {}, {
        createTime: moment__default["default"](new Date()).format('YYYY-MM-DD HH:mm:ss'),
        id: data,
        user: {
          name: tiklabCoreUi.getUser().name
        }
      });

      commonList.unshift(newCommon);
      setCommonList(_toConsumableArray(commonList)); // findCommentPage({ documentId: documentId }).then(data => {
      //     console.log(data)
      //     if (data.code === 0) {
      //         setCommonList(data.data)
      //         setCommontContent("")
      //     }
      // })
    });
  }; //回复评论


  var _useState13 = React.useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      reply = _useState14[0],
      setReply = _useState14[1];

  var announceReply = function announceReply(id) {
    var value = {
      firstOneCommentId: id,
      parentCommentId: id,
      document: {
        id: documentId
      },
      details: commontContent,
      user: {
        id: userId
      }
    };
    createComment(value).then(function (data) {
      // findCommentPage({ documentId: documentId }).then(data => {
      //     console.log(data)
      //     if (data.code === 0) {
      //         setReply(null)
      //         setCommonList(data.data)
      //         setCommontContent("")
      //     }
      // })
      var list = commonList.unshift(value);
      setCommonList(list);
    });
  };

  var _useState15 = React.useState(),
      _useState16 = _slicedToArray(_useState15, 2),
      childrenReply = _useState16[0],
      setChildrenReply = _useState16[1];

  var announceThirdReply = function announceThirdReply(firstOneCommentId, parentCommentId) {
    var data = {
      firstOneCommentId: firstOneCommentId,
      parentCommentId: parentCommentId,
      document: {
        id: documentId
      },
      details: commontContent,
      user: {
        id: userId
      }
    };
    createComment(data).then(function (data) {
      findCommentPage({
        documentId: documentId
      }).then(function (data) {
        console.log(data);

        if (data.code === 0) {
          setChildrenReply(null);
          setCommonList(data.data);
        }
      });
    });
  }; // 点赞


  var addDocLike = function addDocLike() {
    var data = {
      toWhomId: documentId,
      likeUser: {
        id: userId
      },
      likeType: "doc"
    };
    createLike(data);
  };

  var nextPageCommon = function nextPageCommon() {
    var data = {
      documentId: documentId,
      pageParam: {
        pageSize: 1,
        currentPage: ++currentPage
      }
    };
    findCommentPage(data).then(function (data) {
      if (data.code === 0) {
        var list = commonList.concat(data.data.dataList);
        setCommonList(list);
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 17
    }
  }, wiki.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return props.history.push("/index/wikidetail/docEdit/".concat(documentId));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-shou",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 21
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 46
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-zan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 33
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 38
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 33
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    shape: "round",
    style: {
      backgroundColor: "#5d70ea",
      color: "#fff"
    },
    onClick: function onClick() {
      return setShareVisible(true);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 21
    }
  }, " \u5206\u4EAB"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 25
    }
  })))), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "document-examine-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 16,
      offset: 4
    },
    lg: {
      span: 20,
      offset: 2
    },
    md: {
      span: 20,
      offset: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 207,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 29
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 29
    }
  }, docInfo.updateTime)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 217,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-creater",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218,
      columnNumber: 33
    }
  }, "\u521B\u5EFA\u8005\uFF1A", docInfo ? docInfo.master.name : ""), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-updata-date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 33
    }
  }, "\u6700\u8FD1\u66F4\u65B0\u65E5\u671F\uFF1A", docInfo ? docInfo.updateTime : "")))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-previeweditor",
    style: {
      border: "1px solid #E5E8FF"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.PreviewEditor, {
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 25
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 47
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 33
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 38
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 29
    }
  }, "(", docInfo.likenumInt || 0, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: function onClick() {
      return setShowComment(!showComment);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 33
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 29
    }
  }, "(", docInfo.commentNumber || 0, "\u6761)"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "show-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
    value: commontContent,
    onChange: function onChange(value) {
      return commonInput(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 33
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    type: "primary",
    onClick: function onClick() {
      return announce();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 33
    }
  }, "\u53D1\u5E03")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 29
    }
  }, "\u8BC4\u8BBA(", docInfo.commentNumber || 0, "\u6761)"), commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 258,
        columnNumber: 44
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 259,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 260,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 261,
        columnNumber: 49
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 263,
        columnNumber: 45
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 265,
        columnNumber: 41
      }
    }, item.details), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-operate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 268,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 269,
        columnNumber: 45
      }
    }, item.createTime), /*#__PURE__*/React__default["default"].createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 272,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 273,
        columnNumber: 49
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 274,
        columnNumber: 49
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 275,
        columnNumber: 49
      }
    }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 276,
        columnNumber: 49
      }
    }, "\u8D5E"))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "edit-comment ".concat(reply === item.id ? "edit-comment-show" : "edit-comment-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 281,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 282,
        columnNumber: 49
      }
    })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
      placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      value: commontContent,
      onChange: function onChange(value) {
        return commonInput(value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 284,
        columnNumber: 45
      }
    }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
      type: "primary",
      onClick: function onClick() {
        return announceReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 285,
        columnNumber: 45
      }
    }, "\u53D1\u5E03")), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 289,
          columnNumber: 56
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 290,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 291,
          columnNumber: 57
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 292,
          columnNumber: 61
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 294,
          columnNumber: 57
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 296,
          columnNumber: 53
        }
      }, children.details), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-operate",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 299,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 300,
          columnNumber: 57
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 301,
          columnNumber: 57
        }
      }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return setChildrenReply(children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 302,
          columnNumber: 57
        }
      }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 303,
          columnNumber: 57
        }
      }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "edit-comment ".concat(childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 305,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 306,
          columnNumber: 57
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 307,
          columnNumber: 61
        }
      })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        onChange: function onChange(value) {
          return commonInput(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 309,
          columnNumber: 57
        }
      }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
        type: "primary",
        onClick: function onClick() {
          return announceThirdReply(item.id, children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 310,
          columnNumber: 57
        }
      }, "\u53D1\u5E03")));
    }));
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-more-botton",
    onClick: function onClick() {
      return nextPageCommon();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 320,
      columnNumber: 29
    }
  }, "\u67E5\u770B\u66F4\u591A..."))))), /*#__PURE__*/React__default["default"].createElement(share["default"], {
    shareVisible: shareVisible,
    setShareVisible: setShareVisible,
    docInfo: docInfo,
    createShare: createShare,
    updateShare: updateShare,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 13
    }
  }));
};

var DocumentExamine$1 = mobxReact.inject("wikiCommon", "WikiCatalogueStore")(mobxReact.observer(DocumentExamine));

exports["default"] = DocumentExamine$1;
