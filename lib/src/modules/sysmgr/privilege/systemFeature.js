'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tiklab-privilege-ui/es/system-feature-list/style');
var _SystemFeatureList = require('tiklab-privilege-ui/es/system-feature-list');
var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _SystemFeatureList__default = /*#__PURE__*/_interopDefaultLegacy(_SystemFeatureList);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/modules/sysmgr/privilege/systemFeature.js";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SystemFeature = function SystemFeature(props) {
  return (
    /*#__PURE__*/
    // <div className="test">
    React__default["default"].createElement(_SystemFeatureList__default["default"], _extends({
      bgroup: 'teamwire'
    }, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 13
      }
    })) // </div>

  );
};

var systemFeature = mobxReact.inject("privilegeSystemStore")(mobxReact.observer(SystemFeature));

exports["default"] = systemFeature;
