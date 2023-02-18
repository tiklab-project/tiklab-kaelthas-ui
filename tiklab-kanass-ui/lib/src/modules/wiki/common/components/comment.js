'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/empty/style/css');
var _Empty = require('antd/es/empty');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var mobxReact = require('mobx-react');
var button = require('../../../../common/button/button.js');
require('./comment.scss.js');
var tiklabCoreUi = require('tiklab-core-ui');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Empty__default = /*#__PURE__*/_interopDefaultLegacy(_Empty);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/comment.js";

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

var Comment = function Comment(props) {
  var wikiCommon = props.wikiCommon,
      documentId = props.documentId,
      setShowComment = props.setShowComment;
  var createComment = wikiCommon.createComment,
      findCommentPage = wikiCommon.findCommentPage;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      commontContent = _useState2[0],
      setCommontContent = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      commonList = _useState4[0],
      setCommonList = _useState4[1];

  var userId = tiklabCoreUi.getUser().userId;

  var _useState5 = React.useState(1),
      _useState6 = _slicedToArray(_useState5, 2),
      currentPage = _useState6[0],
      setCurrentPage = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      totalPage = _useState8[0],
      setTotalPage = _useState8[1];

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
        console.log(data);
        setCommonList(data.data.dataList);
        setTotalPage(data.data.totalPage);
      }
    });
  }, [documentId]);

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
      setCommonList(_toConsumableArray(commonList));
      setCommontContent(null);
      console.log(commonList); // findCommentPage({ documentId: documentId }).then(data => {
      //     console.log(data)
      //     if (data.code === 0) {
      //         setCommonList(data.data)
      //         setCommontContent("")
      //     }
      // })
    });
  }; //回复评论


  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      reply = _useState10[0],
      setReply = _useState10[1];

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
      var list = commonList.unshift(value);
      setCommonList(list);
    });
  };

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      childrenReply = _useState12[0],
      setChildrenReply = _useState12[1];

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
  };

  var nextPageCommon = function nextPageCommon() {
    var page = currentPage + 1;
    setCurrentPage(page);
    var data = {
      documentId: documentId,
      pageParam: {
        pageSize: 1,
        currentPage: page
      }
    };
    findCommentPage(data).then(function (data) {
      if (data.code === 0) {
        var list = commonList.concat(data.data.dataList);
        setCommonList(list);
        setTotalPage(data.data.totalPage);
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 17
    }
  }, "\u8BC4\u8BBA"), /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg-icon",
    "aria-hidden": "true",
    onClick: function onClick() {
      return setShowComment(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-close",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 21
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
    value: commontContent,
    onChange: function onChange(value) {
      return commonInput(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: function onClick() {
      return announce();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 21
    }
  }, "\u53D1\u5E03")), commonList && commonList.length > 0 ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 40
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 150,
        columnNumber: 45
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 41
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 37
      }
    }, item.details), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-operate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 41
      }
    }, item.createTime), /*#__PURE__*/React__default["default"].createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 45
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 163,
        columnNumber: 45
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 45
      }
    }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 45
      }
    }, "\u8D5E"))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "edit-comment ".concat(reply === item.id ? "edit-comment-show" : "edit-comment-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 45
      }
    })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
      placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      value: commontContent,
      onChange: function onChange(value) {
        return commonInput(value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 173,
        columnNumber: 41
      }
    }), /*#__PURE__*/React__default["default"].createElement(button["default"], {
      type: "primary",
      onClick: function onClick() {
        return announceReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 41
      }
    }, "\u53D1\u5E03")), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178,
          columnNumber: 52
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 53
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 49
        }
      }, children.details), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-operate",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189,
          columnNumber: 53
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 53
        }
      }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return setChildrenReply(children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 53
        }
      }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 53
        }
      }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "edit-comment ".concat(childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        onChange: function onChange(value) {
          return commonInput(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198,
          columnNumber: 53
        }
      }), /*#__PURE__*/React__default["default"].createElement(button["default"], {
        type: "primary",
        onClick: function onClick() {
          return announceThirdReply(item.id, children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 53
        }
      }, "\u53D1\u5E03")));
    }));
  }), totalPage > 1 && currentPage < totalPage && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-more-botton",
    onClick: function onClick() {
      return nextPageCommon();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 73
    }
  }, "\u67E5\u770B\u66F4\u591A...")) : /*#__PURE__*/React__default["default"].createElement(_Empty__default["default"], {
    image: "/images/nodata.png",
    description: "\u6682\u65F6\u6CA1\u6709\u8BC4\u4EF7~",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 21
    }
  })));
};

var Comment$1 = mobxReact.inject("wikiCommon")(mobxReact.observer(Comment));

exports["default"] = Comment$1;
