'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var xflow = require('@antv/xflow');
var icons = require('@ant-design/icons');
require('react');

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID';
var TOOLBAR_ITEMS = {
  BACK_NODE: xflow.XFlowNodeCommands.BACK_NODE.id,
  FRONT_NODE: xflow.XFlowNodeCommands.FRONT_NODE.id,
  SAVE_GRAPH_DATA: xflow.XFlowGraphCommands.SAVE_GRAPH_DATA.id,
  REDO_CMD: "".concat(xflow.XFlowGraphCommands.REDO_CMD.id),
  UNDO_CMD: "".concat(xflow.XFlowGraphCommands.UNDO_CMD.id),
  MULTI_SELECT: "".concat(xflow.XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id),
  ADD_GROUP: "".concat(xflow.XFlowGroupCommands.ADD_GROUP.id),
  DEL_GROUP: "".concat(xflow.XFlowGroupCommands.DEL_GROUP.id),
  COPY: "".concat(xflow.XFlowGraphCommands.GRAPH_COPY.id),
  PASTE: "".concat(xflow.XFlowGraphCommands.GRAPH_PASTE.id)
};

var getDependencies = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(modelService) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return xflow.MODELS.SELECTED_NODES.getModel(modelService);

          case 2:
            _context.t0 = _context.sent;
            _context.next = 5;
            return xflow.MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService);

          case 5:
            _context.t1 = _context.sent;
            return _context.abrupt("return", [_context.t0, _context.t1]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDependencies(_x) {
    return _ref.apply(this, arguments);
  };
}();
/** toolbar依赖的状态 */


