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
      resolve(require('./modules/wiki/wiki/components/wikiList'));
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
var LoadData = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/load-data/loadData'));
    });
  });
}); // 消息

var ProjectMessageSendType = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageSendType'));
    });
  });
});
var ProjectMessageType = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageType'));
    });
  });
});
var ProjectMessageTemplate = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageTemplate'));
    });
  });
});
var ProjectMessageManagement = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageManagement'));
    });
  });
});
var ProjectMessageNotice = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageNotice'));
    });
  });
});
var ProjectMessageNoticeSystem = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/message/projectMessageNoticeSystem'));
    });
  });
});
var Setting = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/common/containers/setting'));
    });
  });
});
var ProjectPlugin = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/plugin/projectPlugin'));
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
var SystemRoleBuilt = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/privilege/systemRoleBuilt'));
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
}); //组织用户

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
var ProjectDirectory = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/sysmgr/user/projectDirectory"));
    });
  });
});
var ProjectUserGroup = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/sysmgr/user/projectUserGroup"));
    });
  });
});
var ProjectSystemUserGroup = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require("./modules/sysmgr/user/projectSystemUserGroup"));
    });
  });
}); //工时

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
var TodoTypeListContent = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/todo/todoTypeList'));
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
var ProjectLogTypeList = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/log/logTypeList'));
    });
  });
});
var LicenceVersion = SyncComponent["default"](function () {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve(require('./modules/sysmgr/version/version'));
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
    path: "/index/setting",
    component: Setting,
    key: 'Setting',
    routes: [{
      path: "/index/setting/organ",
      component: OrgaContent,
      exact: true
    }, {
      path: "/index/setting/template",
      exact: true,
      component: Template,
      key: 'template'
    }, {
      path: "/index/setting/user",
      component: OrgaUser,
      exact: true
    }, {
      path: "/index/setting/directory",
      component: ProjectDirectory,
      exact: true
    }, {
      path: "/index/setting/usergroup",
      component: ProjectUserGroup,
      exact: true
    }, {
      path: "/index/setting/usersystemgroup",
      component: ProjectSystemUserGroup,
      exact: true
    }, // 系统功能管理
    {
      path: "/index/setting/systemFeature",
      component: SystemFeature,
      exact: true
    }, // 系统内置角色管理
    {
      path: "/index/setting/systemRoleBuilt",
      component: SystemRoleBuilt,
      exact: true
    }, // 系统角色管理
    {
      path: "/index/setting/systemRole",
      component: SystemRole,
      exact: true
    }, // 项目功能管理
    {
      path: "/index/setting/projectFeature",
      component: ProjectFeature,
      exact: true
    }, // 项目角色管理
    {
      path: "/index/setting/projectRole",
      component: ProjectRole,
      exact: true
    }, {
      path: "/index/setting/messageManagement",
      component: ProjectMessageManagement,
      exact: true
    }, {
      path: "/index/setting/messageNotice",
      component: ProjectMessageNotice,
      exact: true
    }, {
      path: "/index/setting/messageNoticeSystem",
      component: ProjectMessageNoticeSystem,
      exact: true
    }, {
      path: "/index/setting/messageTemplate",
      component: ProjectMessageTemplate,
      exact: true
    }, {
      path: "/index/setting/messageType",
      component: ProjectMessageType,
      exact: true
    }, {
      path: "/index/setting/messageSendType",
      component: ProjectMessageSendType,
      exact: true
    }, {
      path: "/index/setting/taskList",
      component: TaskListContent,
      exact: true
    }, {
      path: "/index/setting/myTodoTask",
      component: MyTodoTaskContent,
      exact: true
    }, {
      path: "/index/setting/todoTypeTask",
      component: TodoTypeListContent,
      exact: true
    }, {
      path: "/index/setting/todoTempList",
      component: TodoTempListContent,
      exact: true
    }, {
      path: "/index/setting/logList",
      component: LogList,
      exact: true
    }, {
      path: "/index/setting/myLogTemplateList",
      component: LogTemplateList,
      exact: true
    }, {
      path: "/index/setting/projectLogTypeList",
      component: ProjectLogTypeList,
      exact: true
    }, {
      path: "/index/setting/version",
      component: LicenceVersion,
      exact: true
    }, {
      path: "/index/setting/loadData",
      component: LoadData,
      exact: true
    }, {
      path: "/index/setting/plugin",
      component: ProjectPlugin,
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
        lineNumber: 315,
        columnNumber: 26
      }
    });
  },
  exact: true
}];

exports["default"] = routes;
