'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/pagination/style/css');
var _Pagination = require('antd/es/pagination');
require('antd/es/button/style/css');
var _Button = require('antd/es/button');
require('antd/es/divider/style/css');
var _Divider = require('antd/es/divider');
require('antd/es/breadcrumb/style/css');
var _Breadcrumb = require('antd/es/breadcrumb');
require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
var icons = require('@ant-design/icons');
var templateAddmodal = require('./templateAddmodal.js');
require('./template.scss.js');
var templatePreviewmodal = require('./templatePreviewmodal.js');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Pagination__default = /*#__PURE__*/_interopDefaultLegacy(_Pagination);
var _Button__default = /*#__PURE__*/_interopDefaultLegacy(_Button);
var _Divider__default = /*#__PURE__*/_interopDefaultLegacy(_Divider);
var _Breadcrumb__default = /*#__PURE__*/_interopDefaultLegacy(_Breadcrumb);
var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/template/components/template copy.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Search = _Input__default["default"].Search;
var confirm = _Modal__default["default"].confirm;

var Template = function Template(props) {
  var templateStore = props.templateStore;
  var findDocumentTemplatePage = templateStore.findDocumentTemplatePage,
      deleteDocumentTemplate = templateStore.deleteDocumentTemplate,
      templatePageParams = templateStore.templatePageParams;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      addModalVisible = _useState2[0],
      setAddModalVisible = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      previewModalVisible = _useState4[0],
      setPreviewModalVisible = _useState4[1];

  var _useState5 = React.useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      editOrAdd = _useState6[0],
      setEditOrAdd = _useState6[1];

  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      modalName = _useState8[0],
      setModalName = _useState8[1];

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      hoverId = _useState10[0],
      setHoverId = _useState10[1];

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      templateList = _useState12[0],
      setTemplateList = _useState12[1];

  var _useState13 = React.useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      templateId = _useState14[0],
      setTemplate = _useState14[1];

  React.useEffect(function () {
    findDocumentTemplatePage().then(function (data) {
      if (data.code === 0) {
        setTemplateList(data.data.dataList);
      }
    });
  }, []);

  var addModal = function addModal() {
    setAddModalVisible(true);
    setEditOrAdd("add");
    setModalName("添加模板");
  };

  var editModal = function editModal(id) {
    setAddModalVisible(true);
    setEditOrAdd("edit");
    setModalName("编辑模板");
    setTemplate(id);
  };

  var previewModal = function previewModal(id) {
    setPreviewModalVisible(true);
    setTemplate(id);
  }; // 删除模板


  var showDeleteConfirm = function showDeleteConfirm(name, id) {
    confirm({
      title: "\u786E\u5B9A\u5220\u9664".concat(name, "?"),
      icon: /*#__PURE__*/React__default["default"].createElement(icons.ExclamationCircleOutlined, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 19
        }
      }),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: function onOk() {
        deleteDocumentTemplate(id).then(function (data) {
          findDocumentTemplatePage().then(function (data) {
            if (data.code === 0) {
              setTemplateList(data.data.dataList);
            }
          });
        });
      },
      onCancel: function onCancel() {}
    });
  }; // 查找模板


  var onSearch = function onSearch(value) {
    findDocumentTemplatePage({
      name: value
    }).then(function (data) {
      if (data.code === 0) {
        setTemplateList(data.data.dataList);
      }
    });
  }; // 改变页码


  var changePage = function changePage(page) {
    findDocumentTemplatePage({
      current: page
    }).then(function (data) {
      if (data.code === 0) {
        setTemplateList(data.data.dataList);
      }
    });
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wiki-template",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
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
      lineNumber: 95,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 25
    }
  }, "\u77E5\u8BC6\u5E93\u7BA1\u7406"), /*#__PURE__*/React__default["default"].createElement(_Breadcrumb__default["default"].Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 29
    }
  }, "\u77E5\u8BC6\u5E93\u5217\u8868"))), /*#__PURE__*/React__default["default"].createElement(_Divider__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 21
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search-add",
    key: "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(Search, {
    placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
    allowClear: true,
    onSearch: onSearch,
    style: {
      width: 300
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 25
    }
  }), /*#__PURE__*/React__default["default"].createElement(_Button__default["default"], {
    onClick: function onClick() {
      return addModal();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 25
    }
  }, "\u6DFB\u52A0\u6A21\u677F")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "template-box",
    key: "box",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 21
    }
  }, templateList && templateList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "template-item",
      onMouseEnter: function onMouseEnter() {
        return setHoverId(item.id);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverId(null);
      },
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115,
        columnNumber: 36
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 37
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 122,
        columnNumber: 41
      }
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "title",
      key: "title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 37
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "item-shade ".concat(item.id === hoverId ? "item-show" : "item-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 127,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return previewModal(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 37
      }
    }, "\u67E5\u770B"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return editModal(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129,
        columnNumber: 37
      }
    }, "\u7F16\u8F91"), /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return showDeleteConfirm(item.name, item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130,
        columnNumber: 37
      }
    }, "\u5220\u9664")));
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      textAlign: "right",
      marginTop: "10px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Pagination__default["default"], {
    defaultCurrent: 1,
    total: templatePageParams.total,
    onChange: function onChange(page) {
      return changePage(page);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 73
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(templateAddmodal["default"], {
    modalName: modalName,
    editOrAdd: editOrAdd,
    addModalVisible: addModalVisible,
    setAddModalVisible: setAddModalVisible,
    setTemplateList: setTemplateList,
    templateId: templateId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 9
    }
  }), /*#__PURE__*/React__default["default"].createElement(templatePreviewmodal["default"], {
    name: "\u6DFB\u52A0\u77E5\u8BC6\u5E93",
    type: "add",
    previewModalVisible: previewModalVisible,
    setPreviewModalVisible: setPreviewModalVisible,
    templateId: templateId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 9
    }
  }));
};

var template_copy = mobxReact.inject("templateStore")(mobxReact.observer(Template));

exports["default"] = template_copy;
