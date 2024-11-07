import React from "react";
import AsyncComponent from "./common/lazy/AsyncComponent";
import {Redirect} from "react-router-dom";
import {
    MessageNotice,
    MessageType,
    ProjectMessageNotice,
    DomainMessageNotice,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType
} from "tiklab-message-ui";

import {
    MessageSendType,
} from "tiklab-message-extension-ui";

import {ProductAuth} from "tiklab-licence-ui";
import {ExcludeProductUser} from "tiklab-eam-ui";
import {SystemFeature, ProjectFeature, SystemRole, ProjectRole, ProjectVirtualRole} from "tiklab-privilege-ui";
import {Orga, User, UserGroup, Directory} from "tiklab-user-ui";
import {BackupRestore, LogTemplate, LogType, MyLog} from "tiklab-security-ui";

const Configuration = AsyncComponent(() => import( "./host/hostPage/components/Host"))
const Host = AsyncComponent(() => import( "./host/common/components/HostLayout"))
const Monitor = AsyncComponent(() => import( "./host/configuration/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./host/configuration/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./host/configuration/template/components/Template"))
const Setting = AsyncComponent(() => import( "./host/setting/common/SettingLayout"))
const Graphics = AsyncComponent(() => import( "./host/configuration/graphics/components/Graphics"))
const Login = AsyncComponent(() => import( "./login/ProjectLogin"))
const Logout = AsyncComponent(() => import( "./login/ProjectLogout"))
const HomePage = AsyncComponent(() => import('./home/components/HomePage'))
const Home = AsyncComponent(() => import('./common/layout/Home'))
const HostDetails = AsyncComponent(() => import('./host/hostOverview/components/HostDetails'))
const HostDynamic = AsyncComponent(() => import('./host/hostOverview/components/HostDynamic'))
const ProjectInformation = AsyncComponent(() => import('./host/setting/projectInformation/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./host/setting/member/Member'))
const Permissions = AsyncComponent(() => import('./host/setting/permissions/Permissions'))
const GlobalSettings = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))
const GlobalSettingsTemplate = AsyncComponent(() => import('./setting/template/components/TemplateSetting'))
const TemplateMonitor = AsyncComponent(() => import('./setting/template/components/TemplateSettingMonitorList'))
const HostGroup = AsyncComponent(() => import('./setting/hostGroup/components/HostGroup'))
const GlobalSettingsMonitorItem = AsyncComponent(() => import('./setting/MonitorItem/components/MonitorItem'))
const MonitoringLayout = AsyncComponent(() => import('./host/monitoring/components/MonitorGraphics'))
const AlarmPage = AsyncComponent(() => import('./alarm/alarmPage/components/AlarmPage'))
const AddHost = AsyncComponent(() => import('./host/hostPage/components/AddHost'))
const SettingHome = AsyncComponent(() => import('./setting/home/component/SettingHome'))
const VersionContent = AsyncComponent(() => import('./setting/version/VersionContent'))

const HostConfiguration = AsyncComponent(() => import('./host/configuration/common/Configuration'))
const Databases = AsyncComponent(() => import('./databases/databasesPage/components/Databases'))
const DatabasesLayout = AsyncComponent(() => import('./databases/common/DbLayout'))
const AddDatabases = AsyncComponent(() => import('./databases/databasesPage/components/AddDatabases'))
const HostAlarm = AsyncComponent(() => import('./host/hostAlarm/components/HostAlarm'))

const DbDetails = AsyncComponent(() => import ('./databases/dbDetails/components/DbDetails'))
const DBMonitoring = AsyncComponent(() => import ('./databases/dbMonitoring/components/DbMonitorGraphics'))
const DBAlarm = AsyncComponent(() => import ('./databases/dbAlarm/components/DBAlarm'))
const HostConfigs = AsyncComponent(() => import ('./databases/configs/common/Configs'))

const DBMonitor = AsyncComponent(() => import('./databases/configs/monitor/components/DbMonitor'))
const DBTrigger = AsyncComponent(() => import('./databases/configs/trigger/components/DbTrigger'))
const DBTemplate = AsyncComponent(() => import('./databases/configs/template/components/Template'))
const DBGraphics = AsyncComponent(() => import('./databases/configs/dbGraphics/components/DbGraphics'))
const DBCustomize = AsyncComponent(() => import('./databases/configs/customize/components/Customize'))

