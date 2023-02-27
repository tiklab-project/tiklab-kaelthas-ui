'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('antd/es/dropdown/style/css');
var _Dropdown = require('antd/es/dropdown');
require('antd/es/menu/style/css');
var _Menu = require('antd/es/menu');
require('antd/es/form/style/css');
var _Form = require('antd/es/form');
require('antd/es/layout/style/css');
var _Layout = require('antd/es/layout');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var mobxReact = require('mobx-react');
var reactI18next = require('react-i18next');
var addLog = require('./addLog.js');
var changeWikiModal = require('./changeWikiModal.js');
var moveLogList = require('./moveLogList.js');
var templateList = require('./templateList.js');
var tiklabCoreUi = require('tiklab-core-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(_Dropdown);
var _Menu__default = /*#__PURE__*/_interopDefaultLegacy(_Menu);
var _Form__default = /*#__PURE__*/_interopDefaultLegacy(_Form);
var _Layout__default = /*#__PURE__*/_interopDefaultLegacy(_Layout);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/common/components/wikiDetailAside.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Sider = _Layout__default["default"].Sider;

var WikideAside = function WikideAside(props) {
  // 解析props
  var _Form$useForm = _Form__default["default"].useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var searchwiki = props.searchwiki,
      wiki = props.wiki,
      wikilist = props.wikilist,
      WikiCatalogueStore = props.WikiCatalogueStore; //语言包

  var _useTranslation = reactI18next.useTranslation();
      _useTranslation.t;

  var findWikiCatalogue = WikiCatalogueStore.findWikiCatalogue,
      updateWikiCatalogue = WikiCatalogueStore.updateWikiCatalogue,
      deleteWikiLog = WikiCatalogueStore.deleteWikiLog,
      updateDocument = WikiCatalogueStore.updateDocument,
      deleteDocument = WikiCatalogueStore.deleteDocument,
      findDmPrjRolePage = WikiCatalogueStore.findDmPrjRolePage,
      wikiCatalogueList = WikiCatalogueStore.wikiCatalogueList,
      setWikiCatalogueList = WikiCatalogueStore.setWikiCatalogueList,
      createDocumentRecent = WikiCatalogueStore.createDocumentRecent; // 当前选中目录id

  var id = props.location.pathname.split("/")[5];

  var _useState = React.useState(id),
      _useState2 = _slicedToArray(_useState, 2),
      selectKey = _useState2[0],
      setSelectKey = _useState2[1];

  var _useState3 = React.useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isShowText = _useState4[0];
      _useState4[1];

  var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      changeWikiVisible = _useState6[0],
      setChangeWikiVisible = _useState6[1];

  var wikiId = props.match.params.wikiId;

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isHover = _useState8[0],
      setIsHover = _useState8[1];

  var _useState9 = React.useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      changeTemplateVisible = _useState10[0],
      setChangeTemplateVisible = _useState10[1];

  var _useState11 = React.useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      templateId = _useState12[0],
      setTemplateId = _useState12[1];

  var _useState13 = React.useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      modalTitle = _useState14[0],
      setModalTitle = _useState14[1];

  var userId = tiklabCoreUi.getUser().userId; // 模板内容

  var _useState15 = React.useState(),
      _useState16 = _slicedToArray(_useState15, 2),
      contentValue = _useState16[0],
      setContentValue = _useState16[1];

  React.useEffect(function () {
    findWikiCatalogue(wikiId).then(function (data) {
      setWikiCatalogueList(data);
      console.log(wikiCatalogueList);
    });
  }, []);
  React.useEffect(function () {
    // 初次进入激活导航菜单
    if (props.location.pathname.split("/")[4] === "survey") {
      setSelectKey("survey");
    } else {
      setSelectKey(id);
    }

    return;
  }, [id]); //点击左侧菜单

  var selectKeyFun = function selectKeyFun(item) {
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


  var addMenu = function addMenu(id) {
    return /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
      onClick: function onClick(value) {
        return selectAddType(value, id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "category",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u76EE\u5F55"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "document",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u9875\u9762"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "mindMap",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 116,
        columnNumber: 13
      }
    }, "\u6DFB\u52A0\u8111\u56FE"));
  }; // 编辑


  var editMenu = function editMenu(id, formatType, fid) {
    return /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"], {
      onClick: function onClick(value) {
        return editCatelogue(value, id, formatType, fid);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "edit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 13
      }
    }, "\u91CD\u547D\u540D"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "delete",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 128,
        columnNumber: 13
      }
    }, "\u5220\u9664"), /*#__PURE__*/React__default["default"].createElement(_Menu__default["default"].Item, {
      key: "move",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131,
        columnNumber: 13
      }
    }, "\u79FB\u52A8"));
  }; //添加目录,文档


  var _useState17 = React.useState(),
      _useState18 = _slicedToArray(_useState17, 2),
      catalogueId = _useState18[0],
      setCatalogueId = _useState18[1];

  var _useState19 = React.useState(),
      _useState20 = _slicedToArray(_useState19, 2),
      userList = _useState20[0],
      setUserList = _useState20[1];

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
  }; //更新目录


  var inputRef = React__default["default"].useRef(null);

  var _useState21 = React.useState(),
      _useState22 = _slicedToArray(_useState21, 2),
      isRename = _useState22[0],
      setIsRename = _useState22[1];

  var editCatelogue = function editCatelogue(value, id, formatType, fid) {
    value.domEvent.stopPropagation();

    if (value.key === "edit") {
      setIsRename(id);
    }

    if (value.key === "delete") {
      if (formatType === "category") {
        deleteWikiLog(id).then(function (data) {
          if (data.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
          }
        });
      }

      if (formatType === "document") {
        deleteDocument(id).then(function (data) {
          if (data.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
          }
        });
      }
    }

    if (value.key === "move") {
      setMoveLogListVisible(true);
      setMoveCategoryId(id);
      setFormatType(formatType);
      setMoveCategoryParentId(fid);
    }
  };

  React.useEffect(function () {
    if (isRename) {
      inputRef.current.autofocus = true;
      var range = getSelection();
      range.selectAllChildren(inputRef.current);
      range.collapseToEnd();
    }
  }, [isRename]);

  var reName = function reName(value, id, formatType) {
    var name = value.target.innerText;
    var params = {
      name: name,
      id: id
    };

    if (formatType === "category") {
      updateWikiCatalogue(params).then(function (data) {
        if (data.code === 0) {
          setIsRename(null);
        }
      });
    }

    if (formatType === "document") {
      updateDocument(params).then(function (data) {
        if (data.code === 0) {
          setIsRename(null);
        }
      });
    }
  };

  var _useState23 = React.useState(),
      _useState24 = _slicedToArray(_useState23, 2),
      addModalVisible = _useState24[0],
      setAddModalVisible = _useState24[1]; //折叠菜单


  var _useState25 = React.useState([0]),
      _useState26 = _slicedToArray(_useState25, 2),
      expandedTree = _useState26[0],
      setExpandedTree = _useState26[1]; // 树的展开与闭合


  var isExpandedTree = function isExpandedTree(key) {
    return expandedTree.some(function (item) {
      return item === key;
    });
  };

  var setOpenOrClose = function setOpenOrClose(key) {
    if (isExpandedTree(key)) {
      setExpandedTree(expandedTree.filter(function (item) {
        return item !== key;
      }));
    } else {
      setExpandedTree(expandedTree.concat(key));
    }
  };

  var _useState27 = React.useState(),
      _useState28 = _slicedToArray(_useState27, 2),
      moveCategoryId = _useState28[0],
      setMoveCategoryId = _useState28[1];

  var _useState29 = React.useState(),
      _useState30 = _slicedToArray(_useState29, 2),
      moveCategoryParentId = _useState30[0],
      setMoveCategoryParentId = _useState30[1];

  var _useState31 = React.useState(),
      _useState32 = _slicedToArray(_useState31, 2),
      formatType = _useState32[0],
      setFormatType = _useState32[1];

  var _useState33 = React.useState(false),
      _useState34 = _slicedToArray(_useState33, 2),
      moveLogListVisible = _useState34[0],
      setMoveLogListVisible = _useState34[1]; // 拖放效果


  var moveWorkItem = function moveWorkItem() {
    var dragEvent = event.target;
    dragEvent.style.background = "#d0e5f2";
  };

  var moveStart = function moveStart(moveId, fId, formatType) {
    event.stopPropagation();
    var dragEvent = event.target;
    dragEvent.style.background = "#d0e5f2"; // 被拖拽盒子的起始id

    setMoveCategoryId(moveId);
    setMoveCategoryParentId(fId);
    setFormatType(formatType);
  }; //必须有onDragOver才能触发onDrop


  var dragover = function dragover() {
    event.preventDefault();
  };

  var moveEnd = function moveEnd() {
    var dragEvent = event.target;
    dragEvent.style.background = "#f7f8fa";
  };

  var changeLog = function changeLog(targetId) {
    event.preventDefault();
    var value;

    if (targetId && targetId !== moveCategoryParentId) {
      if (formatType === "category") {
        if (targetId) {
          value = {
            parentCategory: {
              id: targetId
            },
            id: moveCategoryId
          };
        } else {
          value = {
            id: moveCategoryId
          };
        }

        updateWikiCatalogue(value).then(function (res) {
          if (res.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
          }
        });
      } else {
        if (targetId) {
          value = {
            category: {
              id: targetId
            },
            id: moveCategoryId
          };
        } else {
          value = {
            id: moveCategoryId
          };
        }

        updateDocument(value).then(function (res) {
          if (res.code === 0) {
            findWikiCatalogue(wikiId).then(function (data) {
              setWikiCatalogueList(data);
            });
          }
        });
      }
    }
  };

  var logTree = function logTree(item, levels, faid) {
    var newLevels = 0;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(isExpandedTree(faid) ? "" : 'wiki-menu-submenu-hidden'),
      key: item.id,
      onDrop: function onDrop() {
        return changeLog(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 324,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-menu-submenu ".concat(item.id === selectKey ? "wiki-menu-select" : "", " "),
      key: item.id,
      onClick: function onClick() {
        return selectKeyFun(item);
      },
      onMouseOver: function onMouseOver() {
        return setIsHover(item.id);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHover(null);
      },
      onDrag: function onDrag() {
        return moveWorkItem();
      },
      onDragOver: dragover,
      draggable: "true",
      onDragStart: function onDragStart() {
        return moveStart(item.id, faid, item.formatType);
      },
      onDragEnd: function onDragEnd() {
        return moveEnd();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 328,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        paddingLeft: levels * 21 + 24
      },
      className: "wiki-menu-submenu-left",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 339,
        columnNumber: 17
      }
    }, item.children && item.children.length > 0 || item.documents && item.documents.length > 0 ? isExpandedTree(item.id) ? /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      onClick: function onClick() {
        return setOpenOrClose(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 342,
        columnNumber: 55
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-right",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 343,
        columnNumber: 33
      }
    })) : /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      onClick: function onClick() {
        return setOpenOrClose(item.id);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 345,
        columnNumber: 33
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-down",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 346,
        columnNumber: 37
      }
    })) : /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 347,
        columnNumber: 42
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-circle",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 348,
        columnNumber: 33
      }
    })), /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 351,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-folder",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 352,
        columnNumber: 25
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "".concat(isRename === item.id ? "wiki-input" : ""),
      contentEditable: isRename === item.id ? true : false,
      suppressContentEditableWarning: true,
      onBlur: function onBlur(value) {
        return reName(value, item.id, item.formatType);
      },
      ref: isRename === item.id ? inputRef : null,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 354,
        columnNumber: 21
      }
    }, item.name, " ")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(isHover === item.id ? "icon-show" : "icon-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 361,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
      overlay: function overlay() {
        return addMenu(item.id);
      },
      placement: "bottomLeft",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 362,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 363,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-plusBlue",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 364,
        columnNumber: 29
      }
    }))), /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
      overlay: function overlay() {
        return editMenu(item.id, item.formatType, faid);
      },
      placement: "bottomLeft",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 367,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 368,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-moreBlue",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 369,
        columnNumber: 29
      }
    }))))), item.children && item.children.length > 0 && (newLevels = levels + 1) && item.children.map(function (childItem) {
      return logTree(childItem, newLevels, item.id);
    }), item.documents && item.documents.length > 0 && (newLevels = levels + 1) && item.documents.map(function (childItem) {
      return fileTree(childItem, newLevels, item.id);
    }));
  };

  var fileTree = function fileTree(item, levels, faid) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'),
      key: item.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 389,
        columnNumber: 16
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "wiki-menu-submenu ".concat(item.id === selectKey ? "wiki-menu-select" : "", " "),
      key: item.id,
      onClick: function onClick() {
        return selectKeyFun(item);
      },
      onMouseOver: function onMouseOver() {
        return setIsHover(item.id);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHover(null);
      },
      onDragOver: dragover,
      onDrag: function onDrag() {
        return moveWorkItem();
      },
      draggable: "true",
      onDragStart: function onDragStart() {
        return moveStart(item.id, faid, item.formatType);
      },
      onDragEnd: function onDragEnd() {
        return moveEnd();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 392,
        columnNumber: 13
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        paddingLeft: levels * 21 + 24
      },
      className: "wiki-menu-submenu-left",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 402,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 403,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-circle",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 404,
        columnNumber: 25
      }
    })), item.typeId === "document" && /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 407,
        columnNumber: 55
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-file",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 408,
        columnNumber: 29
      }
    })), item.typeId === "mindMap" && /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 412,
        columnNumber: 54
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-minmap",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 413,
        columnNumber: 29
      }
    })), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "".concat(isRename === item.id ? "wiki-input" : ""),
      contentEditable: isRename === item.id ? true : false,
      suppressContentEditableWarning: true,
      onBlur: function onBlur(value) {
        return reName(value, item.id, item.formatType);
      },
      ref: isRename === item.id ? inputRef : null,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 416,
        columnNumber: 21
      }
    }, item.name, " ")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "".concat(isHover === item.id ? "icon-show" : "icon-hidden"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 423,
        columnNumber: 17
      }
    }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
      overlay: function overlay() {
        return editMenu(item.id, item.formatType, faid);
      },
      placement: "bottomLeft",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 424,
        columnNumber: 21
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      className: "img-icon",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 425,
        columnNumber: 25
      }
    }, /*#__PURE__*/React__default["default"].createElement("use", {
      xlinkHref: "#icon-moreBlue",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 426,
        columnNumber: 29
      }
    }))))));
  };

  return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 434,
      columnNumber: 9
    }
  }, /*#__PURE__*/React__default["default"].createElement(Sider, {
    trigger: null,
    collapsible: true,
    collapsed: !isShowText,
    collapsedWidth: "50",
    width: "250",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 435,
      columnNumber: 13
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-aside ".concat(isShowText ? "" : "wiki-icon"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 436,
      columnNumber: 17
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-title title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "wiki-title-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438,
      columnNumber: 25
    }
  }, wiki !== null && wiki !== void 0 && wiki.iconUrl ? /*#__PURE__*/React__default["default"].createElement("img", {
    src: '/images/' + (wiki === null || wiki === void 0 ? void 0 : wiki.iconUrl),
    alt: "",
    className: "img-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 441,
      columnNumber: 37
    }
  }) : /*#__PURE__*/React__default["default"].createElement("img", {
    src: 'images/repository1.png',
    alt: "",
    className: "img-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 447,
      columnNumber: 37
    }
  }), wiki === null || wiki === void 0 ? void 0 : wiki.name), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-toggleCollapsed",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 458,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement(changeWikiModal["default"], {
    searchwiki: searchwiki,
    wikilist: wikilist,
    changeWikiVisible: changeWikiVisible,
    setChangeWikiVisible: setChangeWikiVisible,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 459,
      columnNumber: 29
    }
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-survey ".concat(selectKey === "survey" ? "wiki-menu-select" : "", " "),
    onClick: function onClick() {
      props.history.push("/index/wikidetail/".concat(wikiId, "/survey"));
      setSelectKey("survey");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "img-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 470,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-home",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 471,
      columnNumber: 29
    }
  })), "\u6982\u51B5"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-menu",
    onDrop: function onDrop() {
      return changeLog("nullString");
    },
    draggable: "true",
    onDragOver: dragover,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 475,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-menu-firstmenu",
    onMouseOver: function onMouseOver() {
      return setIsHover(0);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHover(null);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 476,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-menu-firstmenu-left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 480,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "img-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 492,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-repository",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 493,
      columnNumber: 37
    }
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 495,
      columnNumber: 33
    }
  }, "\u77E5\u8BC6\u5E93")), /*#__PURE__*/React__default["default"].createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 497,
      columnNumber: 29
    }
  }, /*#__PURE__*/React__default["default"].createElement(_Dropdown__default["default"], {
    overlay: function overlay() {
      return addMenu(null);
    },
    placement: "bottomLeft",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 498,
      columnNumber: 33
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "img-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 499,
      columnNumber: 37
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-plusBlue",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 500,
      columnNumber: 41
    }
  }))))), wikiCatalogueList && wikiCatalogueList.map(function (item) {
    if (item.formatType === "document") {
      return fileTree(item, 0, 0);
    }

    if (item.formatType === "category") {
      return logTree(item, 0, 0);
    }
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wiki-setting-menu",
    onClick: function onClick() {
      return props.history.push("/index/wikiSet/".concat(wikiId, "/basicInfo"));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 518,
      columnNumber: 21
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "img-icon",
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 520,
      columnNumber: 25
    }
  }, /*#__PURE__*/React__default["default"].createElement("use", {
    xlinkHref: "#icon-set",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 521,
      columnNumber: 29
    }
  })), "\u8BBE\u7F6E"))), /*#__PURE__*/React__default["default"].createElement(addLog["default"], _extends({
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
      lineNumber: 529,
      columnNumber: 13
    }
  })), /*#__PURE__*/React__default["default"].createElement(moveLogList["default"], {
    wikiCatalogueList: wikiCatalogueList,
    moveLogListVisible: moveLogListVisible,
    setWikiCatalogueList: setWikiCatalogueList,
    setMoveLogListVisible: setMoveLogListVisible,
    findWikiCatalogue: findWikiCatalogue,
    updateDocument: updateDocument,
    formatType: formatType,
    moveCategoryId: moveCategoryId,
    updateWikiCatalogue: updateWikiCatalogue,
    moveCategoryParentId: moveCategoryParentId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 13
    }
  }), /*#__PURE__*/React__default["default"].createElement(templateList["default"], {
    changeTemplateVisible: changeTemplateVisible,
    setChangeTemplateVisible: setChangeTemplateVisible,
    templateId: templateId,
    setTemplateId: setTemplateId,
    setAddModalVisible: setAddModalVisible,
    contentValue: contentValue,
    setContentValue: setContentValue,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 553,
      columnNumber: 13
    }
  }));
};

var WikideAside$1 = reactRouterDom.withRouter(mobxReact.inject("wikiDetailStore", "WikiCatalogueStore")(mobxReact.observer(WikideAside)));

exports["default"] = WikideAside$1;
