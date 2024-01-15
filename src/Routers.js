import AsyncComponent from "./common/lazy/AsyncComponent";

const Configuration = AsyncComponent(() => import( "./configuration/configurationPage/components/Configuration"))
const Host = AsyncComponent(() => import( "./configuration/host/Host"))
const LeftMenu = AsyncComponent(() => import( "./configuration/common/compnoents/LeftMenu"))
const Monitor = AsyncComponent(() => import( "./configuration/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./configuration/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./configuration/template/components/Template"))
const Setting = AsyncComponent(() => import( "./configuration/setting/projectInformation/ProjectInformation"))
const Graphics = AsyncComponent(() => import( "./configuration/graphics/components/Graphics"))
const Login = AsyncComponent(() => import( "./login/Login"))
const HomePage = AsyncComponent(() => import('./home/common/components/HomePage'))
const HostLayout = AsyncComponent(() => import('../src/home/common/components/HomeLayout'))


const Routes = [


    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/",
        component: HostLayout,
        routes: [

            {
                path: "/home",
                exact: true,
                component: HomePage,
            },
            {
                path: "/configuration",
                component: Configuration
            }
            ,
            {
                path: "/hostList/:id/hostDetails",
                component: Host,
            },
            {
                path: "/hostList/:id/monitor",
                component: Monitor,
            },
            {
                path: "/hostList/:id/trigger",
                component: Trigger,
            },
            {
                path: "/hostList/:id/template",
                component: Template,
            },
            {
                path: "/hostList/:id/graphics",
                component: Graphics,
            },
            {
                path: "/hostList/:id/setting",
                component: Setting,
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
