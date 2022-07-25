'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
var React = require('react');
var mobxReact = require('mobx-react');
require('./brainMapExamine.scss.js');
var share = require('../../common/components/share.js');
var brainMapFlowRead = require('./brainMapFlowRead.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/modules/wiki/brainMapFlow/components/brainMapFlowExamine.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BrainMapExamine = function BrainMapExamine(props) {
  props.docDetail;
      var docInfo = props.docInfo,
      wikiCommon = props.wikiCommon,
      graphData = props.graphData;
  var documentId = localStorage.getItem("documentId");
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

  React.useEffect(function () {
    findCommentPage({
      documentId: documentId
    }).then(function (data) {
      console.log(data);

      if (data.code === 0) {
        setCommonList(data.data);
      }
    });
  }, [documentId]);

  var _useState5 = React.useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      commontContent = _useState6[0],
      setCommontContent = _useState6[1];

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
        id: JSON.parse(localStorage.getItem("authConfig")).id
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


  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      reply = _useState8[0],
      setReply = _useState8[1];

  var announceReply = function announceReply(id) {
    var data = {
      firstOneCommentId: id,
      parentCommentId: id,
      document: {
        id: documentId
      },
      details: commontContent,
      user: {
        id: JSON.parse(localStorage.getItem("authConfig")).id
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

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      childrenReply = _useState10[0],
      setChildrenReply = _useState10[1];

  var announceThirdReply = function announceThirdReply(firstOneCommentId, parentCommentId) {
    var data = {
      firstOneCommentId: firstOneCommentId,
      parentCommentId: parentCommentId,
      document: {
        id: documentId
      },
      details: commontContent,
      user: {
        id: JSON.parse(localStorage.getItem("authConfig")).id
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
        id: JSON.parse(localStorage.getItem("authConfig")).id
      },
      likeType: "doc"
    };
    createLike(data);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-examine",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 17
    }
  }, docInfo.name, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "examine-type",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 62
    }
  }, "\u7C7B\u578B\uFF1A\u8111\u56FE")), /*#__PURE__*/React__default["default"].createElement(brainMapFlowRead["default"], {
    graphData: graphData,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 17
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "examine-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: addDocLike,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 21
    }
  }, docInfo.isLike ? /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 43
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icondianzan-copy",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 29
    }
  })) : /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-dianzan",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 25
    }
  }, "(", docInfo.likenumInt || 0, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 29
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "number",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 25
    }
  }, "(", docInfo.commentNumber || 0, "\u6761)")), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "comment-item",
    onClick: function onClick() {
      return setShareVisible(true);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-share",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 29
    }
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "edit-comment",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "user-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-user5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
    onChange: function onChange(value) {
      return commonInput(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    type: "primary",
    onClick: function onClick() {
      return announce();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 21
    }
  }, "\u53D1\u5E03")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "comment-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 21
    }
  }, "\u8BC4\u8BBA(", docInfo.commentNumber || 0, "\u6761)"), commonList && commonList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-item",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 36
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-user",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 41
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "user-name",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 37
      }
    }, item.user.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-content",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 33
      }
    }, item.details), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "comment-operate",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 155,
        columnNumber: 37
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 37
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 37
      }
    }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158,
        columnNumber: 37
      }
    }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "edit-comment ".concat(reply === item.id ? "edit-comment-show" : "edit-comment-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "user-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-user5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 41
      }
    })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
      placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      onChange: function onChange(value) {
        return commonInput(value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 37
      }
    }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
      type: "primary",
      onClick: function onClick() {
        return announceReply(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 37
      }
    }, "\u53D1\u5E03")), item.commentList && item.commentList.map(function (children) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-item commnet-children-item",
        key: children.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169,
          columnNumber: 52
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-user",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "user-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174,
          columnNumber: 53
        }
      }, children.user.name, "\u56DE\u590D\u4E86\uFF1A", children.aimAtUser.name)), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176,
          columnNumber: 49
        }
      }, children.details), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "comment-operate",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180,
          columnNumber: 53
        }
      }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181,
          columnNumber: 53
        }
      }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement("span", {
        onClick: function onClick() {
          return setChildrenReply(children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182,
          columnNumber: 53
        }
      }, "\u56DE\u590D"), /*#__PURE__*/React__default["default"].createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 53
        }
      }, "\u8D5E")), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "edit-comment ".concat(childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 49
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "user-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186,
          columnNumber: 53
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-user5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187,
          columnNumber: 57
        }
      })), /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
        placeholder: "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
        onChange: function onChange(value) {
          return commonInput(value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189,
          columnNumber: 53
        }
      }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
        type: "primary",
        onClick: function onClick() {
          return announceThirdReply(item.id, children.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 53
        }
      }, "\u53D1\u5E03")));
    }));
  }))), /*#__PURE__*/React__default["default"].createElement(share["default"], {
    shareVisible: shareVisible,
    setShareVisible: setShareVisible,
    docInfo: docInfo,
    createShare: createShare,
    updateShare: updateShare,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 13
    }
  }));
};

var BrainMapFlowExamine = mobxReact.inject("wikiCommon")(mobxReact.observer(BrainMapExamine));

exports["default"] = BrainMapFlowExamine;
