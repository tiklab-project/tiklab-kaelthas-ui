'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var xflow = require('@antv/xflow');
var node1 = require('./node1.js');
var node2 = require('./node2.js');
var edge1 = require('./edge1.js');
var edge2 = require('./edge2.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/wiki/brainMap/components/config-graph.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var useGraphConfig = xflow.createGraphConfig(function (config) {
  /** 设置XFlow画布配置项 */
  config.setX6Config({
    /** 画布网格 */
    grid: true,

    /** 画布缩放等级 */
    scaling: {
      min: 0.2,
      max: 3
    }
    /** 画布滚轮缩放 */
    // mousewheel: {
    //   enabled: true,
    //   /** 将鼠标位置作为中心缩放 */
    //   zoomAtMousePosition: true,
    // },

  });
  /** 设置XFlow画布需要渲染的React节点/边 */

  config.setNodeRender('NODE1', function (props) {
    return /*#__PURE__*/React__default["default"].createElement(node1["default"], _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 42
      }
    }));
  });
  config.setNodeRender('NODE2', node2["default"]);
  config.setEdgeRender('EDGE1', function (props) {
    return /*#__PURE__*/React__default["default"].createElement(edge1["default"], _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 42
      }
    }));
  });
  config.setEdgeRender('EDGE2', function (props) {
    return /*#__PURE__*/React__default["default"].createElement(edge2["default"], _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 42
      }
    }));
  });
});

exports.useGraphConfig = useGraphConfig;
