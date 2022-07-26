'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styleInject_es = require('../../../../node_modules/style-inject/dist/style-inject.es.js');

var css_248z = ".wiki-template {\n  background-color: #fff;\n  height: 100%;\n  padding: 10px;\n}\n.wiki-template .template-box {\n  display: grid;\n  justify-content: space-between;\n  grid-template-columns: repeat(auto-fill, 250px);\n}\n.wiki-template .template-box .template-item {\n  position: relative;\n  min-width: 250px;\n  max-width: 250px;\n  height: 125px;\n  border-radius: 10px;\n  background-color: rgb(255, 255, 255);\n  padding: 18px;\n  cursor: pointer;\n  box-shadow: rgb(179, 186, 197) 0px 0px 1px 0px, rgb(193, 199, 208) 0px 1px 1px 0px;\n  background-position: center center;\n  background-size: auto 100%;\n  background: linear-gradient(to left top, #ECF4F7, #F5F0F6 50%, #F4F5F0);\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n.wiki-template .template-box .template-item .icon {\n  width: 40px;\n  height: 40px;\n}\n.wiki-template .template-box .template-item .title {\n  margin-top: 10px;\n  font-size: 18px;\n  font-weight: 600;\n}\n.wiki-template .template-box .template-item .item-shade {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(158, 162, 167, 0.7);\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: none;\n  justify-content: space-around;\n  align-items: center;\n  font-weight: 600;\n  border-radius: 10px;\n}\n.wiki-template .template-box .template-item .item-hidden {\n  display: none;\n}\n.wiki-template .template-box .template-item .item-show {\n  display: flex;\n  -webkit-animation-name: example;\n          animation-name: example;\n  -webkit-animation-duration: 300ms;\n          animation-duration: 300ms;\n}\n@-webkit-keyframes example {\n  from {\n    height: 0px;\n  }\n  to {\n    height: 125px;\n  }\n}\n@keyframes example {\n  from {\n    height: 0px;\n  }\n  to {\n    height: 125px;\n  }\n}";
styleInject_es["default"](css_248z);

exports["default"] = css_248z;
