'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/table/style/css');
var _Table = require('antd/es/table');
require('antd/es/space/style/css');
var _Space = require('antd/es/space');
require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
var React = require('react');
var icons = require('@ant-design/icons');
var templateAddmodal = require('./templateAddmodal.js');
require('./template.scss.js');
var templatePreviewmodal = require('./templatePreviewmodal.js');
var mobxReact = require('mobx-react');
var breadcrumb = require('../../../common/breadcrumb/breadcrumb.js');
var button = require('../../../common/button/button.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Table__default = /*#__PURE__*/_interopDefaultLegacy(_Table);
var _Space__default = /*#__PURE__*/_interopDefaultLegacy(_Space);
var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/template/components/template.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var confirm = _Modal__default["default"].confirm;

var Template = function Template(props) {
  var templateStore = props.templateStore;
  var findDocumentTemplatePage = templateStore.findDocumentTemplatePage,
      deleteDocumentTemplate = templateStore.deleteDocumentTemplate;
      templateStore.templatePageParams;

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
      _useState10 = _slicedToArray(_useState9, 2);
      _useState10[0];
      _useState10[1];

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
          lineNumber: 58,
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

  var columns = [{
    title: "模板名称",
    dataIndex: "name",
    key: "name",
    align: "left",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        onClick: function onClick() {
          return goWikidetail(record);
        },
        className: "wiki-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 39
        }
      }, record.iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
        src: '/images/' + record.iconUrl,
        alt: "",
        className: "img-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102,
          columnNumber: 25
        }
      }) : /*#__PURE__*/React__default["default"].createElement("img", {
        src: 'images/repository1.png',
        alt: "",
        className: "img-icon",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 25
        }
      }), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "wiki-name",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114,
          columnNumber: 17
        }
      }, text));
    }
  }, {
    title: "模板描述",
    dataIndex: "description",
    key: "description",
    align: "left"
  }, {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "left",
    width: "15%",
    render: function render(text, record) {
      return /*#__PURE__*/React__default["default"].createElement(_Space__default["default"], {
        size: "middle",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: "span-botton  delete",
        onClick: function onClick() {
          return editModal(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131,
          columnNumber: 22
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "botton-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-edit",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133,
          columnNumber: 29
        }
      }))), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "span-botton  delete",
        onClick: function onClick() {
          return previewModal(record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "botton-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-view",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 29
        }
      }))), /*#__PURE__*/React__default["default"].createElement("span", {
        className: "span-botton  delete",
        onClick: function onClick() {
          return showDeleteConfirm(record.name, record.id);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "botton-icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-delete",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143,
          columnNumber: 29
        }
      }))));
    }
  }];
  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Layout__default["default"], {
    className: "wiki-template",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    style: {
      height: "100%"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 154,
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
      lineNumber: 155,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(breadcrumb["default"], {
    firstText: "\u6587\u6863\u6A21\u677F",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 22
    }
  }, /*#__PURE__*/React__default["default"].createElement(button["default"], {
    type: "primary",
    onClick: function onClick() {
      return addModal();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159,
      columnNumber: 25
    }
  }, "\u6DFB\u52A0\u6A21\u677F")), /*#__PURE__*/React__default["default"].createElement(_Table__default["default"], {
    columns: columns,
    dataSource: templateList,
    rowKey: function rowKey(record) {
      return record.id;
    },
    pagination: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 21
    }
  })))), /*#__PURE__*/React__default["default"].createElement(templateAddmodal["default"], {
    modalName: modalName,
    editOrAdd: editOrAdd,
    addModalVisible: addModalVisible,
    setAddModalVisible: setAddModalVisible,
    setTemplateList: setTemplateList,
    templateId: templateId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
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
      lineNumber: 178,
      columnNumber: 9
    }
  }));
};

var template = mobxReact.inject("templateStore")(mobxReact.observer(Template));

exports["default"] = template;
