import AsyncComponent from "./common/lazy/AsyncComponent";
import {Redirect} from "react-router-dom";

const Configuration = AsyncComponent(() => import( "./configuration/configurationPage/components/Configuration"))
const Host = AsyncComponent(() => import( "./configuration/host/common/HostLayout"))
const LeftMenu = AsyncComponent(() => import( "./configuration/common/components/LeftMenu"))
const Monitor = AsyncComponent(() => import( "./configuration/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./configuration/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./configuration/template/components/Template"))
const Setting = AsyncComponent(() => import( "./configuration/setting/common/SettingLayout"))
const Graphics = AsyncComponent(() => import( "./configuration/graphics/components/Graphics"))
const Login = AsyncComponent(() => import( "./login/Login"))
const HomePage = AsyncComponent(() => import('./home/components/HomePage'))
const Index = AsyncComponent(() => import('./home/common/HomeLayout'))
const HostDetails = AsyncComponent(() => import('./configuration/host/components/Host'))
const ProjectInformation = AsyncComponent(() => import('./configuration/setting/projectInformation/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./configuration/setting/member/Member'))
const Permissions = AsyncComponent(() => import('./configuration/setting/permissions/Permissions'))
const GlobalSettings = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))
const GlobalSettingsTemplate = AsyncComponent(() => import('./setting/template/components/TemplateSetting'))
const GlobalSettingsHostGroup = AsyncComponent(() => import('./setting/hostGroup/components/HostGroup'))
const GlobalSettingsMonitorItem = AsyncComponent(() => import('./setting/MonitorItem/components/MonitorItem'))
const Monitoring = AsyncComponent(() => import('./monitorIng/monitoring/components/Monitoring'))
const MonitoringLayout = AsyncComponent(() => import('./monitorIng/monitoringDetails/common/MonitorLayout'))
const MonitoringDetails = AsyncComponent(() => import('./monitorIng/monitoringDetails/components/MonitoringDetails'))
const MonitoringGraphics = AsyncComponent(() => import('./monitorIng/monitoringDetails/components/MonitoringGraphics'))
// const MonitoringGraphicsOne = AsyncComponent(() => import('./monitorIng/monitoringDetails/components/MonitoringGraphicsOne'))


const Routes = [


    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to={"/home"}/>,
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
                exact: false,
                component: Configuration
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
                        path: "/hostList/:id/monitor",
                        exact: false,
                        component: Monitor,
                    },
                    {
                        path: "/hostList/:id/trigger",
                        exact: false,
                        component: Trigger,
                    },
                    {
                        path: "/hostList/:id/template",
                        exact: false,
                        component: Template,
                    },
                    {
                        path: "/hostList/:id/graphics",
                        exact: false,
                        component: Graphics,
                    },
                    {
                        path: "/hostList/:id/setting",
                        exact: false,
                        component: Setting,
                        routes: [
                            {
                                path: "/hostList/:id/setting/projectInformation",
                                exact: false,
                                component: ProjectInformation,
                            },
                            {
                                path: "/hostList/:id/setting/member",
                                exact: false,
                                component: Member,
                            },
                            {
                                path: "/hostList/:id/setting/permissions",
                                exact: false,
                                component: Permissions,
                            },
                        ]
                    },
                ]
            },
            {
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
                    {
                        path: "/monitoring/:id/monitoringGraphics",
                        exact: false,
                        component: MonitoringGraphics,
                    },
                ]
            },
            {
                path: "/globalSettings",
                exact: false,
                component: GlobalSettings,
                routes: [
                    {
                        path: "/globalSettings/template",
                        exact: false,
                        component: GlobalSettingsTemplate
                    },
                    {
                        path: "/globalSettings/hostGroup",
                        exact: false,
                        component: GlobalSettingsHostGroup
                    },
                    {
                        path: "/globalSettings/monitorItem",
                        exact: false,
                        component: GlobalSettingsMonitorItem
                    },
                ]
            }

        ]
    }


]
export default Routes;
