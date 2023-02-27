'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styleInject_es = require('../../../../node_modules/style-inject/dist/style-inject.es.js');

var css_248z = ".dynamic-row {\n  height: calc(100vh - 48px);\n  background-color: var(--tiklab-gray-600);\n  overflow: auto;\n}\n.dynamic-row .dynamic-row {\n  background-color: #fff;\n}\n\n.dynamic-list-page {\n  background: #fff;\n  height: 100%;\n  overflow: auto;\n}\n.dynamic-list-page .dynamic-list-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  background: #fff;\n  padding: 15px 15px 0;\n}\n.dynamic-list-page .dynamic-list {\n  padding: 0 15px 15px;\n}\n.dynamic-list-page .dynamic-filter {\n  padding: 15px 0;\n  width: 100%;\n  display: flex;\n  gap: 20px;\n}\n.dynamic-list-page .dynamic-filter .dynamic-list-item {\n  padding-bottom: 10px;\n}";
styleInject_es["default"](css_248z);

exports["default"] = css_248z;
