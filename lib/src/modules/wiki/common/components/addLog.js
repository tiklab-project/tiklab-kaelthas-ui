'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/modal/style/css');
var _Modal = require('antd/es/modal');
require('antd/es/select/style/css');
var _Select = require('antd/es/select');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
require('antd/es/input/style/css');
var _Input = require('antd/es/input');
var React = require('react');
require('react-router-dom');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Modal__default = /*#__PURE__*/_interopDefaultLegacy(_Modal);
var _Select__default = /*#__PURE__*/_interopDefaultLegacy(_Select);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var _Input__default = /*#__PURE__*/_interopDefaultLegacy(_Input);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/addLog.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AddLog = function AddLog(props) {
  var addModalVisible = props.addModalVisible,
      setAddModalVisible = props.setAddModalVisible,
      setWikiCatalogueList = props.setWikiCatalogueList,
      modalTitle = props.modalTitle,
      WikiCatalogueStore = props.WikiCatalogueStore,
      catalogueId = props.catalogueId,
      form = props.form,
      contentValue = props.contentValue,
      setSelectKey = props.setSelectKey,
      userList = props.userList;
  var addWikiCatalogue = WikiCatalogueStore.addWikiCatalogue,
      addWikiCataDocument = WikiCatalogueStore.addWikiCataDocument,
      findWikiCatalogue = WikiCatalogueStore.findWikiCatalogue;
  var wikiId = props.match.params.wikiId;

  var onFinish = function onFinish() {
    form.validateFields().then(function (values) {
      var data;

      if (values.formatType === "category") {
        if (catalogueId) {
          data = _objectSpread(_objectSpread({}, values), {}, {
            repository: {
              id: wikiId
            },
            parentCategory: {
              id: catalogueId
            },
            master: {
              id: values.master
            },
            typeId: values.formatType
          });
        } else {
          data = _objectSpread(_objectSpread({}, values), {}, {
            repository: {
              id: wikiId
            },
            master: {
              id: values.master
            },
            typeId: values.formatType
          });
        }

        addWikiCatalogue(data).then(function (data) {
          if (data.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
            setAddModalVisible(!addModalVisible);
            form.resetFields();
          }
        });
      } else {
        // data = {
        //     ...values,
        //     repository:{id: wikiId},
        //     category: {id:catalogueId},
        //     details:JSON.stringify(contentValue),
        //     master: {id: values.master},
        //     typeId: values.formatType
        // }
        if (catalogueId) {
          data = _objectSpread(_objectSpread({}, values), {}, {
            repository: {
              id: wikiId
            },
            category: {
              id: catalogueId
            },
            details: JSON.stringify(contentValue),
            master: {
              id: values.master
            },
            typeId: values.formatType
          });
        } else {
          data = _objectSpread(_objectSpread({}, values), {}, {
            repository: {
              id: wikiId
            },
            details: JSON.stringify(contentValue),
            master: {
              id: values.master
            },
            typeId: values.formatType
          });
        }

        addWikiCataDocument(data).then(function (data) {
          if (data.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
            setAddModalVisible(!addModalVisible);
            localStorage.setItem("documentId", data.data);

            if (values.formatType === "mindMap") {
              props.history.push("/index/wikidetail/".concat(wikiId, "/mindmap/").concat(data.data));
            }

            if (values.formatType === "document") {
              props.history.push("/index/wikidetail/".concat(wikiId, "/doc/").concat(data.data));
            } // 左侧导航


            setSelectKey(data.data);
            form.resetFields();
          }
        });
      }
    });
  }; // const selectType = () => {
  // }


  return /*#__PURE__*/React__default["default"].createElement(_Modal__default["default"], {
    title: modalTitle,
    visible: addModalVisible,
    onOk: function onOk() {
      return onFinish();
    },
    onCancel: function onCancel() {
      return setAddModalVisible(false);
    },
    destroyOnClose: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"], {
    form: form,
    name: "basic",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    },
    initialValues: {
      remember: true
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u540D\u5B57",
    name: "name",
    rules: [{
      required: true,
      message: '请输入目录名字!'
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Input__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 21
    }
  })), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u8D1F\u8D23\u4EBA",
    name: "master",
    rules: [{
      required: true
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    placeholder: "\u8D1F\u8D23\u4EBA",
    allowClear: true,
    className: "work-select",
    key: "master",
    style: {
      minWidth: '80px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 21
    }
  }, userList && userList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
      value: item.user.id,
      key: item.user.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 40
      }
    }, item.user.name);
  }))), /*#__PURE__*/React__default["default"].createElement(_Form__default["default"].Item, {
    label: "\u7C7B\u578B",
    name: "formatType",
    rules: [{
      required: true,
      message: '请选择类型!'
    }],
    hidden: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"], {
    onChange: function onChange(value) {
      return selectType(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
    value: "category",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 25
    }
  }, "\u76EE\u5F55"), /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
    value: "document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 25
    }
  }, "\u9875\u9762"), /*#__PURE__*/React__default["default"].createElement(_Select__default["default"].Option, {
    value: "mindMap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 25
    }
  }, "\u8111\u56FE")))));
};

var AddLog$1 = mobxReact.inject("WikiCatalogueStore")(mobxReact.observer(AddLog));

exports["default"] = AddLog$1;