const DbSetting = AsyncComponent(() => import('./databases/setting/common/DbSetting'))
const DbProject = AsyncComponent(() => import('./databases/setting/dbProject/components/DbProject'))
const DbMember = AsyncComponent(() => import('./databases/setting/dbMember/DbMember'))
const DbPermissions = AsyncComponent(() => import('./databases/setting/permissions/DbPermissions'))


const Kubernetes = AsyncComponent(() => import('./k8s/kuPage/components/Kubernetes'))
const AddKubernetes = AsyncComponent(() => import('./k8s/kuPage/components/AddKubernetes'))
const KubernetesLayout = AsyncComponent(() => import('./k8s/common/KubernetesLayout'))
const KuOverview = AsyncComponent(() => import('./k8s/overview/components/KuOverview'))

const KuMonitoring = AsyncComponent(() => import('./k8s/kuMonitoring/components/KuMonitorGraphics'))
const KuConfigs = AsyncComponent(() => import('./k8s/configs/common/KuConfigs'))
const KuMonitor = AsyncComponent(() => import('./k8s/configs/monitor/components/KuMonitor'))
const KuGraphics = AsyncComponent(() => import('./k8s/configs/graphics/components/KuGraphics'))
const KuTrigger = AsyncComponent(() => import('./k8s/configs/trigger/components/KuTrigger'))
const KuAlarm = AsyncComponent(() => import('./k8s/kuAlarm/components/KuAlarm'))

const KuSetting = AsyncComponent(() => import('./k8s/setting/common/KuSetting'))
const KuProject = AsyncComponent(() => import('./k8s/setting/kuProject/components/KuProject'))
const KuMember = AsyncComponent(() => import('./k8s/setting/kuMember/KuMember'))
const KuPermissions = AsyncComponent(() => import('./k8s/setting/kuPermissions/KuPermissions'))


const Internet = AsyncComponent(() => import('./Internet/internetPage/components/Internet'))
const AddInternet = AsyncComponent(() => import('./Internet/internetPage/components/AddInternet'))
const InternetLayout = AsyncComponent(() => import('./Internet/common/InternetLayout'))
const InternetOverview = AsyncComponent(() => import('./Internet/internetOverview/components/InternetOverview'))
const InternetMonitoring = AsyncComponent(() => import('./Internet/monitoring/components/MonitorGraphics'))
const InternetAlarm = AsyncComponent(() => import('./Internet/internetAlarm/components/InAlarm'))
const InternetConfigs = AsyncComponent(() => import('./Internet/config/common/InternetConfig'))
const InternetMonitor = AsyncComponent(() => import('./Internet/config/monitor/components/InMonitor'))
const InternetTrigger = AsyncComponent(() => import('./Internet/config/trigger/components/InTrigger'))
const InternetGraphics = AsyncComponent(() => import('./Internet/config/graphics/components/Graphics'))
const InternetSetting = AsyncComponent(() => import('./Internet/setting/common/SettingLayout'))
const InternetProject = AsyncComponent(() => import('./Internet/setting/projectInformation/components/ProjectInformation'))
const InternetMember = AsyncComponent(() => import('./Internet/setting/member/Member'))
const InternetPermissions = AsyncComponent(() => import('./Internet/setting/permissions/Permissions'))
const SysException = AsyncComponent(() => import('./login/SysExceptionContent'))
const LoginRpw = AsyncComponent(() => import('./login/LoginRpwContent'))


