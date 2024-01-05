import HomePage from "./home/HomePage";
import Configuration from "./configuration/configurationPage/Configuration";
import App from "./App";
import Host from "./configuration/host/Host";
import LeftMenu from "./configuration/common/LeftMenu";
import Monitor from "./configuration/monitor/Monitor";
import Trigger from "./configuration/trigger/Trigger";
import Template from "./configuration/template/Template";
import Setting from "./configuration/setting/Setting";
import Graphics from "./configuration/graphics/Graphics";
import MonitorTemplateList from "./configuration/monitor/MonitorTemplate";
import MonitorHostList from "./configuration/monitor/MonitorHost";
import Member from "./configuration/setting/Member";
import Permissions from "./configuration/setting/Permissions"
const Routes = [

    /*{
        path: "/",
        exact: true,
        component: HomePage,

    },
    {
        path: "/Configuration",
        component: Configuration,
        routes:[
            {
                path: "/Configuration/Host",
                component: Host,
                routes:[
                    {
                        path: "/Configuration/Host/LeftMenu",
                        exact: true,
                        component: LeftMenu,
                    },
                    {
                        path: "/Configuration/Host/Monitor",
                        exact: true,
                        component: Monitor,
                    },
                    {
                        path: "/Configuration/Host/MonitorTemplateList",
                        exact: true,
                        component: MonitorTemplateList,
                    },
                    {
                        path: "/Configuration/Host/MonitorHostList",
                        exact: true,
                        component: MonitorHostList,
                    },
                    {
                        path: "/Configuration/Host/Trigger",
                        exact: true,
                        component: Trigger,
                    },
                    {
                        path: "/Configuration/Host/Template",
                        exact: true,
                        component: Template,
                    },
                    {
                        path: "/Configuration/Host/Graphics",
                        exact: true,
                        component: Graphics,
                    },
                    {
                        path: "/Configuration/Host/Setting",
                        exact: true,
                        component: Setting,
                    },
                ]
            },
        ]
    },*/


    {
        path: "/",
        exact: true,
        component: HomePage,
    },{
        path: "/Configuration",
        exact: true,
        component: Configuration,
    },
    {
        path: "/Configuration/Host",
        exact: true,
        component: Host,
    },
    {
        path: "/Configuration/Host/LeftMenu",
        exact: true,
        component: LeftMenu,
    },
    {
        path: "/Configuration/Host/Monitor",
        exact: true,
        component: Monitor,
    },
    {
        path: "/Configuration/Host/MonitorTemplateList",
        exact: true,
        component: MonitorTemplateList,
    },
    {
        path: "/Configuration/Host/MonitorHostList",
        exact: true,
        component: MonitorHostList,
    },
    {
        path: "/Configuration/Host/Trigger",
        exact: true,
        component: Trigger,
    },
    {
        path: "/Configuration/Host/Template",
        exact: true,
        component: Template,
    },
    {
        path: "/Configuration/Host/Graphics",
        exact: true,
        component: Graphics,
    },
    {
        path: "/Configuration/Host/Setting",
        exact: true,
        component: Setting,
    },
    {
        path: "/Configuration/Host/Setting/member",
        exact: true,
        component: Member,
    },
    {
        path: "/Configuration/Host/Setting/permissions",
        exact: true,
        component: Permissions,
    },


]
export default Routes;
