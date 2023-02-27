'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var WikiDetailStore = (_class = /*#__PURE__*/_createClass(function WikiDetailStore() {
  _classCallCheck(this, WikiDetailStore);

  _initializerDefineProperty(this, "wikiId", _descriptor, this);

  _initializerDefineProperty(this, "sprintId", _descriptor2, this);

  _initializerDefineProperty(this, "setWikiId", _descriptor3, this);

  _initializerDefineProperty(this, "setSprintId", _descriptor4, this);
}), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "wikiId", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "sprintId", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "";
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "setWikiId", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (id) {
      _this.wikiId = id;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "setSprintId", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (id) {
      _this2.sprintId = id;
    };
  }
})), _class);
var WIKIDETAIL_STORE = "wikiDetailStore";

exports.WIKIDETAIL_STORE = WIKIDETAIL_STORE;
exports.WikiDetailStore = WikiDetailStore;
