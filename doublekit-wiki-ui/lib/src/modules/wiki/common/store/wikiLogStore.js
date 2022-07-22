'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var wiliLog = require('../api/wiliLog.js');

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var WikiCatalogueStore = (_class = /*#__PURE__*/_createClass(function WikiCatalogueStore() {
  _classCallCheck(this, WikiCatalogueStore);

  _initializerDefineProperty(this, "wikiCatalogue", _descriptor, this);

  _initializerDefineProperty(this, "wikiCatalogueList", _descriptor2, this);

  _initializerDefineProperty(this, "docDetail", _descriptor3, this);

  _initializerDefineProperty(this, "setWikiCatalogueList", _descriptor4, this);

  _initializerDefineProperty(this, "findWikiCatalogue", _descriptor5, this);

  _initializerDefineProperty(this, "addWikiCatalogue", _descriptor6, this);

  _initializerDefineProperty(this, "updateWikiCatalogue", _descriptor7, this);

  _initializerDefineProperty(this, "deleteWikiLog", _descriptor8, this);

  _initializerDefineProperty(this, "detailWikiLog", _descriptor9, this);

  _initializerDefineProperty(this, "setDocDetail", _descriptor10, this);

  _initializerDefineProperty(this, "addWikiCataDocument", _descriptor11, this);

  _initializerDefineProperty(this, "updateDocument", _descriptor12, this);

  _initializerDefineProperty(this, "findDocument", _descriptor13, this);

  _initializerDefineProperty(this, "deleteDocument", _descriptor14, this);

  _initializerDefineProperty(this, "findCategoryDocument", _descriptor15, this);

  _initializerDefineProperty(this, "findDmPrjRolePage", _descriptor16, this);
}), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "wikiCatalogue", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "wikiCatalogueList", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "docDetail", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [{
      title: "",
      type: "",
      content: ""
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "setWikiCatalogueList", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (value) {
      _this.wikiCatalogueList = value;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "findWikiCatalogue", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        var categoryQuery, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                categoryQuery = {
                  repositoryId: id
                };
                _context.next = 3;
                return wiliLog.FindWikiCatalogue(categoryQuery);

              case 3:
                data = _context.sent;
                return _context.abrupt("return", data.data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "addWikiCatalogue", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
        var data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return wiliLog.AddWikiCatalogue(params);

              case 2:
                data = _context2.sent;
                return _context2.abrupt("return", data);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "updateWikiCatalogue", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return wiliLog.UpdateWikiCatalogue(params);

              case 2:
                data = _context3.sent;
                return _context3.abrupt("return", data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "deleteWikiLog", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
        var param, data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                param = new FormData();
                param.append("id", id);
                _context4.next = 4;
                return wiliLog.DeleteWikiLog(param);

              case 4:
                data = _context4.sent;
                return _context4.abrupt("return", data);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "detailWikiLog", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(params) {
        var data, detailWikiLog;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = new FormData();
                data.append("id", params.id);
                _context5.next = 4;
                return wiliLog.DetailWikiLog(data);

              case 4:
                detailWikiLog = _context5.sent;
                return _context5.abrupt("return", detailWikiLog.data);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "setDocDetail", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (data) {
      _this2.docDetail = _objectSpread(_objectSpread({}, _this2.docDetail), data);
    };
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "addWikiCataDocument", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(params) {
        var data;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return wiliLog.AddWikiCataDocument(params);

              case 2:
                data = _context6.sent;
                return _context6.abrupt("return", data);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }();
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "updateDocument", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(params) {
        var data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return wiliLog.UpdateDocument(params);

              case 2:
                data = _context7.sent;
                return _context7.abrupt("return", data);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x7) {
        return _ref7.apply(this, arguments);
      };
    }();
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "findDocument", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
        var params, data;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = new FormData();
                params.append("id", id);
                _context8.next = 4;
                return wiliLog.FindDocument(params);

              case 4:
                data = _context8.sent;
                return _context8.abrupt("return", data);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x8) {
        return _ref8.apply(this, arguments);
      };
    }();
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "deleteDocument", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id) {
        var param, data;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                param = new FormData();
                param.append("id", id);
                _context9.next = 4;
                return wiliLog.DeleteDocument(param);

              case 4:
                data = _context9.sent;
                return _context9.abrupt("return", data);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x9) {
        return _ref9.apply(this, arguments);
      };
    }();
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "findCategoryDocument", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id) {
        var param, data;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                param = new FormData();
                param.append("id", id);
                _context10.next = 4;
                return wiliLog.FindCategoryDocument(param);

              case 4:
                data = _context10.sent;
                return _context10.abrupt("return", data);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x10) {
        return _ref10.apply(this, arguments);
      };
    }();
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "findDmPrjRolePage", [mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id) {
        var param, data;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                param = {
                  domainId: id,
                  pageParam: {
                    pageSize: 10,
                    currentPage: 1
                  }
                };
                _context11.next = 3;
                return wiliLog.FindDmPrjRolePage(param);

              case 3:
                data = _context11.sent;
                return _context11.abrupt("return", data.data);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x11) {
        return _ref11.apply(this, arguments);
      };
    }();
  }
})), _class);
var WIKICATELOGUE_STORE = "WikiCatalogueStore";

exports.WIKICATELOGUE_STORE = WIKICATELOGUE_STORE;
exports.WikiCatalogueStore = WikiCatalogueStore;