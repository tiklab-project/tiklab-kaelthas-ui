'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
var React = require('react');
var mobxReact = require('mobx-react');
var tiklabSlateUi = require('tiklab-slate-ui');
require('./documentExamine.scss.js');
var share = require('./share.js');
var tiklabCoreUi = require('tiklab-core-ui');
var comment = require('./comment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/documnetExamine.js";

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
  var findDocument = WikiCatalogueStore.findDocument;
  wikiCommon.createComment;
      wikiCommon.findCommentPage;
      var createLike = wikiCommon.createLike,
      createShare = wikiCommon.createShare,
      updateShare = wikiCommon.updateShare;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      shareVisible = _useState2[0],
      setShareVisible = _useState2[1];

  var userId = tiklabCoreUi.getUser().userId;

  var _useState3 = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: "",
    master: {
      name: ""
    }
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      docInfo = _useState4[0],
      setDocInfo = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showComment = _useState6[0],
      setShowComment = _useState6[1];

  var wikiId = props.match.params.wikiId;

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      like = _useState8[0],
      setLike = _useState8[1];

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
    // const value = {
    //     documentId: documentId,
    //     pageParam: {
    //         pageSize: 1,
    //         currentPage: currentPage,
    //     }
    // }
    // findCommentPage(value).then(data => {
    //     if (data.code === 0) {
    //         console.log(data)
    //         setCommonList(data.data.dataList)
    //     }
    // })
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
        setLike(data.data.like);
      }
    });
  }, [documentId]); // 点赞

  var addDocLike = function addDocLike() {
    var data = {
      toWhomId: documentId,
      likeUser: {
        id: userId
      },
      likeType: "doc"
    };
    createLike(data).then(function (res) {
      if (res.code === 0) {
        setLike(true);
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 17
    }
  }, docInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return props.history.push("/index/wikidetail/".concat(wikiId, "/docEdit/").concat(documentId));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-edit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-shou",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return setShowComment(!showComment);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 29
    }
  })), docInfo.commentNumber), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 21
    }
  }, like ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 36
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-zan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 33
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 38
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 33
    }
  })), docInfo.likenumInt), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "inline",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
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
      lineNumber: 122,
      columnNumber: 21
    }
  }, " \u5206\u4EAB"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "right-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-point",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 25
    }
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-examine-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    className: "document-examine-row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 17
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
      lineNumber: 130,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-previeweditor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.PreviewEditor, {
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 29
    }
  })))), showComment && /*#__PURE__*/React__default["default"].createElement(comment["default"], {
    documentId: documentId,
    setShowComment: setShowComment,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 36
    }
  })), /*#__PURE__*/React__default["default"].createElement(share["default"], {
    shareVisible: shareVisible,
    setShareVisible: setShareVisible,
    docInfo: docInfo,
    createShare: createShare,
    updateShare: updateShare,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }));
};

var DocumentExamine$1 = mobxReact.inject("wikiCommon", "WikiCatalogueStore")(mobxReact.observer(DocumentExamine));

exports["default"] = DocumentExamine$1;
