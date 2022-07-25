'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
var React = require('react');
var mobxReact = require('mobx-react');
var doublekitSlateUi = require('doublekit-slate-ui');
require('./documentExamine.scss.js');
var share = require('./share.js');
var doublekitCoreUi = require('doublekit-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/common/components/documnetExamine.js";

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

  var userId = doublekitCoreUi.getUser().userId;

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
      setShowComment = _useState8[1];

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
    findCommentPage({
      documentId: documentId
    }).then(function (data) {
      console.log(data);

      if (data.code === 0) {
        setCommonList(data.data);
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
    className: "document-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 21
    }
  }, wiki.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return props.history.push("/index/wikidetail/docEdit/".concat(documentId));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-shou",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 25
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 50
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-zan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 33
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 42
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 37
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
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
      lineNumber: 163,
      columnNumber: 25
    }
  }, " \u5206\u4EAB"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 29
    }
  })))), /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 17
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
      lineNumber: 170,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 29
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-info-creater",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 37
    }
  }, "\u521B\u5EFA\u8005\uFF1A", docInfo ? docInfo.master.name : ""), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-updata-date",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 37
    }
  }, "\u6700\u8FD1\u66F4\u65B0\u65E5\u671F\uFF1A", docInfo ? docInfo.updateTime : "")))), /*#__PURE__*/React__default["default"].createElement(doublekitSlateUi.PreviewEditor, {
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 25
    }
  }))), /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 21
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 44
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 29
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 34
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 25
    }
  }, "(", docInfo.likenumInt || 0, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: function onClick() {
      return setShowComment(!showComment);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202,
      columnNumber: 25
    }
  }, "(", docInfo.commentNumber || 0, "\u6761)"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: showComment ? "show-comment" : "hidden-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 207,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon1_user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
    onChange: function onChange(value) {
      return commonInput(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    type: "primary",
    onClick: function onClick() {
      return announce();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 25
    }
  }, "\u53D1\u5E03")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 25
    }
  }, "\u8BC4\u8BBA(", docInfo.commentNumber || 0, "\u6761)"), commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218,
        columnNumber: 40
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 219,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 220,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 221,
        columnNumber: 45
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 223,
        columnNumber: 41
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 225,
        columnNumber: 37
      }
    }, item.details), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-operate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229,
        columnNumber: 41
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 41
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231,
        columnNumber: 41
      }
    }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 232,
        columnNumber: 41
      }
    }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "edit-comment ".concat(reply === item.id ? "edit-comment-show" : "edit-comment-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 234,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 235,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 236,
        columnNumber: 45
      }
    })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
      placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      onChange: function onChange(value) {
        return commonInput(value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 238,
        columnNumber: 41
      }
    }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
      type: "primary",
      onClick: function onClick() {
        return announceReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 239,
        columnNumber: 41
      }
    }, "\u53D1\u5E03")), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243,
          columnNumber: 52
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 244,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 246,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 248,
          columnNumber: 53
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250,
          columnNumber: 49
        }
      }, children.details), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-operate",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 253,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 254,
          columnNumber: 53
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255,
          columnNumber: 53
        }
      }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return setChildrenReply(children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 256,
          columnNumber: 53
        }
      }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 257,
          columnNumber: 53
        }
      }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "edit-comment ".concat(childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 259,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 260,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 261,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        onChange: function onChange(value) {
          return commonInput(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 263,
          columnNumber: 53
        }
      }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
        type: "primary",
        onClick: function onClick() {
          return announceThirdReply(item.id, children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 264,
          columnNumber: 53
        }
      }, "\u53D1\u5E03")));
    }));
  })))), /*#__PURE__*/React__default["default"].createElement(share["default"], {
    shareVisible: shareVisible,
    setShareVisible: setShareVisible,
    docInfo: docInfo,
    createShare: createShare,
    updateShare: updateShare,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 277,
      columnNumber: 13
    }
  }));
};

var DocumentExamine$1 = mobxReact.inject("wikiCommon", "WikiCatalogueStore")(mobxReact.observer(DocumentExamine));

exports["default"] = DocumentExamine$1;
