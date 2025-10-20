import React from "react";
import AsyncComponent from "./common/lazy/AsyncComponent";
import {Redirect} from "react-router-dom";
import {
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
import {SystemFeature, ProjectFeature, ProjectRole, ProjectVirtualRole} from "tiklab-privilege-ui";
import {BackupRestore, LogTemplate, LogType} from "tiklab-security-ui";

const Login = AsyncComponent(() => import( "./login/ProjectLogin"))
const Logout = AsyncComponent(() => import( "./login/ProjectLogout"))
const HomePage = AsyncComponent(() => import('./home/components/HomePage'))
const Home = AsyncComponent(() => import('./common/layout/Home'))
const SysException = AsyncComponent(() => import('./login/SysExceptionContent'))
const LoginRpw = AsyncComponent(() => import('./login/LoginRpwContent'))
const RequestErrorContent = AsyncComponent(() => import('./login/RequestErrorContent'))

//主机
const Configuration = AsyncComponent(() => import( "./host/hostPage/components/Host"))
const Host = AsyncComponent(() => import( "./host/common/components/HostLayout"))
const Monitor = AsyncComponent(() => import( "./host/setting/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./host/setting/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./host/setting/template/components/Template"))

const SettingTabs = AsyncComponent(() => import( "./host/setting/common/SettingTabs"))
const Graphics = AsyncComponent(() => import( "./host/setting/graphics/components/Graphics"))
const HostDetails = AsyncComponent(() => import('./host/hostOverview/components/HostDetails'))
const HostDynamic = AsyncComponent(() => import('./host/hostOverview/components/HostDynamic'))
const ProjectInformation = AsyncComponent(() => import('./host/setting/project/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./host/setting/element/Member'))
const HostRole = AsyncComponent(() => import('./host/setting/element/HostRole'))
const HostAlarm = AsyncComponent(() => import('./host/hostAlarm/components/HostAlarm'))
const MonitoringLayout = AsyncComponent(() => import('./host/monitoring/components/MonitorGraphics'))
const AddHost = AsyncComponent(() => import('./host/hostPage/components/AddHost'))

//数据库
const Databases = AsyncComponent(() => import('./databases/databasesPage/components/Databases'))
const DatabasesLayout = AsyncComponent(() => import('./databases/common/DbLayout'))
const AddDatabases = AsyncComponent(() => import('./databases/databasesPage/components/AddDatabases'))
const DbDetails = AsyncComponent(() => import ('./databases/dbDetails/components/DbDetails'))
const DBMonitoring = AsyncComponent(() => import ('./databases/dbMonitoring/components/DbMonitorGraphics'))
const DBAlarm = AsyncComponent(() => import ('./databases/dbAlarm/components/DBAlarm'))
const DBMonitor = AsyncComponent(() => import('./databases/setting/monitor/components/DbMonitor'))
const DBTrigger = AsyncComponent(() => import('./databases/setting/trigger/components/DbTrigger'))
const DBTemplate = AsyncComponent(() => import('./databases/setting/template/components/Template'))
const DBGraphics = AsyncComponent(() => import('./databases/setting/dbGraphics/components/DbGraphics'))
const DBCustomize = AsyncComponent(() => import('./databases/setting/customize/components/Customize'))
const DbSettingTabs= AsyncComponent(() => import('./databases/setting/common/SettingTabs'))
const DbProject = AsyncComponent(() => import('./databases/setting/dbProject/components/DbProject'))
const DbMember = AsyncComponent(() => import('./databases/setting/element/DbMember'))
const DbRole = AsyncComponent(() => import('./databases/setting/element/DbRole'))

//k8s
const Kubernetes = AsyncComponent(() => import('./k8s/kuPage/components/Kubernetes'))
const AddKubernetes = AsyncComponent(() => import('./k8s/kuPage/components/AddKubernetes'))
const KubernetesLayout = AsyncComponent(() => import('./k8s/common/KubernetesLayout'))
const KuOverview = AsyncComponent(() => import('./k8s/overview/components/KuOverview'))
const KuMonitoring = AsyncComponent(() => import('./k8s/kuMonitoring/components/KuMonitorGraphics'))
const KuMonitor = AsyncComponent(() => import('./k8s/setting/monitor/components/KuMonitor'))
const KuGraphics = AsyncComponent(() => import('./k8s/setting/graphics/components/KuGraphics'))
const KuTrigger = AsyncComponent(() => import('./k8s/setting/trigger/components/KuTrigger'))
const KuAlarm = AsyncComponent(() => import('./k8s/kuAlarm/components/KuAlarm'))
const KuSettingTabs = AsyncComponent(() => import('./k8s/setting/common/SettingTabs'))
const KuProject = AsyncComponent(() => import('./k8s/setting/kuProject/components/KuProject'))
const KuMember = AsyncComponent(() => import('./k8s/setting/element/KuMember'))
const KuRole = AsyncComponent(() => import('./k8s/setting/element/KuRole'))



//网络
const Internet = AsyncComponent(() => import('./Internet/internetPage/components/Internet'))
const AddInternet = AsyncComponent(() => import('./Internet/internetPage/components/AddInternet'))
const UpdateInternet = AsyncComponent(() => import('./Internet/internetPage/components/UpdateInternet'))

const InternetLayout = AsyncComponent(() => import('./Internet/common/InternetLayout'))
const InternetOverview = AsyncComponent(() => import('./Internet/internetOverview/components/InternetOverview'))
const InternetMonitoring = AsyncComponent(() => import('./Internet/monitoring/components/MonitorGraphics'))
const InternetAlarm = AsyncComponent(() => import('./Internet/internetAlarm/components/InAlarm'))
const InternetMonitor = AsyncComponent(() => import('./Internet/setting/monitor/components/InMonitor'))
const InternetTrigger = AsyncComponent(() => import('./Internet/setting/trigger/components/InTrigger'))
const InternetGraphics = AsyncComponent(() => import('./Internet/setting/graphics/components/Graphics'))

const InternetSettingTabs = AsyncComponent(() => import('./Internet/setting/common/SettingTabs'))
const InternetProject = AsyncComponent(() => import('./Internet/setting/projectInformation/components/ProjectInformation'))
const InternetMember = AsyncComponent(() => import('./Internet/setting/element/Member'))
const InRole = AsyncComponent(() => import('./Internet/setting/element/InRole'))


//系统设置
const GlobalSettings = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))
const GlobalSettingsTemplate = AsyncComponent(() => import('./setting/template/components/TemplateSetting'))
const TemplateMonitor = AsyncComponent(() => import('./setting/template/components/TemplateSettingMonitorList'))
const HostGroup = AsyncComponent(() => import('./setting/hostGroup/components/HostGroup'))
const AlarmPage = AsyncComponent(() => import('./alarm/alarmPage/components/AlarmPage'))
const SettingHome = AsyncComponent(() => import('./setting/home/component/SettingHome'))
const VersionContent = AsyncComponent(() => import('./setting/version/VersionContent'))

