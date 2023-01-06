'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var SyncComponent = require('./common/lazy/SyncComponent.js');
var reactRouterDom = require('react-router-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _jsxFileName = "/Users/yuanjiexuan/Desktop/bate/project-web/tiklab-kanass-ui/tiklab-kanass-ui/src/routerSaas.js";
var Login = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/login/login'));
    });
  });
});
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
      resolve(require('./modules/home/components/portal'));
    });
  });
});
var WorkBench = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/home/components/workBench"));
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
      resolve(require('./modules/wiki/brainMapFlow/components/brainMapFlowExamine'));
    });
  });
});
var DocumentMindMapEdit = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/wiki/brainMapFlow/components/brainMapFlowEdit'));
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
var DocumentEdit = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/wiki/common/components/documentEdit"));
    });
  });
});
var DocumnetExamine = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/wiki/common/components/documnetExamine"));
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
      resolve(require('./modules/sysmgr/common/containers/setting'));
    });
  });
}); // 导入外部数据

var WikiPlugin = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/plugin/wikiPlugin.js'));
    });
  });
});
var Oragn = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/sysmgr/common/containers/organ"));
    });
  });
});
var OrgaContent = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/orga/orga'));
    });
  });
});
var OrgaUser = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/orga/user'));
    });
  });
});
var WikiDirectory = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/orga/wikiDirectory'));
    });
  });
});
var LoadData = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/loadData/components/loadData'));
    });
  });
});
var WikiUserMessage = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/wikiUserMessage'));
    });
  });
});
var WikiMessageSendType = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/wikiMessageSendType'));
    });
  });
});
var WikiMessageType = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/wikiMessageType'));
    });
  });
});
var WikiMessageTemplate = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/wikiMessageTemplate'));
    });
  });
});
var WikiMessageManagement = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/wikiMessageManagement'));
    });
  });
});
var TaskListContent = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/todo/taskList.js'));
    });
  });
});
var TodoTempListContent = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/todo/todoTempList'));
    });
  });
});
var MyTodoTaskContent = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/todo/myTodoTask'));
    });
  });
});
var LogList = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/log/log.js'));
    });
  });
});
var LogTemplateList = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/log/myLogTemplateList'));
    });
  });
});
var routes = [{
  path: "/login",
  exact: true,
  component: Login
}, {
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
    path: "/index/workBench",
    exact: true,
    component: WorkBench
  }, {
    path: "/index/userMessage",
    exact: true,
    component: WikiUserMessage,
    key: 'userMessage'
  }, {
    path: "/index/wikidetail",
    component: WikiDetail,
    routes: [{
      path: "/index/wikidetail/doc/:id",
      component: DocumnetExamine
    }, {
      path: "/index/wikidetail/docEdit/:id",
      component: DocumentEdit
    }, {
      path: "/index/wikidetail/folder/:id",
      component: LogDetail
    }, {
      path: "/index/wikidetail/mindmap/:id",
      component: BrainMap
    }, {
      path: "/index/wikidetail/mindmapEdit/:id",
      component: DocumentMindMapEdit
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
    }, {
      path: "/index/sysmgr/template",
      component: Template,
      exact: true
    }, {
      path: "/index/sysmgr/plugin",
      component: WikiPlugin,
      exact: true
    }, {
      path: "/index/sysmgr/messageManagement",
      component: WikiMessageManagement,
      exact: true
    }, {
      path: "/index/sysmgr/messageTemplate",
      component: WikiMessageTemplate,
      exact: true
    }, {
      path: "/index/sysmgr/messageType",
      component: WikiMessageType,
      exact: true
    }, {
      path: "/index/sysmgr/messageSendType",
      component: WikiMessageSendType,
      exact: true
    }, {
      path: "/index/sysmgr/taskList",
      component: TaskListContent,
      exact: true
    }, {
      path: "/index/sysmgr/myTodoTask",
      component: MyTodoTaskContent,
      exact: true
    }, {
      path: "/index/sysmgr/todoTempList",
      component: TodoTempListContent,
      exact: true
    }, {
      path: "/index/sysmgr/logList",
      component: LogList,
      exact: true
    }, {
      path: "/index/sysmgr/myLogTemplateList",
      component: LogTemplateList,
      exact: true
    }]
  }, {
    path: "/index/organ",
    component: Oragn,
    key: 'organ',
    routes: [{
      path: "/index/organ/organ",
      component: OrgaContent,
      exact: true
    }, {
      path: "/index/organ/user",
      component: OrgaUser,
      exact: true
    }, {
      path: "/index/organ/directory",
      component: WikiDirectory,
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
        lineNumber: 283,
        columnNumber: 26
      }
    });
  },
  exact: true
}];

exports["default"] = routes;
