import HomePage from "./index/home/HomePage";
import Configuration from "./index/configuration/Configuration";
import App from "./App";
import PopUp from "./index/PopUp";
import Host from "./index/configuration/host/Host";
import LeftMenu from "./common/LeftMenu";
import Monitor from "./index/configuration/monitor/Monitor";
import Trigger from "./index/configuration/trigger/Trigger";
import Template from "./index/configuration/template/Template";
import Setting from "./index/configuration/setting/Setting";
import Graphics from "./index/configuration/graphics/Graphics";
import MonitorTemplateList from "./index/configuration/monitor/MonitorTemplateList";
import MonitorHostList from "./index/configuration/monitor/MonitorHostList";

const Routes = [
    {
        path: "/",
        exact: true,
        component: HomePage,
    },{
        path: "/Configuration",
        exact: true,
        component: Configuration,
    },{
        path: "/App",
        component: App,
    },
    {
        path: "/Configuration/PopUp",
        exact: true,
        component: PopUp,
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
        path: "/Configuration/Host/Setting",
        exact: true,
        component: Setting,
    },
    {
        path: "/Configuration/Host/Graphics",
        exact: true,
        component: Graphics,
    },


]
export default Routes;
