'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
var reactRouter = require('react-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wikiSet/basic-info/components/changIcon.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ProjectIcon = function ProjectIcon(props) {
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var visible = props.visible,
      setVisible = props.setVisible,
      updateWiki = props.updateWiki,
      setIconUrl = props.setIconUrl;

  var _useState = React.useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      wikiIconUrl = _useState2[0],
      setProjectIconUrl = _useState2[1];

  var iconList = [{
    iconUrl: "repository1.png",
    key: "repository1"
  }, {
    iconUrl: "repository2.png",
    key: "repository2"
  }, {
    iconUrl: "repository3.png",
    key: "repository3"
  }, {
    iconUrl: "repository4.png",
    key: "repository4"
  }, {
    iconUrl: "repository5.png",
    key: "repository5"
  }];
  var wikiId = props.match.params.wikiId;

  var onFinish = function onFinish() {
    var data = {
      id: wikiId,
      iconUrl: wikiIconUrl
    };
    updateWiki(data).then(function (res) {
      setIconUrl(wikiIconUrl);
      setVisible(false);
    });
  };

  var onCancel = function onCancel() {
    form.resetFields();
    setVisible(false);
  };

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: "\u66F4\u6539\u56FE\u6807",
    visible: visible // footer={null}
    ,
    onCancel: onCancel,
    onOk: onFinish,
    okText: "确定",
    cancelText: "取消",
    className: "wiki-icon-modal",
    closable: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u56FE\u6807",
    name: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-icon-box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 25
    }
  }, iconList && iconList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-icon ".concat(item.iconUrl === wikiIconUrl ? "icon-select" : null),
      key: item.key,
      onClick: function onClick() {
        setProjectIconUrl(item.iconUrl);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 44
      }
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      src: 'images/' + item.iconUrl,
      alt: "",
      className: "list-img",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 41
      }
    }));
  }))))));
};

var WikiIcon = reactRouter.withRouter(ProjectIcon);

exports["default"] = WikiIcon;