const Routes = [


    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        component: LoginRpw,
        exact:true,
        path: '/loginRpw'
    },
    {
        path: "/logout",
        exact: true,
        component: Logout,
    },
    {
        path: "/noAuth",
        exact: true,
        render: (props) => {
            return <ExcludeProductUser {...props}/>
        }
    },
    {
        path: "/500",
        exact: true,
        component: SysException,
    },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to={"/home"}/>,
    },
    /*{
        path: "/index/404",
        render: (props) => {
            return <NotFound {...props}/>
        }
    },*/

    {
        path: "/",
        component: Home,
        routes: [
            {
                path: "/home",
                exact: false,
                component: HomePage,
            },
            {
                path: "/host",
                exact: true,
                component: Configuration,
            },
            {
                path: "/host/addHost",
                exact: true,
                component: AddHost,
            },
            {
                path: "/db",
                exact: true,
                component: Databases,
            },
            {
                path: "/db/addDatabases",
                exact: true,
                component: AddDatabases,
            },
            {
                path: "/alarm",
                exact: true,
                component: AlarmPage,
            },
            {
                path: "/kubernetes",
                exact: true,
                component: Kubernetes,
            },
            {
                path: "/kubernetes/addKubernetes",
                exact: true,
                component: AddKubernetes,
            },

            {
                path: "/internet",
                exact: true,
                component: Internet,
            },
            {
                path: "/internet/addInternet",
                exact: true,
                component: AddInternet,
            },

            {
                path: "/setting",
                component: GlobalSettings,
                routes: [
                    //项目自身组件
                    {
                        path: "/setting/home",
                        component: SettingHome
                    },
                    {
                        path: "/setting/template",
                        component: GlobalSettingsTemplate
                    },
                    {
                        path: "/setting/monitor/:id",
                        component: TemplateMonitor
                    },
                    {
                        path: "/setting/hostGroup",
                        component: HostGroup
                    },
                    {
                        path: "/setting/monitorItem",
                        component: GlobalSettingsMonitorItem
                    },

                    // 平台组件
                    //用户与权限
                    {
                        path: "/setting/orga",
                        key: "department",
                        exact: true,
                        render: (props) => <Orga
                            {...props}
                            bgroup={"kaelthas"}
                        />
                    },
                    {
                        path: "/setting/userGroup",
                        key: "userGroup",
                        exact: true,
                        render: (props) => <UserGroup
                            {...props}
                            bgroup={"kaelthas"}
                            isBase={true}
                        />
                    },
                    {
                        path: "/setting/user",
                        key: "user",
                        exact: true,
                        render: (props) => <User
                            {...props}
                            bgroup={"kaelthas"}
                        />
                    },
                    {
                        path: "/setting/dir",
                        key: "directory",
                        exact: true,
                        render: (props) => <Directory
                            {...props}
                            bgroup={"kaelthas"}
                        />
                    },
                    {
                        path: "/setting/systemRole",
                        key: "systemRole",
                        exact: true,
                        render: (props) => <SystemRole {...props} bgroup={"kaelthas"}/>
                    },


                    //消息
                    {
                        path: "/setting/messageNotice",
                        key: 'MessageNotice',
                        render: () => <MessageNotice bgroup={"kaelthas"} />
                    },
                    {
                        path: "/setting/messageSendType",
                        key: 'MessageSendType',
                        render: () => <MessageSendType bgroup={"kaelthas"}/>
                    },


                    {
                        path: "/setting/ProjectMessageNotice",
                        key: 'ProjectMessageNotice',
                        render: () => <ProjectMessageNotice bgroup={"kaelthas"}/>
                    },
                    {
                        path: "/setting/DomainMessageNotice",
                        key: 'DomainMessageNotice',
                        render: () => <DomainMessageNotice bgroup={"kaelthas"}/>
                    },
                    {
                        path: "/setting/TodoTemp",
                        key: 'TodoTemp',
                        render: () => <TodoTemp bgroup={"kaelthas"}/>
                    },
                    {
                        path: "/setting/TodoType",
                        key: 'TodoType',
                        render: () => <TodoType bgroup={"kaelthas"}/>
                    },


                    {
                        path: "/setting/systemFeature",
                        key: 'SystemFeature',
                        exact: true,
                        render: () => <SystemFeature isBase={true} bgroup={"kaelthas"}/>,
                    },
                    {
                        path: "/setting/ProjectFeature",
                        key: 'ProjectFeature',
                        exact: true,
                        render: () => <ProjectFeature isBase={true} bgroup={"kaelthas"}/>,
                    },
                    {
                        path: "/setting/baseSystemRole",
                        key: 'baseSystemRole',
                        exact: true,
                        render: () => <SystemRole isBase={true} group={'system'} bgroup={"kaelthas"}/>,
                    },


                    // 安全
                    {
                        path: "/setting/backups",
                        key: "backups",
                        exact: true,
                        render: (props) => <BackupRestore {...props} />
                    },
                    {
                        path: "/setting/log",
                        key: "directory",
                        exact: true,
                        render: (props) => <MyLog {...props} bgroup={"kaelthas"}/>
                    },
                    //应用
                    {
                        path: "/setting/version",
                        key: 'version',
                        exact: true,
                        component: VersionContent
                    },
                    {
                        path: "/setting/productAuth",
                        key: 'productAuth',
                        render: () => <ProductAuth bgroup={"kaelthas"}/>
                    },

                    //基础组件
                    {
                        path: "/setting/syr/feature",
                        render: (props) => <SystemFeature {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/system/role",
                        render: (props) => <SystemRole {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },

                    {
                        path: "/setting/project/feature",
                        render: (props) => <ProjectFeature {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/project/role",
                        render: (props) => <ProjectRole {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/project/vRole",
                        render: (props) => <ProjectVirtualRole {...props}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTask",
                        render: (props) => <MyTodoTask {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/task",
                        render: (props) => <Task {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoTemp",
                        render: (props) => <TodoTemp {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/todoType",
                        render: (props) => <TodoType {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/logTemplate",
                        render: (props) => <LogTemplate {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/logType",
                        render: (props) => <LogType {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/type",
                        render: (props) => <MessageType {...props} bgroup={"kaelthas"}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/sendtrue",
                        render: (props) => <MessageSendType {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/systemNotice",
                        render: (props) => <MessageNotice {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/projectNotice",
                        render: (props) => <ProjectMessageNotice {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },
                    {
                        path: "/setting/userGrouptrue",
                        render: (props) => <UserGroup {...props} bgroup={"kaelthas"} isBase={true}/>,
                        exact: true,
                    },
                ]
            },
            {
                path: "/host/:id",
                exact: false,
                component: Host,
                routes: [
                    {
                        path: "/host/:id/hostOverview",
                        exact: false,
                        component: HostDetails,
                    },
                    {
                        path: "/host/:id/hostDynamic",
                        exact: false,
                        component: HostDynamic,
                    },
                    {
                        path: "/host/:id/config",
                        exact: false,
                        component: HostConfiguration,
                        routes: [
                            {
                                path: "/host/:id/config/monitor",
                                exact: false,
                                component: Monitor,
                            },
                            {
                                path: "/host/:id/config/trigger",
                                exact: false,
                                component: Trigger,
                            },
                            {
                                path: "/host/:id/config/template",
                                exact: false,
                                component: Template,
                            },
                            {
                                path: "/host/:id/config/graphics",
                                exact: false,
                                component: Graphics,
                            },
                        ]
                    },
                    {
                        path: "/host/:id/monitoring",
                        component: MonitoringLayout,
                    },
                    {
                        path: "/host/:id/hostAlarm",
                        exact: false,
                        component: HostAlarm,
                    },
                    {
                        path: "/host/:id",
                        component: Setting,
                        routes: [
                            {
                                path: "/host/:id/projectInformation",
                                exact: true,
                                component: ProjectInformation,
                            },
                            {
                                path: "/host/:id/member",
                                key: 'member',
                                exact: true,
                                component: Member,
                            },
                            {
                                path: "/host/:id/permissions",
                                key: 'permissions',
                                exact: true,
                                component: Permissions,
                            },

                        ]
                    },
                ]
            },
            {
                path: "/db/:id",
                exact: false,
                component: DatabasesLayout,
                routes: [
                    {
                        path: "/db/:id/dbDetails",
                        exact: true,
                        component: DbDetails,
                    },
                    {
                        path: "/db/:id/dbDynamic",
                        exact: false,
                        component: HostDynamic,
                    },
                    {
                        path: "/db/:id/configs",
                        exact: false,
                        component: HostConfigs,
                        routes: [
                            {
                                path: "/db/:id/configs/monitor",
                                exact: false,
                                component: DBMonitor,
                            },
                            {
                                path: "/db/:id/configs/trigger",
                                exact: false,
                                component: DBTrigger,
                            },
                            {
                                path: "/db/:id/configs/customize",
                                exact: false,
                                component: DBCustomize,
                            },
                            {
                                path: "/db/:id/configs/template",
                                exact: false,
                                component: DBTemplate,
                            },
                            {
                                path: "/db/:id/configs/dbGraphics",
                                exact: false,
                                component: DBGraphics,
                            },
                        ]
                    },
                    {
                        path: "/db/:id/monitoring",
                        component: DBMonitoring,
                    },
                    {
                        path: "/db/:id/dbAlarm",
                        exact: false,
                        component: DBAlarm,
                    },
                    {
                        path: "/db/:id/dbSetting",
                        component: DbSetting,
                        routes: [
                            {
                                path: "/db/:id/dbSetting/dbProject",
                                exact: true,
                                component: DbProject,
                            },
                            {
                                path: "/db/:id/dbSetting/dbMember",
                                key: 'dbMember',
                                exact: true,
                                component: DbMember,
                            },
                            {
                                path: "/db/:id/dbSetting/dbPermissions",
                                key: 'permissions',
                                exact: true,
                                component: DbPermissions,
                            },

                        ]
                    },
                ]
            },
            {
                component: KubernetesLayout,
                path: "/kubernetes/:id",
                routes: [
                    {
                        path: "/kubernetes/:id/kuOverview",
                        exact: true,
                        component: KuOverview,
                    },
                    {
                        path: "/kubernetes/:id/monitoring",
                        exact: true,
                        component: KuMonitoring,
                    },
                    {
                        path: "/kubernetes/:id/kuAlarm",
                        exact: true,
                        component: KuAlarm,
                    },
                    {
                        path: "/kubernetes/:id/configs",
                        component: KuConfigs,
                        routes: [
                            {
                                path: "/kubernetes/:id/configs/monitor",
                                exact: true,
                                component: KuMonitor,
                            },
                            {
                                path: "/kubernetes/:id/configs/trigger",
                                exact: true,
                                component: KuTrigger,
                            },
                            {
                                path: "/kubernetes/:id/configs/graphics",
                                exact: true,
                                component: KuGraphics,
                            },
                        ]
                    },

                    {
                        path: "/kubernetes/:id/kuSetting",
                        component: KuSetting,
                        routes: [
                            {
                                path: "/kubernetes/:id/kuSetting/kuProject",
                                exact: true,
                                component: KuProject,
                            },
                            {
                                path: "/kubernetes/:id/kuSetting/kuMember",
                                key: 'kuMember',
                                exact: true,
                                component: KuMember,
                            },
                            {
                                path: "/kubernetes/:id/kuSetting/kuPermissions",
                                key: 'permissions',
                                exact: true,
                                component: KuPermissions,
                            },
                        ]
                    },

                ]
            },
            {
                component: InternetLayout,
                path: "/internet/:id",
                routes: [
                    {
                        path: "/internet/:id/inOverview",
                        exact: true,
                        component: InternetOverview,
                    },
                    {
                        path: "/internet/:id/monitoring",
                        exact: true,
                        component: InternetMonitoring,
                    },
                    {
                        path: "/internet/:id/inAlarm",
                        exact: true,
                        component: InternetAlarm,
                    },
                    {
                        path: "/internet/:id/configs",
                        component: InternetConfigs,
                        routes: [
                            {
                                path: "/internet/:id/configs/monitor",
                                exact: true,
                                component: InternetMonitor,
                            },
                            {
                                path: "/internet/:id/configs/trigger",
                                exact: true,
                                component: InternetTrigger,
                            },
                            {
                                path: "/internet/:id/configs/graphics",
                                exact: true,
                                component: InternetGraphics,
                            },
                        ]
                    },
                    {
                        path: "/internet/:id/inSetting",
                        component: InternetSetting,
                        routes: [
                            {
                                path: "/internet/:id/inSetting/inProject",
                                exact: true,
                                component: InternetProject,
                            },
                            {
                                path: "/internet/:id/inSetting/inMember",
                                key: 'inMember',
                                exact: true,
                                component: InternetMember,
                            },
                            {
                                path: "/internet/:id/inSetting/inPermissions",
                                key: 'permissions',
                                exact: true,
                                component: InternetPermissions,
                            },
                        ]
                    },

                ]
            },

        ]
    }


]
export default Routes;
