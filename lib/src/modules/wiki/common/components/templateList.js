'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
var mobxReact = require('mobx-react');
var icons = require('@ant-design/icons');
require('./templateList.scss.js');
var tiklabSlateUi = require('tiklab-slate-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/templateList.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
_Layout__default["default"].Header;
    var Content = _Layout__default["default"].Content;
    _Layout__default["default"].Footer;
    var Sider = _Layout__default["default"].Sider;

var TemplateList = function TemplateList(props) {
  var templateStore = props.templateStore,
      changeTemplateVisible = props.changeTemplateVisible,
      setChangeTemplateVisible = props.setChangeTemplateVisible,
      setAddModalVisible = props.setAddModalVisible,
      setTemplateId = props.setTemplateId,
      setContentValue = props.setContentValue;
  var findDocumentTemplatePage = templateStore.findDocumentTemplatePage,
      findDocumentTemplate = templateStore.findDocumentTemplate;

  var _useState = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      templateList = _useState4[0],
      setTemplateList = _useState4[1];

  React.useEffect(function () {
    setContentValue(value);
    findDocumentTemplatePage().then(function (data) {
      if (data.code === 0) {
        setTemplateList(data.data.dataList);
      }
    });
  }, []);

  var changeTemplate = function changeTemplate(value) {
    setTemplateId(value.key);

    if (value.key === "entry") {
      setValue([{
        type: "paragraph",
        children: [{
          text: ""
        }]
      }]);
    } else {
      findDocumentTemplate(value.key).then(function (data) {
        var content = data.data;

        if (data.code === 0) {
          // setTemplate({...value})
          setValue(JSON.parse(content.details));
        }
      });
    }
  }; // 下一步


  var next = function next() {
    setChangeTemplateVisible(false);
    setAddModalVisible(true);
    setContentValue(value);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    className: "wiki-modal",
    title: "\u9009\u62E9\u6A21\u677F",
    visible: changeTemplateVisible // onCancel={handleCancel}
    ,
    width: "50vw",
    onOk: function onOk() {
      return next();
    },
    onCancel: function onCancel() {
      return setChangeTemplateVisible(false);
    },
    destroyOnClose: true,
    okText: "\u4E0B\u4E00\u6B65",
    cancelText: "\u53D6\u6D88",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    style: {
      position: 'relative'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    style: {
      overflow: 'auto',
      position: 'absolute',
      left: 0,
      top: 0,
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
    theme: "light",
    mode: "inline",
    defaultSelectedKeys: ['entry'],
    onClick: function onClick(value) {
      return changeTemplate(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
    key: "entry",
    icon: /*#__PURE__*/React__default["default"].createElement(icons.VideoCameraOutlined, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 58
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 29
    }
  }, "\u7A7A\u767D\u6587\u6863"), templateList && templateList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: item.id,
      icon: /*#__PURE__*/React__default["default"].createElement(icons.VideoCameraOutlined, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100,
          columnNumber: 75
        }
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 44
      }
    }, item.name);
  }))), /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "site-layout",
    style: {
      marginLeft: 200
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(Content, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "site-layout-background",
    style: {
      background: "#fff",
      minHeight: "300px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(tiklabSlateUi.PreviewEditor, {
    value: value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 29
    }
  })))))));
};

var TemplateList$1 = mobxReact.inject("templateStore")(mobxReact.observer(TemplateList));

exports["default"] = TemplateList$1;
