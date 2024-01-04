import HomePage from "./home/HomePage";
import Configuration from "./configuration/Configuration";
import App from "./App";
import PopUp from "./configuration/AddHost";
import Host from "./configuration/host/Host";
import LeftMenu from "./configuration/common/LeftMenu";
import Monitor from "./configuration/monitor/Monitor";
import Trigger from "./configuration/trigger/Trigger";
import Template from "./configuration/template/Template";
import Setting from "./configuration/setting/Setting";
import Graphics from "./configuration/graphics/Graphics";
import MonitorTemplateList from "./configuration/monitor/MonitorTemplate";
import MonitorHostList from "./configuration/monitor/MonitorHost";

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


]
export default Routes;
