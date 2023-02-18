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
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
var React = require('react');
var reactRouter = require('react-router');
var mobxReact = require('mobx-react');
var button = require('../../../../common/button/button.js');
var addLog = require('../../common/components/addLog.js');
require('../../common/components/moveLogList.js');
var templateList = require('../../common/components/templateList.js');
require('../components/survey.scss.js');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Row__default = /*#__PURE__*/_interopDefaultLegacy(_Row);
var _Col__default = /*#__PURE__*/_interopDefaultLegacy(_Col);
var _Empty__default = /*#__PURE__*/_interopDefaultLegacy(_Empty);
var _Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(_Dropdown);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/survey/containers/survey.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Survey = function Survey(props) {
  var surveyStore = props.surveyStore,
      WikiCatalogueStore = props.WikiCatalogueStore,
      homeStore = props.homeStore;
  var findDocumentRecentList = homeStore.findDocumentRecentList;
  var findRepository = surveyStore.findRepository,
      findLogpage = surveyStore.findLogpage,
      opLogList = surveyStore.opLogList;
  var findDmPrjRolePage = WikiCatalogueStore.findDmPrjRolePage,
      setWikiCatalogueList = WikiCatalogueStore.setWikiCatalogueList;
      WikiCatalogueStore.createDocumentRecent;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      repositoryInfo = _useState2[0],
      setRepositoryInfo = _useState2[1];

  var wikiId = props.match.params.wikiId;

  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _useState3 = React.useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      changeTemplateVisible = _useState4[0],
      setChangeTemplateVisible = _useState4[1];

  var _useState5 = React.useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      modalTitle = _useState6[0],
      setModalTitle = _useState6[1];

  var _useState7 = React.useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      contentValue = _useState8[0],
      setContentValue = _useState8[1];

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2);
      _useState10[0];
      var setSelectKey = _useState10[1];

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      templateId = _useState12[0],
      setTemplateId = _useState12[1];

  var _useState13 = React.useState([]),
      _useState14 = _slicedToArray(_useState13, 2),
      recentViewDocumentList = _useState14[0],
      setRecentViewDocumentList = _useState14[1];

  var userId = tiklabCoreUi.getUser().id;
  React.useEffect(function () {
    findLogpage({
      userId: userId,
      repositoryId: wikiId
    });
    findRepository({
      id: wikiId
    }).then(function (res) {
      if (res.code === 0) {
        setRepositoryInfo(res.data);
      }
    }); // findWikiCatalogue(wikiId).then((data) => {
    //     setWikiCatalogueList(data)
    // })

    var recentParams = {
      masterId: userId,
      models: ["document", "mindMap"],
      repositoryId: wikiId,
      orderParams: [{
        name: "recentTime",
        orderType: "asc"
      }]
    };
    findDocumentRecentList(recentParams).then(function (res) {
      if (res.code === 0) {
        setRecentViewDocumentList(_toConsumableArray(res.data));
      }
    });
  }, []);

  var addMenu = function addMenu(id) {
    return /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
      onClick: function onClick(value) {
        return selectAddType(value, id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "category",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u76EE\u5F55"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "document",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u9875\u9762"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "mindMap",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u8111\u56FE"));
  };

  var _useState15 = React.useState(),
      _useState16 = _slicedToArray(_useState15, 2),
      catalogueId = _useState16[0],
      setCatalogueId = _useState16[1];

  var _useState17 = React.useState(),
      _useState18 = _slicedToArray(_useState17, 2),
      userList = _useState18[0],
      setUserList = _useState18[1];

  var _useState19 = React.useState(),
      _useState20 = _slicedToArray(_useState19, 2),
      addModalVisible = _useState20[0],
      setAddModalVisible = _useState20[1];

  var selectAddType = function selectAddType(value, id) {
    setCatalogueId(id);
    findDmPrjRolePage(wikiId).then(function (data) {
      setUserList(data.dataList);
    });

    if (value.key === "document") {
      setChangeTemplateVisible(true);
      setModalTitle("添加文档");
    } else if (value.key === "mindMap") {
      setContentValue({
        nodes: [],
        edges: []
      });
      setAddModalVisible(true);
      setModalTitle("添加脑图");
    } else if (value.key === "category") {
      setAddModalVisible(true);
      setModalTitle("添加目录");
    } // 


    form.setFieldsValue({
      formatType: value.key
    });
  };

  var _useState21 = React.useState([]),
      _useState22 = _slicedToArray(_useState21, 2);
      _useState22[0];
      _useState22[1]; // 树的展开与闭合

  var goDocumentDetail = function goDocumentDetail(item) {
    if (item.model === "document") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/".concat(item.repository.id, "/doc/").concat(item.modelId));
    }

    if (item.model === "mindMap") {
      localStorage.setItem("documentId", item.modelId);
      props.history.push("/index/wikidetail/".concat(item.repository.id, "/mindmap/").concat(item.modelId));
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "repository-survey",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Row__default["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Col__default["default"], {
    xl: {
      span: 18,
      offset: 3
    },
    lg: {
      span: 18,
      offset: 3
    },
    md: {
      span: 20,
      offset: 2
    },
    className: "repository-col",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 21
    }
  }, repositoryInfo && /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 47
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-top",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "top-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "top-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-zhishi",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 45
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "top-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 45
    }
  }, repositoryInfo === null || repositoryInfo === void 0 ? void 0 : repositoryInfo.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 45
    }
  }, repositoryInfo.desc ? repositoryInfo.desc : "暂无介绍"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "top-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: function overlay() {
      return addMenu(null);
    },
    placement: "bottomLeft",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 41
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "top-add-botton",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 45
    }
  }, "\u6DFB\u52A0")), /*#__PURE__*/React__default["default"].createElement(button["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 41
    }
  }, "\u5206\u4EAB")))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "document-box-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 262,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 33
    }
  }, "\u6700\u8FD1\u67E5\u770B\u7684\u6587\u6863")), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 29
    }
  }, recentViewDocumentList && recentViewDocumentList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-list-item",
      key: item.id,
      onClick: function onClick() {
        return goDocumentDetail(item);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 268,
        columnNumber: 48
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "document-name",
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 269,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "document-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 270,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-paihang",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 53
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 273,
        columnNumber: 49
      }
    }, item.name)), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 276,
        columnNumber: 45
      }
    }, item.repository.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 277,
        columnNumber: 45
      }
    }, item.master.name), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 278,
        columnNumber: 45
      }
    }, item.updateTime), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        flex: 1
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 279,
        columnNumber: 45
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 280,
        columnNumber: 49
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-point",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 281,
        columnNumber: 53
      }
    }))));
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "home-dynamic",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 289,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-box-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 290,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 33
    }
  }, "\u76F8\u5173\u52A8\u6001"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "more",
    onClick: function onClick() {
      props.history.push("/index/wikidetail/".concat(wikiId, "/dynamicList"));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "aria-hidden": "true",
    className: "svg-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 293,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-rightjump",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 294,
      columnNumber: 41
    }
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dynamic-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 298,
      columnNumber: 29
    }
  }, opLogList.length > 0 ? opLogList.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: item.data
      },
      className: "dynamic-item",
      key: item.id,
      onClick: function onClick() {
        return goOpLogDetail(item.link);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 301,
        columnNumber: 48
      }
    });
  }) : /*#__PURE__*/React__default["default"].createElement(_Empty__default["default"], {
    image: "/images/nodata.png",
    description: "\u6682\u65F6\u6CA1\u6709\u52A8\u6001~",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 309,
      columnNumber: 41
    }
  })))), /*#__PURE__*/React__default["default"].createElement(addLog["default"], _extends({
    setAddModalVisible: setAddModalVisible,
    addModalVisible: addModalVisible,
    setWikiCatalogueList: setWikiCatalogueList,
    form: form,
    catalogueId: catalogueId,
    contentValue: contentValue,
    setSelectKey: setSelectKey,
    userList: userList,
    modalTitle: modalTitle
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 315,
      columnNumber: 21
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
      lineNumber: 327,
      columnNumber: 21
    }
  }))));
};

var survey = reactRouter.withRouter(mobxReact.inject("surveyStore", "WikiCatalogueStore", "homeStore")(mobxReact.observer(Survey)));

exports["default"] = survey;
