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
require('./brainMapFlowExamine.scss.js');
var share = require('../../common/components/share.js');
var brainMapFlowRead = require('./brainMapFlowRead.js');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMapFlow/components/brainMapFlowExamine.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BrainMapExamine = function BrainMapExamine(props) {
  var wikiCommon = props.wikiCommon,
      WikiCatalogueStore = props.WikiCatalogueStore;
  var documentId = localStorage.getItem("documentId");
  var createComment = wikiCommon.createComment,
      findCommentPage = wikiCommon.findCommentPage,
      createLike = wikiCommon.createLike,
      createShare = wikiCommon.createShare,
      updateShare = wikiCommon.updateShare;
  WikiCatalogueStore.docDetail;
      var findDocument = WikiCatalogueStore.findDocument;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      shareVisible = _useState2[0],
      setShareVisible = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      commonList = _useState4[0],
      setCommonList = _useState4[1];

  var wiki = JSON.parse(localStorage.getItem("wiki"));

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

  var userId = tiklabCoreUi.getUser().userId;

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showComment = _useState8[0],
      setShowComment = _useState8[1];

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      graphData = _useState10[0],
      setGraphData = _useState10[1];

  React.useEffect(function () {
    findCommentPage({
      documentId: documentId
    }).then(function (data) {
      if (data.code === 0) {
        setCommonList(data.data.dataList);
      }
    });
    findDocument(documentId).then(function (data) {
      if (data.code === 0) {
        if (data.data.details) {
          setGraphData(_objectSpread({}, JSON.parse(data.data.details)));
        } else {
          setGraphData({
            nodes: [],
            edges: []
          });
        }

        setDocInfo(data.data);
      }
    });
    return;
  }, [documentId]);

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      commontContent = _useState12[0],
      setCommontContent = _useState12[1];

  var commonInput = function commonInput(value) {
    setCommontContent(value.target.value);
  };

  var announce = function announce() {
    var data = {
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
          setCommonList(data.data);
        }
      });
    });
  }; //回复评论


  var _useState13 = React.useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      reply = _useState14[0],
      setReply = _useState14[1];

  var announceReply = function announceReply(id) {
    var data = {
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
    createComment(data).then(function (data) {
      findCommentPage({
        documentId: documentId
      }).then(function (data) {
        console.log(data);

        if (data.code === 0) {
          setReply(null);
          setCommonList(data.data);
        }
      });
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

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 21
    }
  }, wiki.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return props.history.push("/index/wikidetail/mindmapEdit/".concat(documentId));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-shou",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 25
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 50
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-zan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 37
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 42
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 37
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 25
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
      lineNumber: 150,
      columnNumber: 25
    }
  }, " \u5206\u4EAB"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 29
    }
  })))), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 20,
      offset: 2
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
      lineNumber: 157,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-info-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 29
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-info-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-info-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-info-creater",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 37
    }
  }, "\u521B\u5EFA\u8005\uFF1A", docInfo ? docInfo.master.name : ""), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mindmap-updata-date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 37
    }
  }, "\u6700\u8FD1\u66F4\u65B0\u65E5\u671F\uFF1A", docInfo ? docInfo.updateTime : "")))), /*#__PURE__*/React__default["default"].createElement(brainMapFlowRead["default"], {
    graphData: graphData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 29
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 51
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 37
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 42
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 33
    }
  }, "(", docInfo.likenumInt || 0, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: function onClick() {
      return setShowComment(!showComment);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 33
    }
  }, "(", docInfo.commentNumber || 0, "\u6761)"))), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 41
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
    onChange: function onChange(value) {
      return commonInput(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 37
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    type: "primary",
    onClick: function onClick() {
      return announce();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 37
    }
  }, "\u53D1\u5E03")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 33
    }
  }, "\u8BC4\u8BBA(", docInfo.commentNumber || 0, "\u6761)"), commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 202,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 203,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 49
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 209,
        columnNumber: 45
      }
    }, item.details), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-operate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 212,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213,
        columnNumber: 49
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 214,
        columnNumber: 49
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 215,
        columnNumber: 49
      }
    }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 216,
        columnNumber: 49
      }
    }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "edit-comment ".concat(reply === item.id ? "edit-comment-show" : "edit-comment-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 220,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
      placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      onChange: function onChange(value) {
        return commonInput(value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 49
      }
    }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
      type: "primary",
      onClick: function onClick() {
        return announceReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 223,
        columnNumber: 49
      }
    }, "\u53D1\u5E03")), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227,
          columnNumber: 60
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 57
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 61
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230,
          columnNumber: 65
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232,
          columnNumber: 61
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234,
          columnNumber: 57
        }
      }, children.details), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-operate",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237,
          columnNumber: 57
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 238,
          columnNumber: 61
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 239,
          columnNumber: 61
        }
      }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return setChildrenReply(children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240,
          columnNumber: 61
        }
      }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241,
          columnNumber: 61
        }
      }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "edit-comment ".concat(childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243,
          columnNumber: 57
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 244,
          columnNumber: 61
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245,
          columnNumber: 65
        }
      })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        onChange: function onChange(value) {
          return commonInput(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 247,
          columnNumber: 61
        }
      }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
        type: "primary",
        onClick: function onClick() {
          return announceThirdReply(item.id, children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 248,
          columnNumber: 61
        }
      }, "\u53D1\u5E03")));
    }));
  })))))), /*#__PURE__*/React__default["default"].createElement(share["default"], {
    shareVisible: shareVisible,
    setShareVisible: setShareVisible,
    docInfo: docInfo,
    createShare: createShare,
    updateShare: updateShare,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 264,
      columnNumber: 13
    }
  }));
};

var BrainMapFlowExamine = mobxReact.inject("wikiCommon", "WikiCatalogueStore")(mobxReact.observer(BrainMapExamine));

exports["default"] = BrainMapFlowExamine;
