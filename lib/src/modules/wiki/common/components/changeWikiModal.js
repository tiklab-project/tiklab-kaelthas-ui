'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./changeWikiModal.scss.js');
require('react-i18next');
var reactRouter = require('react-router');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/changeWikiModal.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ChangeWikiModel = function ChangeWikiModel(props) {
  var wikilist = props.wikilist,
      searchwiki = props.searchwiki;
      props.setWorkType;
      props.wiki;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      selectWiki = _useState4[0],
      setSelectWiki = _useState4[1];

  var modelRef = React.useRef();
  var setButton = React.useRef();

  var showMoreMenu = function showMoreMenu() {
    setShowMenu(!showMenu);
    modelRef.current.style.left = setButton.current.clientWidth;
  };

  React.useEffect(function () {
    window.addEventListener("mousedown", closeModal, false);
    return function () {
      window.removeEventListener("mousedown", closeModal, false);
    };
  }, [showMenu]);

  var closeModal = function closeModal(e) {
    if (!modelRef.current) {
      return;
    }

    if (!modelRef.current.contains(e.target) && modelRef.current !== e.target) {
      setShowMenu(false);
    }
  };
  /**
   * 切换项目
   * @param {id} id 
   */


  var selectWikiId = function selectWikiId(id) {
    // 切换选中项目，获取项目详情
    searchwiki(id).then(function (data) {
      if (data.code === 0) {
        props.history.push("/index/wikidetail/".concat(id, "/survey")); // 重置事项id
        // 关闭切换弹窗

        setShowMenu(false);
        location.reload();
      }
    }); // 讲当前项目id存入localStorage
  };

  var handleMouseOver = function handleMouseOver(id) {
    setSelectWiki(id);
  };

  var handleMouseOut = function handleMouseOut() {
    setSelectWiki("");
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "change-wiki",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    ref: setButton,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-title-icon",
    onClick: showMoreMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-toggleCollapsed",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-down",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 29
    }
  }))))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "change-wiki-box ".concat(showMenu ? "menu-show" : "menu-hidden"),
    ref: modelRef,
    style: {},
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "change-wiki-head",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 17
    }
  }, "\u5207\u6362\u77E5\u8BC6\u5E93"), wikilist && wikilist.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "change-wiki-name ".concat(item.id === selectWiki ? "change-wiki-selectName" : ""),
      onClick: function onClick() {
        return selectWikiId(item.id);
      },
      key: item.id,
      onMouseOver: function onMouseOver() {
        return handleMouseOver(item.id);
      },
      onMouseOut: handleMouseOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 32
      }
    }, item.iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
      src: 'images/' + item.iconUrl,
      className: "img-icon",
      title: item.name,
      alt: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 37
      }
    }) : /*#__PURE__*/React__default["default"].createElement("img", {
      className: "img-icon",
      src: 'images/repository1.png',
      title: item.name,
      alt: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 37
      }
    }), item.name);
  })));
};

var ChangeWikiModal = reactRouter.withRouter(mobxReact.inject("wikiDetailStore")(mobxReact.observer(ChangeWikiModel)));

exports["default"] = ChangeWikiModal;
