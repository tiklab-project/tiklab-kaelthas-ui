import HomePage from "./index/HomePage";
import Configuration from "./index/configuration/Configuration";
import App from "./App";
import PopUp from "./index/PopUp";
import Host from "./index/configuration/host/Host";

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
        exact: true,
        component: App,
    },
    {
        path: "/Configuration/PopUp",
        exact: true,
        component: PopUp,
    },
    {
        path: "/Configuration/Host",
        exact: false,
        component: Host,
    },


]
export default Routes;