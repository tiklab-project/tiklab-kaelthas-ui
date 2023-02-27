'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
var React = require('react');
var mobxReact = require('mobx-react');
var tiklabSlateUi = require('tiklab-slate-ui');
require('./shareDocument.scss.js');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/share/components/shareDocument.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ShareDocument = function ShareDocument(props) {
  var shareStore = props.shareStore;
  var documentView = shareStore.documentView,
      commentView = shareStore.commentView,
      judgeAuthCode = shareStore.judgeAuthCode;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var setShareVisible = _useState2[1];

  var _useState3 = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = React.useState({
    name: "",
    likenumInt: "",
    commentNumber: ""
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      docInfo = _useState6[0],
      setDocInfo = _useState6[1];

  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      commonList = _useState8[0],
      setCommonList = _useState8[1];

  React.useEffect(function () {
    judgeAuthCode({
      shareLink: "".concat(props.match.params.shareId).concat(props.location.search)
    }).then(function (data) {
      if (data.data === "true") {
        if (!props.location.state) {
          window.location.href = "http://192.168.2.3:3001/#/passWord/".concat(props.match.params.id, "/").concat(props.match.params.shareId).concat(props.location.search);
        } else {
          commentView({
            documentId: props.match.params.id
          }).then(function (data) {
            console.log(data);

            if (data.code === 0) {
              setCommonList(data.data);
            }
          });
          documentView({
            documentId: props.match.params.id
          }).then(function (data) {
            if (data.code === 0) {
              if (data.data.details) {
                setValue(JSON.parse(data.data.details));
                console.log();
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
        }
      }

      if (data.data === "false") {
        commentView({
          documentId: props.match.params.id
        }).then(function (data) {
          console.log(data);

          if (data.code === 0) {
            setCommonList(data.data);
          }
        });
        documentView({
          documentId: props.match.params.id
        }).then(function (data) {
          if (data.code === 0) {
            if (data.data.details) {
              setValue(JSON.parse(data.data.details));
              console.log();
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
      }
    });
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    className: "wikidetail-content-col",
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 20,
      offset: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    style: {
      marginTop: "20px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 17
    }
  }, docInfo.name, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "examine-type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 90
    }
  }, "\u7C7B\u578B\uFF1A", docInfo.type === "doc" ? "文档" : "目录")), /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.PreviewEditor, {
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 25
    }
  }, "(", docInfo.likenumInt, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comments",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 25
    }
  }, "(", docInfo.commentNumber, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: function onClick() {
      return setShareVisible(true);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-share",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 25
    }
  }, "(100\u6761)"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 21
    }
  }, "\u8BC4\u8BBA(", docInfo.commentNumber, "\u6761)"), commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 36
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 41
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 139,
        columnNumber: 37
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 33
      }
    }, item.details), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 52
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164,
          columnNumber: 53
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166,
          columnNumber: 49
        }
      }, children.details));
    }));
  }))))));
};

var shareDocument = mobxReact.inject("shareStore")(mobxReact.observer(reactRouter.withRouter(ShareDocument)));

exports["default"] = shareDocument;
