import HomePage from "./home/HomePage";
import Configuration from "./configuration/configurationPage/Configuration";
import App from "./App";
import Host from "./configuration/host/Host";
import LeftMenu from "./configuration/common/LeftMenu";
import Monitor from "./configuration/monitor/components/Monitor";
import Trigger from "./configuration/trigger/Trigger";
import Template from "./configuration/template/Template";
import Setting from "./configuration/setting/projectInformation/ProjectInformation";
import Graphics from "./configuration/graphics/Graphics";
import MonitorTemplateList from "./configuration/monitor/components/MonitorTemplate";
import MonitorHostList from "./configuration/monitor/components/MonitorHost";
import Member from "./configuration/setting/member/Member";
import Permissions from "./configuration/setting/permissions/Permissions"
import MonitorMock from "./configuration/monitor/mock/MonitorMock"

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