var getToolbarState = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(modelService) {
    var _yield$MODELS$GRAPH_E, isMultiSelctionActive, isGroupSelected, isNormalNodesSelected, isUndoable, isRedoable;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return xflow.MODELS.GRAPH_ENABLE_MULTI_SELECT.useValue(modelService);

          case 2:
            _yield$MODELS$GRAPH_E = _context2.sent;
            isMultiSelctionActive = _yield$MODELS$GRAPH_E.isEnable;
            _context2.next = 6;
            return xflow.MODELS.IS_GROUP_SELECTED.useValue(modelService);

          case 6:
            isGroupSelected = _context2.sent;
            _context2.next = 9;
            return xflow.MODELS.IS_NORMAL_NODES_SELECTED.useValue(modelService);

          case 9:
            isNormalNodesSelected = _context2.sent;
            _context2.next = 12;
            return xflow.MODELS.COMMAND_UNDOABLE.useValue(modelService);

          case 12:
            isUndoable = _context2.sent;
            _context2.next = 15;
            return xflow.MODELS.COMMAND_REDOABLE.useValue(modelService);

          case 15:
            isRedoable = _context2.sent;
            return _context2.abrupt("return", {
              isUndoable: isUndoable,
              isRedoable: isRedoable,
              isNodeSelected: isNormalNodesSelected,
              isGroupSelected: isGroupSelected,
              isMultiSelctionActive: isMultiSelctionActive
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getToolbarState(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getToolbarItems = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(state) {
    var toolbarGroup;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            toolbarGroup = [];
            /** FRONT_NODE */

            toolbarGroup.push({
              tooltip: '置前',
              iconName: 'VerticalAlignTopOutlined',
              id: TOOLBAR_ITEMS.FRONT_NODE,
              isEnabled: state.isNodeSelected,
              onClick: function () {
                var _onClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref4) {
                  var commandService, modelService, node;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          commandService = _ref4.commandService, modelService = _ref4.modelService;
                          _context3.next = 3;
                          return xflow.MODELS.SELECTED_NODE.useValue(modelService);

                        case 3:
                          node = _context3.sent;
                          commandService.executeCommand < NsNodeCmd.FrontNode.IArgs > ({
                            nodeId: node === null || node === void 0 ? void 0 : node.id
                          });

                        case 5:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                function onClick(_x4) {
                  return _onClick.apply(this, arguments);
                }

                return onClick;
              }()
            });
            /** BACK_NODE */

            toolbarGroup.push({
              tooltip: '置后',
              iconName: 'VerticalAlignBottomOutlined',
              id: TOOLBAR_ITEMS.BACK_NODE,
              isEnabled: state.isNodeSelected,
              onClick: function () {
                var _onClick2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref5) {
                  var commandService, modelService, node;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          commandService = _ref5.commandService, modelService = _ref5.modelService;
                          _context4.next = 3;
                          return xflow.MODELS.SELECTED_NODE.useValue(modelService);

                        case 3:
                          node = _context4.sent;
                          commandService.executeCommand < NsNodeCmd.FrontNode.IArgs > ({
                            nodeId: node === null || node === void 0 ? void 0 : node.id
                          });

                        case 5:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                function onClick(_x5) {
                  return _onClick2.apply(this, arguments);
                }

                return onClick;
              }()
            });
            /** 开启框选 */

            toolbarGroup.push({
              tooltip: '开启框选',
              iconName: 'GatewayOutlined',
              id: TOOLBAR_ITEMS.MULTI_SELECT,
              active: state.isMultiSelctionActive,
              onClick: function () {
                var _onClick3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref6) {
                  var commandService;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          commandService = _ref6.commandService;
                          commandService.executeCommand(TOOLBAR_ITEMS.MULTI_SELECT, {});

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                function onClick(_x6) {
                  return _onClick3.apply(this, arguments);
                }

                return onClick;
              }()
            });
            /** 新建群组 */

            toolbarGroup.push({
              tooltip: '新建群组',
              iconName: 'GroupOutlined',
              id: TOOLBAR_ITEMS.ADD_GROUP,
              isEnabled: state.isNodeSelected,
              onClick: function () {
                var _onClick4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref7) {
                  var commandService, modelService, cells, groupChildren;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          commandService = _ref7.commandService, modelService = _ref7.modelService;
                          _context6.next = 3;
                          return xflow.MODELS.SELECTED_CELLS.useValue(modelService);

                        case 3:
                          cells = _context6.sent;
                          groupChildren = cells.map(function (cell) {
                            return cell.id;
                          });
                          commandService.executeComman(TOOLBAR_ITEMS.ADD_GROUP, {
                            nodeConfig: {
                              id: xflow.uuidv4(),
                              renderKey: GROUP_NODE_RENDER_ID,
                              groupChildren: groupChildren,
                              groupCollapsedSize: {
                                width: 200,
                                height: 40
                              },
                              label: '新建群组'
                            }
                          });

                        case 6:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                function onClick(_x7) {
                  return _onClick4.apply(this, arguments);
                }

                return onClick;
              }()
            });
            /** 解散群组 */

            toolbarGroup.push({
              tooltip: '解散群组',
              iconName: 'UngroupOutlined',
              id: TOOLBAR_ITEMS.DEL_GROUP,
              isEnabled: state.isGroupSelected,
              onClick: function () {
                var _onClick5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref8) {
                  var commandService, modelService, cell, nodeConfig;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          commandService = _ref8.commandService, modelService = _ref8.modelService;
                          _context7.next = 3;
                          return xflow.MODELS.SELECTED_NODE.useValue(modelService);

                        case 3:
                          cell = _context7.sent;
                          nodeConfig = cell.getData();
                          commandService.executeCommand(xflow.XFlowGroupCommands.DEL_GROUP.id, {
                            nodeConfig: nodeConfig
                          });

                        case 6:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                function onClick(_x8) {
                  return _onClick5.apply(this, arguments);
                }

                return onClick;
              }()
            });
            /** 保存数据 */

            toolbarGroup.push({
              tooltip: '保存',
              iconName: 'SaveOutlined',
              id: TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
              onClick: function () {
                var _onClick6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref9) {
                  var commandService;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          commandService = _ref9.commandService, _ref9.modelService;
                          commandService.executeCommand(TOOLBAR_ITEMS.SAVE_GRAPH_DATA, {
                            saveGraphDataService: function saveGraphDataService(meta, graphData) {
                              console.log(meta, graphData);
                              return null;
                            }
                          });

                        case 2:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                function onClick(_x9) {
                  return _onClick6.apply(this, arguments);
                }

                return onClick;
              }()
            });
            return _context9.abrupt("return", [{
              name: 'graphData',
              items: toolbarGroup
            }]);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getToolbarItems(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/** 注册icon 类型 */

var registerIcon = function registerIcon() {
  xflow.IconStore.set('SaveOutlined', icons.SaveOutlined);
  xflow.IconStore.set('UndoOutlined', icons.UndoOutlined);
  xflow.IconStore.set('RedoOutlined', icons.RedoOutlined);
  xflow.IconStore.set('VerticalAlignTopOutlined', icons.VerticalAlignTopOutlined);
  xflow.IconStore.set('VerticalAlignBottomOutlined', icons.VerticalAlignBottomOutlined);
  xflow.IconStore.set('GatewayOutlined', icons.GatewayOutlined);
  xflow.IconStore.set('GroupOutlined', icons.GroupOutlined);
  xflow.IconStore.set('UngroupOutlined', icons.UngroupOutlined);
  xflow.IconStore.set('CopyOutlined', icons.CopyOutlined);
  xflow.IconStore.set('SnippetsOutlined', icons.SnippetsOutlined);
};

var useToolbarConfig = xflow.createToolbarConfig(function (toolbarConfig, proxy) {
  console.log(proxy);
  registerIcon();
  /** 生产 toolbar item */

  toolbarConfig.setToolbarModelService( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(toolbarModel, modelService, toDispose) {
      var updateToolbarModel, models, subscriptions;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              // 
              updateToolbarModel = /*#__PURE__*/function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                  var state, toolbarItems;
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return getToolbarState(modelService);

                        case 2:
                          state = _context10.sent;
                          _context10.next = 5;
                          return getToolbarItems(state);

                        case 5:
                          toolbarItems = _context10.sent;
                          toolbarModel.setValue(function (toolbar) {
                            toolbar.mainGroups = toolbarItems;
                          });

                        case 7:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function updateToolbarModel() {
                  return _ref11.apply(this, arguments);
                };
              }();

              _context12.next = 3;
              return getDependencies(modelService);

            case 3:
              models = _context12.sent;
              subscriptions = models.map(function (model) {
                return model.watch( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          updateToolbarModel();

                        case 1:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                })));
              });
              toDispose.pushAll(subscriptions);

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x10, _x11, _x12) {
      return _ref10.apply(this, arguments);
    };
  }());
  toolbarConfig.setCustomToolbarRender( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(IModelService, updateComponent) {
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              console.log(updateComponent);

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x13, _x14) {
      return _ref13.apply(this, arguments);
    };
  }());
});

exports.getToolbarItems = getToolbarItems;
exports.useToolbarConfig = useToolbarConfig;
