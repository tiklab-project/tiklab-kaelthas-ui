'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var search = require('../api/search.js');

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var SearchStore = (_class = /*#__PURE__*/_createClass(function SearchStore() {
  _classCallCheck(this, SearchStore);

  _initializerDefineProperty(this, "searchList", _descriptor, this);

  _initializerDefineProperty(this, "sortList", _descriptor2, this);

  _initializerDefineProperty(this, "keyword", _descriptor3, this);

  _initializerDefineProperty(this, "searchCondition", _descriptor4, this);

  _initializerDefineProperty(this, "setKeyWord", _descriptor5, this);

  _initializerDefineProperty(this, "getSearch", _descriptor6, this);

  _initializerDefineProperty(this, "getSearchSore", _descriptor7, this);

  _initializerDefineProperty(this, "searchForPage", _descriptor8, this);
}), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "searchList", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "sortList", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "keyword", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "searchCondition", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "setKeyWord", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (value) {
      _this.keyword = value;
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "getSearch", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (value) {
      var params = new FormData();

      if (value) {
        params.append('keyword', value);
      } else {
        params.append('keyword', null);
      }

      return new Wikimise(function (resolve, reject) {
        search.Search(params).then(function (response) {
          if (response.code === 0) {
            _this2.searchList = response.data.responseList;
          }

          resolve(response.data);
        })["catch"](function (error) {
          console.log(error);
          reject();
        });
      });
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "getSearchSore", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (value) {
      var params = new FormData();

      if (value) {
        params.append('keyword', value);
      } else {
        params.append('keyword', null);
      }

      return new Wikimise(function (resolve, reject) {
        search.SearchSort(params).then(function (response) {
          if (response.code === 0) {
            _this3.sortList = response.data.responseList;
          }

          resolve(response.data);
        })["catch"](function (error) {
          console.log(error);
          reject();
        });
      });
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "searchForPage", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (value) {
      Object.assign(_this4.searchCondition, _objectSpread({}, value));
      var params = {
        index: _this4.searchCondition.index,
        keyword: _this4.searchCondition.keyword,
        pageCondition: {
          pageSize: 10,
          currentPage: _this4.searchCondition.currentPage,
          lastRecord: _this4.searchCondition.lastRecord
        }
      };
      return new Wikimise(function (resolve, reject) {
        search.SearchForPage(params).then(function (response) {
          console.log(response);

          if (response.code === 0) {
            _this4.searchCondition.total = response.data.totalRecord;
          }

          resolve(response.data);
        })["catch"](function (error) {
          reject(error);
        });
      });
    };
  }
})), _class);
var SEARCH_STORE = "searchStore";

exports.SEARCH_STORE = SEARCH_STORE;
exports.SearchStore = SearchStore;
