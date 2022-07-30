'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/radio/style/css');
var _Radio = require('antd/es/radio');
var React = require('react');
require('./share.scss.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Radio__default = /*#__PURE__*/_interopDefaultLegacy(_Radio);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/share.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Share = function Share(props) {
  var shareVisible = props.shareVisible,
      setShareVisible = props.setShareVisible,
      docInfo = props.docInfo,
      createShare = props.createShare,
      updateShare = props.updateShare;
  var documentId = localStorage.getItem("documentId");

  var _React$useState = React__default["default"].useState("false"),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      shareLink = _useState2[0],
      setShareLink = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      authCode = _useState4[0],
      setAuthCode = _useState4[1];

  var link = React.useRef(null);

  var onChange = function onChange(e) {
    setValue(e.target.value);
    updateShare({
      shareLink: shareLink,
      whetherAuthCode: e.target.value
    }).then(function (data) {
      console.log(data);

      if (data.code === 0) {
        if (e.target.value === true) {
          setAuthCode(data.data.authCode);
        } else {
          setAuthCode(null);
        }

        setAuthCode(data.data.authCode);
        setShareLink(data.data.shareLink);
      }
    });
  };

  var onFinish = function onFinish() {};

  React.useEffect(function () {
    if (shareVisible === true) {
      createShare({
        documentId: documentId,
        whetherAuthCode: value
      }).then(function (data) {
        console.log(data);

        if (data.code === 0) {
          setShareLink(data.data.shareLink);
          setAuthCode(data.data.authCode);
        }
      });
    }
  }, [shareVisible, documentId]); // 分享qq空间

  var shareToQZon = function shareToQZon(pic) {
    console.log(window.location.href);
    var param = {
      url: window.location.href,

      /*分享地址(可选)*/
      desc: '文档',

      /*分享理由(可选)*/
      title: docInfo.name || "",

      /*分享标题(可选)*/
      summary: authCode ? "\u5BC6\u7801\uFF1A".concat(authCode) : "",

      /*分享描述(可选)*/
      pics: pic || 'http://127.0.0.1:3001/images/logo.png'
      /*分享图片(可选)*/

    };
    var temp = [];

    for (var p in param) {
      temp.push(p + '=' + encodeURIComponent(param[p] || ''));
    }

    var targetUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + temp.join('&');
    window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
  };
  /**
   * 分享qq
   */


  var shareQQ = function shareQQ(url) {
    var param = {
      url: window.location.href,
      desc: '文档',

      /*分享理由*/
      title: docInfo.name || '',

      /*分享标题(可选)*/
      summary: '分享',

      /*分享描述(可选)*/
      pics: 'http://127.0.0.1:3001/images/logo.png'
      /*分享图片(可选)*/

    };
    var s = [];

    for (var i in param) {
      s.push(i + '=' + encodeURIComponent(param[i] || ''));
    }

    var targetUrl = "https://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
    window.open(targetUrl, '_blank', 'height=520, width=720');
  }; // 新浪微博


  var shareToSinaWeiBo = function shareToSinaWeiBo() {
    var param = {
      url: window.location.href,

      /*分享地址(可选)*/
      type: '3',
      count: '1',

      /** 是否显示分享数，1显示(可选)*/
      title: docInfo.name,

      /** 分享的文字内容(可选，默认为所在页面的title)*/
      pic: 'http://127.0.0.1:3001/images/logo.png',

      /**分享图片的路径(可选)*/
      rnd: new Date().valueOf()
    };
    var temp = [];

    for (var p in param) {
      temp.push(p + '=' + encodeURIComponent(param[p] || ''));
    }

    var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
    window.open(targetUrl, 'sinaweibo', 'height=800, width=800');
  }; // 分享微信


  var shareWeixin = function shareWeixin() {
    var url = window.location.href;
    var encodePath = encodeURIComponent(url);
    var targetUrl = 'http://zixuephp.net/inc/qrcode_img.php?text=' + encodePath;
    window.open(targetUrl, 'weixin', 'height=320, width=320');
  }; // 复制


  var copy = function copy() {
    var link = document.getElementById("link");

    if (document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(link);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();

      var _range = document.createRange();

      _range.selectNodeContents(link);

      selection.removeAllRanges();
      selection.addRange(_range);
    }

    document.execCommand("Copy"); // 执行浏览器复制命令
  };

  return /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: "\u5206\u4EAB",
    visible: shareVisible,
    onOk: function onOk() {
      return onFinish();
    },
    onCancel: function onCancel() {
      return setShareVisible(false);
    },
    destroyOnClose: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Radio__default["default"].Group, {
    onChange: onChange,
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Radio__default["default"], {
    value: "false",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 17
    }
  }, "\u516C\u5F00\u94FE\u63A5"), /*#__PURE__*/React__default["default"].createElement(_Radio__default["default"], {
    value: "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 17
    }
  }, "\u79C1\u5BC6\u94FE\u63A5")), value === "public" ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-link link-box",
    ref: link,
    id: "link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
      columnNumber: 38
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 21
    }
  }, "\u94FE\u63A5\u5730\u5740:"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 60
    }
  }, "http://192.168.2.3:3001/#/shareDocument/", documentId, "/", shareLink)) : /*#__PURE__*/React__default["default"].createElement("div", {
    ref: link,
    id: "link",
    className: "link-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 26
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 25
    }
  }, "\u94FE\u63A5\u5730\u5740\uFF1A"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 25
    }
  }, "http://192.168.2.3:3001/#/shareDocument/", documentId, "/", shareLink)), authCode && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 65
    }
  }, "\u5BC6\u7801\uFF1A"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 102
    }
  }, authCode))), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      textAlign: "right"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    onClick: function onClick() {
      return copy();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 17
    }
  }, "\u590D\u5236")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 13
    }
  }, "\u5206\u4EAB\u5230\uFF1A"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-item",
    onClick: function onClick() {
      return shareWeixin();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "share-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-weixin",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "share-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 21
    }
  }, "\u5FAE\u4FE1\u597D\u53CB")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "share-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-firend",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "share-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 21
    }
  }, "\u670B\u53CB\u5708")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-item",
    onClick: function onClick() {
      return shareQQ();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "share-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-QQ",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "share-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 21
    }
  }, "QQ\u597D\u53CB")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-item",
    onClick: function onClick() {
      return shareToQZon();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "share-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-QQspace",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "share-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 21
    }
  }, "\u7A7A\u95F4")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "share-item",
    onClick: function onClick() {
      return shareToSinaWeiBo();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "share-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-weibo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 199,
      columnNumber: 25
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "share-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 21
    }
  }, "\u5FAE\u535A"))));
};

exports["default"] = Share;
