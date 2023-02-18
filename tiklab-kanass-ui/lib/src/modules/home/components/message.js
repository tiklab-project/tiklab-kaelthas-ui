'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/drawer/style/css');
var _Drawer = require('antd/es/drawer');
require('antd/es/tabs/style/css');
var _Tabs = require('antd/es/tabs');
require('antd/es/badge/style/css');
var _Badge = require('antd/es/badge');
require('antd/es/avatar/style/css');
var _Avatar = require('antd/es/avatar');
var React = require('react');
var mobxReact = require('mobx-react');
var icons = require('@ant-design/icons');
require('./message.scss.js');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Drawer__default = /*#__PURE__*/_interopDefaultLegacy(_Drawer);
var _Tabs__default = /*#__PURE__*/_interopDefaultLegacy(_Tabs);
var _Badge__default = /*#__PURE__*/_interopDefaultLegacy(_Badge);
var _Avatar__default = /*#__PURE__*/_interopDefaultLegacy(_Avatar);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/home/components/message.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Message = function Message(props) {
  var todoMessageList = React.useRef();
  var homeStore = props.homeStore;

  var _useState = React.useState('left'),
      _useState2 = _slicedToArray(_useState, 2),
      placement = _useState2[0];
      _useState2[1];

  var findMessageDispatchItemPage = homeStore.findMessageDispatchItemPage,
      messageTotal = homeStore.messageTotal,
      messageList = homeStore.messageList,
      isMessageReachBottom = homeStore.isMessageReachBottom,
      updateMessageDispatchItem = homeStore.updateMessageDispatchItem;

  var _useState3 = React.useState("0"),
      _useState4 = _slicedToArray(_useState3, 2),
      currenTab = _useState4[0],
      setCurrentTab = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      currentPage = _useState6[0],
      setCurrentPage = _useState6[1];

  var _useState7 = React.useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      unReadMessage = _useState8[0],
      setUnReadMessage = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      open = _useState10[0],
      setOpen = _useState10[1];

  var messageRef = React.useRef();
  React.useEffect(function () {
    if (open) {
      findMessageDispatchItemPage({
        page: 1,
        status: currenTab
      });
    }

    findMessageDispatchItemPage({
      page: 1,
      status: "0"
    }).then(function (res) {
      if (res.code === 0) {
        setUnReadMessage(res.data.totalRecord);
      }
    });
  }, [open]);
  React.useEffect(function () {
    window.addEventListener("mousedown", closeModal, false);
    return function () {
      window.removeEventListener("mousedown", closeModal, false);
    };
  }, []);

  var closeModal = function closeModal(e) {
    if (!messageRef.current) {
      return;
    }

    if (!messageRef.current.contains(e.target) && messageRef.current !== e.target) {
      setOpen(false);
    }
  };

  var changePage = function changePage() {
    var current = currentPage + 1;
    setCurrentPage(current);
    findMessageDispatchItemPage({
      page: current,
      status: currenTab
    });
  };

  var onClose = function onClose() {
    setOpen(false);
  };

  var onChange = function onChange(e) {
    // setPlacement(e.target.value);
    setCurrentTab(e);
    findMessageDispatchItemPage({
      page: 1,
      status: e
    });
  };

  var goToMessage = function goToMessage(link, id) {
    // props.history.push(link)
    var value = {
      id: id,
      status: "1"
    };
    updateMessageDispatchItem(value);
    window.location.href = link;
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: messageRef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    className: "frame-header-language",
    "data-title": "\u6D88\u606F\u63D0\u793A",
    onClick: function onClick() {
      return setOpen(true);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Badge__default["default"], {
    count: unReadMessage,
    size: "small",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Avatar__default["default"], {
    size: "small",
    style: {
      background: "transparent",
      fontSize: "22px"
    },
    icon: /*#__PURE__*/React__default["default"].createElement(icons.MessageOutlined, {
      style: {
        color: "#fff"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 100
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 21
    }
  }))), /*#__PURE__*/React__default["default"].createElement(_Drawer__default["default"], {
    title: "\u6D88\u606F",
    placement: "right",
    closable: true,
    onClose: onClose,
    visible: open,
    key: placement,
    className: "frame-header-drawer",
    mask: false,
    destroyOnClose: true,
    width: 375,
    getContainer: false // extra={
    //     <Space>
    //         <CloseOutlined onClick={() => { setOpen(false) }} />
    //     </Space>
    // }
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Tabs__default["default"], {
    onChange: onChange,
    size: "small",
    activeKey: currenTab,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Tabs__default["default"].TabPane, {
    tab: "\u672A\u8BFB",
    key: "0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-box",
    ref: todoMessageList,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 29
    }
  }, messageList && messageList.length > 0 && messageList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "message-list",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.content
      },
      onClick: function onClick() {
        return goToMessage(item.link, item.id);
      },
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 45
      }
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "message-status ".concat(item.status === 0 ? "status-unread" : "status-read"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 45
      }
    }));
  }), messageTotal > 1 && (isMessageReachBottom ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-list-bottom",
    onClick: function onClick() {
      return changePage();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 45
    }
  }, "\u70B9\u51FB\u52A0\u8F7D\u66F4\u591A") : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-list-bottom",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 126
    }
  }, "\u7B2C", currentPage, "\u9875/\u603B", messageTotal, "\u9875")))), /*#__PURE__*/React__default["default"].createElement(_Tabs__default["default"].TabPane, {
    tab: "\u5DF2\u8BFB",
    key: "1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-box",
    ref: todoMessageList,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 29
    }
  }, messageList && messageList.length > 0 && messageList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "message-list",
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.content
      },
      className: "message-item",
      style: {
        flex: 1
      },
      onClick: function onClick() {
        return goToMessage(item.link, item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 45
      }
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "message-status ".concat(item.status === 1 ? "status-read" : "status-unread"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 45
      }
    }));
  }), messageTotal > 1 && (isMessageReachBottom ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-list-bottom",
    onClick: function onClick() {
      return changePage();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 41
    }
  }, "\u70B9\u51FB\u52A0\u8F7D\u66F4\u591A") : /*#__PURE__*/React__default["default"].createElement("div", {
    className: "message-list-bottom",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 122
    }
  }, "\u7B2C", currentPage, "\u9875/\u603B", messageTotal, "\u9875"))))))));
};

var Message$1 = reactRouter.withRouter(mobxReact.inject('homeStore')(mobxReact.observer(Message)));

exports["default"] = Message$1;
