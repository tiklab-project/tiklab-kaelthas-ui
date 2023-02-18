'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/row/style/css');
var _Row = require('antd/es/row');
require('antd/es/col/style/css');
var _Col = require('antd/es/col');
require('antd/es/empty/style/css');
var _Empty = require('antd/es/empty');
require('antd/es/dropdown/style/css');
var _Dropdown = require('antd/es/dropdown');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
var React = require('react');
require('./logDetail.scss.js');
var mobxReact = require('mobx-react');
var addLog = require('./addLog.js');
var templateList = require('./templateList.js');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Empty__default = /*#__PURE__*/_interopDefaultLegacy(_Empty);
var _Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(_Dropdown);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/logDetail.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogDetail = function LogDetail(props) {
  var WikiCatalogueStore = props.WikiCatalogueStore;
  var detailWikiLog = WikiCatalogueStore.detailWikiLog,
      findCategoryDocument = WikiCatalogueStore.findCategoryDocument,
      findDmPrjRolePage = WikiCatalogueStore.findDmPrjRolePage,
      setWikiCatalogueList = WikiCatalogueStore.setWikiCatalogueList,
      createDocumentRecent = WikiCatalogueStore.createDocumentRecent;
  var categoryId = localStorage.getItem("categoryId");

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      logList = _useState2[0],
      setLogList = _useState2[1];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      logDetail = _useState4[0],
      setLogDetail = _useState4[1]; // 当前知识库id


  var wikiId = JSON.parse(localStorage.getItem("wiki")).id;
  var userId = tiklabCoreUi.getUser().userId;
  React.useEffect(function () {
    detailWikiLog({
      id: categoryId
    }).then(function (data) {
      setLogDetail(data);
    });
    findCategoryDocument(categoryId).then(function (data) {
      setLogList(data.data);
    });
  }, [categoryId]);

  var _useState5 = React.useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      changeTemplateVisible = _useState6[0],
      setChangeTemplateVisible = _useState6[1];

  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      addModalVisible = _useState8[0],
      setAddModalVisible = _useState8[1];

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      templateId = _useState10[0],
      setTemplateId = _useState10[1]; // 添加按钮下拉菜单


  var addMenu = function addMenu(id) {
    return /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
      onClick: function onClick(value) {
        return selectAddType(value, id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "category",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u76EE\u5F55"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "document",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u9875\u9762"));
  };
  /**
   * 添加目录
   */


  var _useState11 = React.useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }]),
      _useState12 = _slicedToArray(_useState11, 2),
      contentValue = _useState12[0],
      setContentValue = _useState12[1];

  var _useState13 = React.useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      catalogueId = _useState14[0],
      setCatalogueId = _useState14[1];

  var _useState15 = React.useState(),
      _useState16 = _slicedToArray(_useState15, 2),
      userList = _useState16[0],
      setUserList = _useState16[1];

  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0]; // 当前选中目录id


  var _useState17 = React.useState(),
      _useState18 = _slicedToArray(_useState17, 2);
      _useState18[0];
      var setSelectKey = _useState18[1];

  var selectAddType = function selectAddType(value, id) {
    setCatalogueId(id);
    findDmPrjRolePage(wikiId).then(function (data) {
      setUserList(data.dataList);
    });

    if (value.key === "category") {
      setAddModalVisible(true);
    } else {
      setChangeTemplateVisible(true);
    } // 


    form.setFieldsValue({
      formatType: value.key
    });
  };

  var goToDocument = function goToDocument(item) {
    var params = {
      name: item.name,
      model: item.typeId,
      modelId: item.id,
      master: {
        id: userId
      },
      repository: {
        id: wikiId
      }
    };
    createDocumentRecent(params);
    setSelectKey(item.id);

    if (item.formatType === "category") {
      localStorage.setItem("categoryId", item.id);
      props.history.push("/index/wikidetail/".concat(wikiId, "/folder/").concat(item.id));
    }

    if (item.typeId === "document") {
      localStorage.setItem("documentId", item.id);
      props.history.push("/index/wikidetail/".concat(wikiId, "/doc/").concat(item.id));
    }

    if (item.typeId === "mindMap") {
      localStorage.setItem("documentId", item.id);
      props.history.push("/index/wikidetail/".concat(wikiId, "/mindmap/").concat(item.id));
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "log-detail",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    lg: {
      span: "18",
      offset: "3"
    },
    xxl: {
      span: "18",
      offset: "3"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 21
    }
  }, logDetail && /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 42
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "log-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "title-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-folder",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 45
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "title-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 45
    }
  }, logDetail.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "master",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 45
    }
  }, logDetail.master.name))), /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: function overlay() {
      return addMenu(logDetail.id);
    },
    placement: "bottomLeft",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "top-add-botton",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 41
    }
  }, "\u6DFB\u52A0\u5185\u5BB9")))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "log-child",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 25
    }
  }, logList && logList.length > 0 ? logList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 44
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "log-child-list",
      key: item.id,
      onClick: function onClick() {
        return goToDocument(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 136,
        columnNumber: 41
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "log-child-name",
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 45
      }
    }, item.formatType && item.formatType === "category" && /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "log-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 140,
        columnNumber: 53
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-folder",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 141,
        columnNumber: 57
      }
    })), item.formatType && item.formatType === "document" && item.typeId === "mindMap" && /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "log-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 53
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-minmap",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 147,
        columnNumber: 57
      }
    })), item.formatType && item.formatType === "document" && item.typeId === "document" && /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "log-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 152,
        columnNumber: 53
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-file",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 57
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 157,
        columnNumber: 49
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 45
      }
    }, item.master.nickname), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160,
        columnNumber: 45
      }
    }, item.updateTime)));
  }) : /*#__PURE__*/React__default["default"].createElement(_Empty__default["default"], {
    image: "/images/nodata.png",
    description: "\u6682\u65F6\u6CA1\u6709\u5185\u5BB9~",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 165,
      columnNumber: 33
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(addLog["default"], _extends({
    setAddModalVisible: setAddModalVisible,
    addModalVisible: addModalVisible,
    setWikiCatalogueList: setWikiCatalogueList,
    form: form,
    catalogueId: catalogueId,
    contentValue: contentValue,
    setSelectKey: setSelectKey,
    userList: userList
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement(templateList["default"], {
    changeTemplateVisible: changeTemplateVisible,
    setChangeTemplateVisible: setChangeTemplateVisible,
    templateId: templateId,
    setTemplateId: setTemplateId,
    setAddModalVisible: setAddModalVisible,
    contentValue: contentValue,
    setContentValue: setContentValue,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 13
    }
  }));
};

var logDetail = mobxReact.inject("WikiCatalogueStore")(mobxReact.observer(LogDetail));

exports["default"] = logDetail;
