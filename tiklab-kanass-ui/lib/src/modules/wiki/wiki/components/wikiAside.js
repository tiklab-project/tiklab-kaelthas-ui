'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var icons = require('@ant-design/icons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/wiki/components/wikiAside.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var wikirouter = [{
  title: '所有知识库',
  key: '1',
  icon: "zhishi"
}, {
  title: '最近浏览的知识库',
  key: '2',
  icon: "zhishi"
}, {
  title: '我创建的知识库',
  key: '3',
  icon: "zhishi"
}, {
  title: '我参与的知识库',
  key: '4',
  icon: "zhishi"
}, {
  title: '我关注的知识库',
  key: '5',
  icon: "zhishi"
}];

var Wikiaside = /*#__PURE__*/function (_React$Component) {
  _inherits(Wikiaside, _React$Component);

  var _super = _createSuper(Wikiaside);

  function Wikiaside(props) {
    var _this;

    _classCallCheck(this, Wikiaside);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "hiddenMenu", function () {
      setTimeout(function () {
        _this.setState({
          showMenu: !_this.state.showMenu
        });
      }, 300);
    });

    _defineProperty(_assertThisInitialized(_this), "selectMenu", function (e) {
      var menu = e.target.parentNode.childNodes;
      menu.forEach(function (item) {
        item.classList.remove("wiki-menu-select");
      });
      e.target.classList.add("wiki-menu-select");
    });

    _this.state = {
      showMenu: true
    };
    return _this;
  }

  _createClass(Wikiaside, [{
    key: "selectKey",
    value: // 
    function selectKey(key) {// WikiStore.searchwikiList(key)
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var showMenu = this.state.showMenu;
      return /*#__PURE__*/React__default["default"].createElement(React.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 13
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "wiki-aside",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 17
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "wiki-title",
        onClick: this.hiddenMenu,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 21
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 25
        }
      }, /*#__PURE__*/React__default["default"].createElement("svg", {
        className: "icon",
        "aria-hidden": "true",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 29
        }
      }, /*#__PURE__*/React__default["default"].createElement("use", {
        xlinkHref: "#icon-zhishi",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 33
        }
      })), " \u77E5\u8BC6\u5E93"), /*#__PURE__*/React__default["default"].createElement(icons.DownOutlined, {
        style: {
          fontSize: "10px"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 31
        }
      })), /*#__PURE__*/React__default["default"].createElement("ul", {
        className: "wiki-menu ".concat(!showMenu ? "hidden-menu" : ""),
        onClick: this.selectMenu,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81,
          columnNumber: 21
        }
      }, wikirouter && wikirouter.map(function (Item) {
        return /*#__PURE__*/React__default["default"].createElement("li", {
          className: "wiki-menu-submenu",
          key: Item.key,
          onClick: function onClick() {
            return _this2.selectKey(Item.key);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 40
          }
        }, /*#__PURE__*/React__default["default"].createElement("svg", {
          className: "icon",
          "aria-hidden": "true",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 85,
            columnNumber: 41
          }
        }, /*#__PURE__*/React__default["default"].createElement("use", {
          xlinkHref: "#icon-".concat(Item.icon),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86,
            columnNumber: 45
          }
        })), Item.title);
      }))));
    }
  }]);

  return Wikiaside;
}(React__default["default"].Component);

exports["default"] = Wikiaside;
