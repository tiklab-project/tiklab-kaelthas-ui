'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var xflow = require('@antv/xflow');

var useGraphConfig = xflow.createGraphConfig(function (config) {
  /** 设置XFlow画布配置项 */
  config.setX6Config({
    /** 画布网格 */
    grid: true,
    height: 400,

    /** 画布缩放等级 */
    scaling: {
      min: 0.2,
      max: 3
    }
  });
});

exports.useGraphConfig = useGraphConfig;
