'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouterDom = require('react-router-dom');
var SyncComponent = require('./common/lazy/SyncComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/doublekit-wiki-ui/doublekit-wiki-ui/src/routerSaas.js";
var Logout = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/login/logout'));
    });
  });
});
var Home = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/home/components/home'));
    });
  });
});
var Index = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/home/components/portal.js'));
    });
  });
});
var WikiDetail = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/common/components/wikiDetail'));
    });
  });
});
var LogDetail = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/common/components/logDetail'));
    });
  });
});
var BrainMap = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/brainMapFlow/components/brainMapFlowDetail'));
    });
  });
}); // 知识库

var wiki = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/wiki/components/wiki'));
    });
  });
});
var DocumentDetail = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/common/components/documentDetail'));
    });
  });
});
var WikiDomainRole = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/user/wikiDomainRole'));
    });
  });
});
var WikiDomainUser = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/user/wikiDomainUser'));
    });
  });
});
var Template = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/template/components/template'));
    });
  });
}); // 分享文档页面

var ShareDocument = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/share/components/shareDocument'));
    });
  });
}); // 分享文档页面

var PassWord = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/share/components/passWord'));
    });
  });
});
var SystemFeature = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/privilege/systemFeature'));
    });
  });
});
var SystemRole = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/privilege/systemRole'));
    });
  });
});
var ProjectFeature = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/privilege/projectFeature'));
    });
  });
});
var ProjectRole = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/privilege/projectRole'));
    });
  });
});
var Sysmgr = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/common/components/orga'));
    });
  });
}); // 导入外部数据

var LoadData = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/loadData/components/loadData'));
    });
  });
});
var routerSaas = [{
  path: "/logout",
  exact: true,
  component: Logout
}, {
  path: "/shareDocument/:id/:shareId",
  exact: true,
  component: ShareDocument
}, {
  path: "/passWord/:id/:shareId",
  exact: true,
  component: PassWord
}, {
  path: "/index",
  component: Index,
  routes: [{
    path: "/index/home",
    exact: true,
    component: Home,
    key: 'home'
  }, {
    path: "/index/wiki",
    exact: true,
    component: wiki,
    key: 'wiki'
  }, {
    path: "/index/template",
    exact: true,
    component: Template,
    key: 'template'
  }, {
    path: "/index/wikidetail",
    component: WikiDetail,
    routes: [{
      path: "/index/wikidetail/doc/:id",
      component: DocumentDetail
    }, {
      path: "/index/wikidetail/folder/:id",
      component: LogDetail
    }, {
      path: "/index/wikidetail/mindmap/:id",
      component: BrainMap
    }, {
      path: "/index/wikidetail/wikiDomainRole",
      component: WikiDomainRole
    }, {
      path: "/index/wikidetail/wikiDomainUser",
      component: WikiDomainUser
    }, {
      path: "/index/wikidetail/brainMap",
      component: BrainMap
    }]
  }, {
    // 系统功能管理
    path: "/index/sysmgr",
    component: Sysmgr,
    routes: [{
      path: "/index/sysmgr/systemFeature",
      component: SystemFeature,
      exact: true
    }, // 系统角色管理
    {
      path: "/index/sysmgr/systemRole",
      component: SystemRole,
      exact: true
    }, // 项目功能管理
    {
      path: "/index/sysmgr/projectFeature",
      component: ProjectFeature,
      exact: true
    }, // 项目角色管理
    {
      path: "/index/sysmgr/projectRole",
      component: ProjectRole,
      exact: true
    }, // 导入数据
    {
      path: "/index/sysmgr/loadData",
      component: LoadData,
      exact: true
    }]
  }]
}, {
  path: "/",
  component: function component() {
    return /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Redirect, {
      to: "/index/home",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 26
      }
    });
  },
  exact: true
}];

exports["default"] = routerSaas;
