import React from "react";
import AsyncComponent from "./common/lazy/AsyncComponent";
import {Redirect} from "react-router-dom";
import {
    MessageNotice,
    MessageSendType,
    MessageType,
    ProjectMessageNotice,
    DomainMessageNotice,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType
} from "thoughtware-message-ui";
import {ProductAuth, Version} from "thoughtware-licence-ui";
import {ExcludeProductUser, InternalWechatEntry, NotFound} from "thoughtware-eam-ui";
import {PluginDetail, Plugin} from "thoughtware-plugin-manager-ui";
import {SystemFeature, ProjectFeature, SystemRole, ProjectRole} from "thoughtware-privilege-ui";
import {Orga,User,UserGroup,Directory} from "thoughtware-user-ui";
import {BackupRestore, LogTemplate, LogType, MyLog} from "thoughtware-security-ui";

const Configuration = AsyncComponent(() => import( "./host/hostPage/components/Host"))
const Host = AsyncComponent(() => import( "./host/common/components/HostLayout"))
const Monitor = AsyncComponent(() => import( "./host/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./host/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./host/template/components/Template"))
const Setting = AsyncComponent(() => import( "./host/setting/common/SettingLayout"))
const Graphics = AsyncComponent(() => import( "./host/graphics/components/Graphics"))
const Login = AsyncComponent(() => import( "./login/ProjectLogin"))
const Logout = AsyncComponent(() => import( "./login/ProjectLogout"))
const HomePage = AsyncComponent(() => import('./home/components/HomePage'))
const Index = AsyncComponent(() => import('./home/common/HomeLayout'))
const HostDetails = AsyncComponent(() => import('./host/hostOverview/components/HostOverview'))
const HostDynamic = AsyncComponent(() => import('./host/hostOverview/components/HostDynamic'))
const ProjectInformation = AsyncComponent(() => import('./host/setting/projectInformation/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./host/setting/member/Member'))
const Permissions = AsyncComponent(() => import('./host/setting/permissions/Permissions'))
const GlobalSettings = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))
const GlobalSettingsTemplate = AsyncComponent(() => import('./setting/template/components/TemplateSetting'))
const HostGroup = AsyncComponent(() => import('./setting/hostGroup/components/HostGroup'))
const GlobalSettingsMonitorItem = AsyncComponent(() => import('./setting/MonitorItem/components/MonitorItem'))
const Monitoring = AsyncComponent(() => import('./monitorIng/monitoring/components/Monitoring'))
const MonitoringLayout = AsyncComponent(() => import('./monitorIng/monitoringDetails/common/MonitorLayout'))
const MonitoringDetails = AsyncComponent(() => import('./monitorIng/monitoringDetails/components/MonitoringDetails'))
const AlarmLayout = AsyncComponent(() => import('./alarm/common/components/AlarmLayout'))
const AlarmPage = AsyncComponent(() => import('./alarm/alarmPage/components/AlarmPage'))
const AddHost = AsyncComponent(() => import('./host/hostPage/components/AddHost'))
const SettingHome = AsyncComponent(() => import('./setting/home/component/SettingHome'))
const VersionContent = AsyncComponent(() => import('./setting/version/VersionContent'))

const HostConfiguration = AsyncComponent(() => import('./host/configuration/common/Configuration'))
const HostAlarm = AsyncComponent(() => import('./host/hostAlarm/components/HostAlarm'))


