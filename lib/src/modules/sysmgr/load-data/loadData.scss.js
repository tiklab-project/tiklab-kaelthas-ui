'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styleInject_es = require('../../../../node_modules/style-inject/dist/style-inject.es.js');

var css_248z = "@charset \"UTF-8\";\n.load {\n  padding: 10px;\n}\n\n.load-jira {\n  padding: 20px 0;\n}\n\n.load-box {\n  background-color: #DEEBFF;\n  width: 100%;\n  height: 80px;\n  border-radius: 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 20px;\n}\n\n.load-progress {\n  width: 80%;\n  height: 10px;\n  border-radius: 4px;\n  border: 1px #DEEBFF solid;\n  position: relative;\n  margin-top: 20px;\n}\n.load-progress .load-progressbox {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 30px;\n  height: 10px;\n  border-radius: 4px;\n  background-color: #DEEBFF;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  /* 动画时长1s */\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  /*当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）*/\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  /* 动画次数 无限次 */\n  -webkit-animation-name: animationa;\n          animation-name: animationa;\n  /* 执行动画名称 */\n  -webkit-animation-timing-function: linear;\n          animation-timing-function: linear;\n}\n\n@-webkit-keyframes animationa {\n  /* 修改背景定位 */\n  0% {\n    left: 0;\n  }\n  100% {\n    left: calc(100% - 30px);\n  }\n}\n\n@keyframes animationa {\n  /* 修改背景定位 */\n  0% {\n    left: 0;\n  }\n  100% {\n    left: calc(100% - 30px);\n  }\n}";
styleInject_es["default"](css_248z);

exports["default"] = css_248z;
