import Routers from "./Routers";
import Header from "./home/common/Header";
import HomeLayout from "./home/common/HomeLayout";
import AsyncComponent from "./common/lazy/AsyncComponent";
import App from "./app";
const Configuration = AsyncComponent(() => import( "./host/hostPage/components/Host"))
const Host = AsyncComponent(() => import( "./host/common/components/HostLayout"))
const Monitor = AsyncComponent(() => import( "./host/monitor/components/Monitor"))
const Trigger = AsyncComponent(() => import( "./host/trigger/components/Trigger"))
const Template = AsyncComponent(() => import( "./host/template/components/Template"))
const HostSetting = AsyncComponent(() => import( "./host/setting/common/SettingLayout"))
const Graphics = AsyncComponent(() => import( "./host/graphics/components/Graphics"))
const Login = AsyncComponent(() => import( "./login/ProjectLogin"))
const Logout = AsyncComponent(() => import( "./login/ProjectLogout"))
const HomePage = AsyncComponent(() => import('./home/components/HomePage'))
const Home = AsyncComponent(() => import('./home/common/Home'))
const HostDetails = AsyncComponent(() => import('./host/hostDetails/components/HostDetails'))
const HostDynamic = AsyncComponent(() => import('./host/hostDetails/components/HostDynamic'))
const ProjectInformation = AsyncComponent(() => import('./host/setting/projectInformation/components/ProjectInformation'))
const Member = AsyncComponent(() => import('./host/setting/member/Member'))
const Permissions = AsyncComponent(() => import('./host/setting/permissions/Permissions'))
const GlobalSettings = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))
const GlobalSettingsTemplate = AsyncComponent(() => import('./setting/template/components/TemplateSetting'))
const TemplateMonitor = AsyncComponent(() => import('./setting/template/components/TemplateSettingMonitorList'))
const HostGroup = AsyncComponent(() => import('./setting/hostGroup/components/HostGroup'))
const GlobalSettingsMonitorItem = AsyncComponent(() => import('./setting/MonitorItem/components/MonitorItem'))
const Monitoring = AsyncComponent(() => import('./monitorIng/monitoring/components/Monitoring'))
const MonitoringLayout = AsyncComponent(() => import('./monitorIng/monitoringDetails/common/MonitorLayout'))
const MonitoringDetails = AsyncComponent(() => import('./monitorIng/monitoringDetails/components/MonitoringDetails'))
const AlarmLayout = AsyncComponent(() => import('./alarm/common/components/AlarmLayout'))
const AlarmPage = AsyncComponent(() => import('./alarm/alarmPage/components/AlarmPage'))
const AddHost = AsyncComponent(() => import('./host/hostPage/components/AddHost'))
const SettingHome = AsyncComponent(() => import('./setting/home/component/SettingHome'))
const VersionContent = AsyncComponent(() => import('./setting/version/VersionContent'))

const HostConfiguration = AsyncComponent(() => import('./host/configuration/common/Configuration'))
const HostAlarm = AsyncComponent(() => import('./host/hostAlarm/components/HostAlarm'))
const SettingContent = AsyncComponent(() => import('./setting/common/SettingContent'))

const Setting = AsyncComponent(() => import('./setting/common/GlobalSettingLayout'))

export {

    Routers,

    Header,

    HomeLayout,

    Configuration,

    Host,

    Monitor,

    Trigger,

    Template,

    HostSetting,

    Graphics,

    Login,

    Logout,

    HomePage,

    Home,

    HostDetails,

    HostDynamic,

    ProjectInformation,

    Member,

    Permissions,

    GlobalSettings,

    GlobalSettingsTemplate,

    TemplateMonitor,

    HostGroup,

    GlobalSettingsMonitorItem,

    Monitoring,

    MonitoringLayout,

    MonitoringDetails,

    AlarmLayout,

    AlarmPage,

    AddHost,

    SettingHome,

    VersionContent,

    HostConfiguration,

    HostAlarm,

    SettingContent,

    Setting,

    App
}