const Routes = [


    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/logout",
        exact: true,
        component: Logout,
    },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to={"/home"}/>,
    },
    {
        path: "/index/404",
        render: (props) => {
            return <NotFound {...props}/>
        }
    },
    {
        path: "/no-auth",
        exact: true,
        render: (props) => {
            return <ExcludeProductUser {...props}/>
        }
    },
    {
        path: "/wechat",
        exact: true,
        render: (props) => {
            return <InternalWechatEntry {...props}/>
        }
    },
    {
        path: "/",
        component: Index,
        routes: [
            {
                path: "/home",
                exact: false,
                component: HomePage,
            },
            {
                path: "/configuration",
                exact: true,
                component: Configuration,
            },
            {
                path: "/configuration/addHost",
                exact: true,
                component: AddHost,
            },
            {
                path: "/hostList/:id",
                exact: false,
                component: Host,
                routes: [
                    {
                        path: "/hostList/:id/hostDetails",
                        exact: false,
                        component: HostDetails,
                    },
                    {
                        path: "/hostList/:id/hostDynamic",
                        exact: false,
                        component: HostDynamic,
                    },
                    {
                        path: "/hostList/:id/configuration",
                        exact: false,
                        component: HostConfiguration,
                        routes: [
                            {
                                path: "/hostList/:id/configuration/monitor",
                                exact: false,
                                component: Monitor,
                            },
                            {
                                path: "/hostList/:id/configuration/monitorAdd",
                                exact: false,
                                component: Monitor,
                            },
                            {
                                path: "/hostList/:id/configuration/trigger",
                                exact: false,
                                component: Trigger,
                            },
                            {
                                path: "/hostList/:id/configuration/template",
                                exact: false,
                                component: Template,
                            },
                            {
                                path: "/hostList/:id/configuration/graphics",
                                exact: false,
                                component: Graphics,
                            },
                        ]
                    },
                    {
                        path: "/hostList/:id/monitoring",
                        component: MonitoringLayout,
                        routes: [
                            {
                                path: "/hostList/:id/monitoringDetails",
                                component: MonitoringDetails,
                            },
                        ]
                    },
                    {
                        path: "/hostList/:id/hostAlarm",
                        exact: false,
                        component: HostAlarm,
                    },
                    {
                        path: "/hostList/:id",
                        component: Setting,
                        routes: [
                            {
                                path: "/hostList/:id/projectInformation",
                                exact: true,
                                component: ProjectInformation,
                            },
                            {
                                path: "/hostList/:id/member",
                                key: 'member',
                                exact: true,
                                component: Member,
                            },
                            {
                                path: "/hostList/:id/permissions",
                                key: 'permissions',
                                exact: true,
                                component: Permissions,
                            },

                        ]
                    },
                ]
            },
            /*{
                path: "/monitoring",
                exact: false,
                component: Monitoring
            },
            {
                path: "/monitoringList/:id",
                component: MonitoringLayout,
                routes: [
                    {
                        path: "/monitoringList/:id/monitoringDetails",
                        component: MonitoringDetails,
                    },
                ]
            },*/
            {
                path: "/alarm",
                exact: false,
                component: AlarmPage,
            },
            {
                path: "/alarmLayout",
                component: AlarmLayout,
            },
            {
                path: "/setting",
                component: GlobalSettings,
                routes: [
                    {
                        path: "/setting/home",
                        component: SettingHome
                    },
                    {
                        path: "/setting/template",
                        component: GlobalSettingsTemplate
                    },
                    {
                        path: "/setting/hostGroup",
                        component: HostGroup
                    },
                    {
                        path: "/setting/monitorItem",
                        component: GlobalSettingsMonitorItem
                    },
                    {
                        path: "/setting/messageSendType",
                        key: 'MessageSendType',
                        render: () => <MessageSendType bgroup={"xmonitor"} isBase={true}/>
                    },
                    {
                        path: "/setting/messageNotice",
                        key: 'MessageNotice',
                        render: () => <MessageNotice bgroup={"xmonitor"} isBase={true}/>
                    },
                    {
                        path: "/setting/ProjectMessageNotice",
                        key: 'ProjectMessageNotice',
                        render: () => <ProjectMessageNotice bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/DomainMessageNotice",
                        key: 'DomainMessageNotice',
                        render: () => <DomainMessageNotice bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/MyTodoTask",
                        key: 'MyTodoTask',
                        render: () => <MyTodoTask bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/Task",
                        key: 'Task',
                        render: () => <Task bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/TodoTemp",
                        key: 'TodoTemp',
                        render: () => <TodoTemp bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/TodoType",
                        key: 'TodoType',
                        render: () => <TodoType bgroup={"xmonitor"}/>
                    },

                    {
                        path: "/setting/version",
                        key:'version',
                        exact: true,
                        component:VersionContent
                    },
                    {
                        path: "/setting/plugin",
                        key: 'plugin',
                        render: (props) => <Plugin {...props} detailRouter={"/setting/plugindetail"}/>,
                    },
                    {
                        path: "/setting/systemFeature",
                        key: 'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"xmonitor"}/>,
                    },
                    {
                        path: "/setting/ProjectFeature",
                        key: 'ProjectFeature',
                        exact: true,
                        render: () => <ProjectFeature isBase={true} bgroup={"xmonitor"}/>,
                    },
                    {
                        path: "/setting/baseSystemRole",
                        key: 'baseSystemRole',
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"xmonitor"}/>,
                    },
                    {
                        path: "/setting/systemRole",
                        key: "systemRole",
                        exact: true,
                        render: (props) => <ProjectRole {...props} bgroup={"xmonitor"} isBase={true}/>
                    },
                    {
                        path: "/setting/department",
                        key: "department",
                        exact: true,
                        render: (props) => <Orga
                            {...props}
                            bgroup={"xmonitor"}
                        />
                    },
                    {
                        path: "/setting/userGroup",
                        key: "userGroup",
                        exact: true,
                        render: (props) => <UserGroup
                            {...props}
                            bgroup={"xmonitor"}
                            isBase={true}
                        />
                    },
                    {
                        path: "/setting/user",
                        key: "user",
                        exact: true,
                        render: (props) => <User
                            {...props}
                            bgroup={"xmonitor"}
                        />
                    },
                    {
                        path: "/setting/directory",
                        key: "directory",
                        exact: true,
                        render: (props) => <Directory
                            {...props}
                            bgroup={"xmonitor"}
                        />
                    },

                    {
                        path: "/setting/backups",
                        key: "backups",
                        exact: true,
                        render: (props) =>  <BackupRestore {...props} />
                    },
                    {
                        path: "/setting/myLog",
                        key: "directory",
                        exact: true,
                        render: (props) => <MyLog {...props} bgroup={"xmonitor"}/>
                    },
                    {
                        path: "/setting/directory",
                        key: "directory",
                        exact: true,
                        render: (props) => <Directory
                            {...props}
                            bgroup={"xmonitor"}
                        />
                    },
                    {
                        path: "/setting/productAuth",
                        key: 'productAuth',
                        render: () => <ProductAuth bgroup={"xmonitor"}/>
                    },

                    {
                        path: "/setting/syr/feature",
                        render:(props) => <SystemFeature {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/system/role",
                        render:(props) =>  <SystemRole {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/project/role",
                        render:(props) =>  <ProjectRole {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/project/feature",
                        render:(props) => <ProjectFeature {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/task",
                        render:(props) => <Task {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTask",
                        render:(props) => <MyTodoTask {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTemp",
                        render:(props) => <TodoTemp {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoType",
                        render:(props) => <TodoType {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path:"/setting/logTemplate",
                        render:(props) => <LogTemplate {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {

                        path:"/setting/logType",
                        render:(props) => <LogType {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path:"/setting/messageType",
                        render:(props) => <MessageType {...props} bgroup={"xmonitor"}/>,
                        exact: true,
                    },
                    {
                        path:"/setting/sendtrue",
                        render:(props) => <MessageSendType {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path:"/setting/systemNotice",
                        render:(props) => <MessageNotice {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path:"/setting/projectNotice",
                        render:(props) => <ProjectMessageNotice {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/userGrouptrue",
                        render:(props) => <UserGroup {...props} bgroup={"xmonitor"} isBase={true}/>,
                        exact: true,
                    },
                ]
            }

        ]
    }


]
export default Routes;
