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
const HomePage = AsyncComponent(() => import('./home/common/components/HomePage'))
const Index = AsyncComponent(() => import('../src/home/common/components/HomeLayout'))
const HostDetails = AsyncComponent(() => import('./configuration/host/components/Host'))
const ProjectInformation = AsyncComponent(() => import('./configuration/setting/projectInformation/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./configuration/setting/member/Member'))
const Permissions = AsyncComponent(() => import('./configuration/setting/permissions/Permissions'))


const Routes = [


    {
        path: "/login",
        exact: true,
        component: Login,
    },
    /*{
        path: "/",
        exact: true,
        component: () => <Redirect to="/home"/>,
    },*/
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
                        routes:[
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

        ]
    }


    /*{
        path: "/",
        exact: true,
        component: HomePage,

    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },

    {
        path: "/configuration",
        component: Configuration,
        exact: true
    },
    {
        path: "/configuration/host",
        component: Host,
        exact: true
    }
    ,
    {
        path: "/configuration/host/leftMenu",
        exact: true,
        component: LeftMenu,
    },
    {
        path: "/configuration/host/monitor",
        exact: true,
        component: Monitor,
    },
    {
        path: "/configuration/host/trigger",
        exact: true,
        component: Trigger,
    },
    {
        path: "/configuration/host/template",
        exact: true,
        component: Template,
    },
    {
        path: "/configuration/host/graphics",
        exact: true,
        component: Graphics,
    },
    {
        path: "/configuration/host/setting",
        exact: true,
        component: Setting,
    }*/


]
export default Routes;