//系统平台组件
const User=AsyncComponent(()=>import("./setting/element/User"))
const Directory=AsyncComponent(()=>import("./setting/element/Directory"))
const Orga=AsyncComponent(()=>import("./setting/element/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/element/Group"))
const SystemRole=AsyncComponent(()=>import('./setting/element/SystemRole'))

//消息
const MessageContent =AsyncComponent(()=>import('./setting/element/MessageContent'))
//设置-消息通知方案
const MessageNotice =AsyncComponent(()=>import('./setting/element/MessageNotice'))
//设置-消息发送方式
const MessagesendType =AsyncComponent(()=>import('./setting/element/MessagesendType'))

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
        path:'/requestError',
        exact:true,
        component:RequestErrorContent,
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
                path: "/internet/update/:id",
                exact: true,
                component: UpdateInternet,
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

                    // 平台组件
                    //用户与权限
                    {
                        path: "/setting/orga",
                        key: "department",
                        exact: true,
                        component: Orga,
                    },
                    {
                        path: "/setting/userGroup",
                        key: "userGroup",
                        exact: true,
                        component: UserGroup,
                    },
                    {
                        path: "/setting/user",
                        key: "user",
                        exact: true,
                        component: User,
                    },
                    {
                        path: "/setting/dir",
                        key: "directory",
                        exact: true,
                        component: Directory,
                    },
                    {
                        path: "/setting/systemRole",
                        key: "systemRole",
                        exact: true,
                        component: SystemRole,
                    },
                    {
                        path: "/setting/message",
                        key: 'message',
                        component: MessageContent,
                    },
                    {
                        path: "/setting/messageNotice",
                        key: 'MessageNotice',
                        component: MessageNotice,
                    },
                    {
                        path: "/setting/messageSendType",
                        key: 'MessageSendType',
                        component: MessagesendType,
                    },



                   //基础路由
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
                        path: "/host/:id/monitoring",
                        component: MonitoringLayout,
                    },
                    {
                        path: "/host/:id/hostAlarm",
                        exact: false,
                        component: HostAlarm,
                    },
                    {
                        path: "/host/:id/setting",
                        exact: false,
                        component: SettingTabs,
                        routes: [
                            {
                                path: "/host/:id/setting/ProjectInformation",
                                exact: true,
                                component: ProjectInformation,
                            },
                            {
                                path: "/host/:id/setting/member",
                                key: 'member',
                                exact: true,
                                component: Member,
                            },
                            {
                                path: "/host/:id/setting/hostRole",
                                key: 'permissions',
                                exact: true,
                                component: HostRole,
                            },
                            {
                                path: "/host/:id/setting/monitor",
                                exact: false,
                                component: Monitor,
                            },
                            {
                                path: "/host/:id/setting/trigger",
                                exact: false,
                                component: Trigger,
                            },
                            {
                                path: "/host/:id/setting/template",
                                exact: false,
                                component: Template,
                            },
                            {
                                path: "/host/:id/setting/graphics",
                                exact: false,
                                component: Graphics,
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
                        path: "/db/:id/monitoring",
                        component: DBMonitoring,
                    },
                    {
                        path: "/db/:id/dbAlarm",
                        exact: false,
                        component: DBAlarm,
                    },
                    {
                        path: "/db/:id/setting",
                        component: DbSettingTabs,
                        routes: [
                            {
                                path: "/db/:id/setting/dbProject",
                                exact: true,
                                component: DbProject,
                            },
                            {
                                path: "/db/:id/setting/dbMember",
                                key: 'dbMember',
                                exact: true,
                                component: DbMember,
                            },
                            {
                                path: "/db/:id/setting/DbRole",
                                key: 'permissions',
                                exact: true,
                                component: DbRole,
                            },
                            {
                                path: "/db/:id/setting/monitor",
                                exact: false,
                                component: DBMonitor,
                            },
                            {
                                path: "/db/:id/setting/trigger",
                                exact: false,
                                component: DBTrigger,
                            },
                            {
                                path: "/db/:id/setting/customize",
                                exact: false,
                                component: DBCustomize,
                            },
                            {
                                path: "/db/:id/setting/template",
                                exact: false,
                                component: DBTemplate,
                            },
                            {
                                path: "/db/:id/setting/graphics",
                                exact: false,
                                component: DBGraphics,
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
                        path: "/kubernetes/:id/setting",
                        component: KuSettingTabs,
                        routes: [
                            {
                                path: "/kubernetes/:id/setting/kuProject",
                                exact: true,
                                component: KuProject,
                            },
                            {
                                path: "/kubernetes/:id/setting/kuMember",
                                key: 'kuMember',
                                exact: true,
                                component: KuMember,
                            },
                            {
                                path: "/kubernetes/:id/setting/kuRole",
                                key: 'permissions',
                                exact: true,
                                component: KuRole,
                            },
                            {
                                path: "/kubernetes/:id/setting/monitor",
                                exact: true,
                                component: KuMonitor,
                            },
                            {
                                path: "/kubernetes/:id/setting/trigger",
                                exact: true,
                                component: KuTrigger,
                            },
                            {
                                path: "/kubernetes/:id/setting/graphics",
                                exact: true,
                                component: KuGraphics,
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
                        path: "/internet/:id/setting",
                        component: InternetSettingTabs,
                        routes: [
                            {
                                path: "/internet/:id/setting/inProject",
                                exact: true,
                                component: InternetProject,
                            },
                            {
                                path: "/internet/:id/setting/inMember",
                                key: 'inMember',
                                exact: true,
                                component: InternetMember,
                            },
                            {
                                path: "/internet/:id/setting/inRole",
                                key: 'permissions',
                                exact: true,
                                component: InRole,
                            },
                            {
                                path: "/internet/:id/setting/monitor",
                                exact: true,
                                component: InternetMonitor,
                            },
                            {
                                path: "/internet/:id/setting/trigger",
                                exact: true,
                                component: InternetTrigger,
                            },
                            {
                                path: "/internet/:id/setting/graphics",
                                exact: true,
                                component: InternetGraphics,
                            },
                        ]
                    },

                ]
            },

        ]
    }


]
export default Routes;
