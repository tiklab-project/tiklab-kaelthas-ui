# 目录说明

# alarm

一级目录中的告警模块

# common

## component

| 目录    | 文件      | 说明                         |
| ------- | --------- | ---------------------------- |
| btn     | Btn       | 一级目录的消息按钮           |
| list    | ListEmpty | 暂无数据                     |
| profile | Profile   | 用户头像或者使用用户名转头像 |

## graphics

| 文件            | 说明                         |
| --------------- | ---------------------------- |
| AreaCharts      | 面积图形的展示               |
| ChangeViewChart | 监控页面的图形切换按钮       |
| DiscountedList  | 折线图形展示                 |
| HistogramList   | 柱状图                       |
| MonitoringItem  | 传递数据，用于切换图形的组件 |



## hideDelete

列表后的三个点的删除按钮



## language

语言包



## layout

| 文件          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| Home          | 对HomeLayout组件的进一步封装，ee和cloud版本的可以传递不同的组件 |
| HomeLayout    | 一级目录，包含了主机监控、数据库监控、k8s监控等，以及下面的系统设置等 |
| IconCommon    | icon封装，我没有使用                                         |
| MoreMenuModel | 一级菜单的折叠效果的实现组件                                 |
| PortalMessage | 一级菜单下的消息通知组件                                     |

## lazy

| 文件           | 说明                                                       |
| -------------- | ---------------------------------------------------------- |
| AsyncComponent | 按需加载的组件，使用了之后不会一下将页面所有的组件全部加载 |

## styles

| 文件            | 说明                                     |
| --------------- | ---------------------------------------- |
| _base.scss      | 高度和颜色的定义                         |
| _color.scss     | 色彩定义，样式定义                       |
| _index.scss     | 样式的定义                               |
| _normalize.scss | 样式的定义                               |
| _tabStyle.scss  | 对antd部分组件的重新定义                 |
| base.scss       | 对antd更多组件的定义，例如滚动条、表格等 |

## utils

| 文件    | 说明                            |
| ------- | ------------------------------- |
| requset | 封装的post请求方法，Service方法 |

| 文件       | 说明                                             |
| ---------- | ------------------------------------------------ |
| IconCommon | icon头像的封装                                   |
| Profile    | 用户头像或者使用用户名转头像，与上述的大小不一致 |



# databases

一级菜单当中，数据库的监控模块

| 文件夹        | 说明                   |
| ------------- | ---------------------- |
| databasesPage | 数据库监控页面         |
| dbAlarm       | 数据库监控中的告警模块 |
| dbDetails     | 数据库的概况页面       |
| dbMonitoring  | 数据库的监控模块       |



## common

| 文件         | 说明                             |
| ------------ | -------------------------------- |
| ConfigHeader | 进入数据库监控当中的头部         |
| DbLayout     | 进入数据库里面页面路由的转发路由 |



## configs

| 文件夹     | 说明                                     |
| ---------- | ---------------------------------------- |
| common     | 配置页面的路由转发，配置页面下有几个模块 |
| customize  | 自定义SQL的页面，暂时没有开发            |
| dbGraphics | 数据库监控当中的图形配置                 |
| monitor    | 数据库监控的监控项页面                   |
| template   | 数据库监控中的模板，暂未开发             |
| trigger    | 数据库监控的触发器                       |

## setting

| 文件夹        | 文件          | 说明                 |
| ------------- | ------------- | -------------------- |
| common        | DbSetting     | 设置页面的路由转发   |
| common        | DbSettingTabs | 设置页面的头部       |
| dbMember      | DbMember      | 成员组件             |
| dbPermissions | DbPermissions | 权限组件             |
| dbProject     | DbProject     | 项目的编辑和删除组件 |



# home

首页的页面组件



# host



| 文件夹       | 说明                   |
| ------------ | ---------------------- |
| hostAlarm    | 主机当中的告警         |
| hostOverview | 主机当中的概况模块     |
| hostPage     | 主机的页面以及增删改查 |
| monitoring   | 主机的监控模块         |



## common

| 文件       | 说明             |
| ---------- | ---------------- |
| Breadcrumb | 主机概况下的组件 |
| HostLayout | 主机下的路由转发 |
| TopMenu    | 主机下的头部     |



## config

| 文件夹   | 说明                     |
| -------- | ------------------------ |
| common   | 配置页面的路由转发       |
| graphics | 主机监控下的图形模块组件 |
| monitor  | 主机监控下的监控项组件   |
| template | 主机监控下的模板组件     |
| trigger  | 主机监控下的触发器组件   |



## setting

| 文件夹      | 文件               | 说明                 |
| ----------- | ------------------ | -------------------- |
| common      | DbSetting          | 设置页面的路由转发   |
| common      | DbSettingLeftTabs  | 设置页面的头部       |
| member      | Member             | 成员组件             |
| permissions | Permissions        | 权限组件             |
| project     | ProjectInformation | 项目的编辑和删除组件 |



# internet

一级目录当中的网络监控



| 文件夹           | 说明                     |
| ---------------- | ------------------------ |
| internetAlarm    | 网络监控的告警模块       |
| internetOverview | 网络监控的概况模块       |
| internetPage     | 网络监控列表信息的展示   |
| monitoring       | 网络监控中的监控模块组件 |



## common

| 文件           | 说明               |
| -------------- | ------------------ |
| InConfigHeader | 网络监控当中的头部 |
| InternetLayout | 网络监控的路由转发 |



## config

| 文件夹   | 说明               |
| -------- | ------------------ |
| common   | 配置目录下的根路由 |
| graphics | 网络下的图形配置   |
| monitor  | 网络下的监控项配置 |
| trigger  | 网络下的触发器配置 |

## setting

| 文件夹             | 文件               | 说明                             |
| ------------------ | ------------------ | -------------------------------- |
| common             | SettingLayout      | 设置页面的根路由                 |
| common             | SettingLeftTabs    | 设置页面的头部信息               |
| member             | Member             | 网络监控中的成员组件             |
| permissions        | Permissions        | 网络监控中的权限组件             |
| projectInformation | ProjectInformation | 网络监控中的项目的修改和删除页面 |



# k8s

一级目录当中的k8s监控

| 文件夹       | 说明                                |
| ------------ | ----------------------------------- |
| kuAlarm      | k8s监控当中的告警模块               |
| kuMonitoring | k8s监控当中的监控模块，用于图形展示 |
| kuPage       | k8s监控的列表信息展示               |
| overview     | k8s监控的概况页面                   |



## common

| 文件             | 说明                  |
| ---------------- | --------------------- |
| KubernetesLayout | k8s监控的根路由       |
| KuConfigHeader   | k8s内部页面的头部信息 |



## configs

| 文件夹   | 目录                            |
| -------- | ------------------------------- |
| common   | 配置页面的根路由                |
| graphics | k8s监控的图形配置               |
| monitor  | k8s监控的监控项配置             |
| template | k8s监控的模板配置，暂时没有开发 |
| trigger  | k8s监控的触发器配置             |



## setting

| 文件夹        | 文件          | 说明                |
| ------------- | ------------- | ------------------- |
| common        | KuSetting     | 设置页面的根路由    |
| common        | KuSettingTabs | 设置页面的头部      |
| kuMember      | KuMember      | k8s监控的成员组件   |
| kuPermissions | KuPermissions | k8s监控的权限组件   |
| kuProject     | KuProject     | k8s监控的编辑和删除 |



# login

登录以及与登录有关的组件

| 文件                | 说明                                 |
| ------------------- | ------------------------------------ |
| LoginRpwContent     | 密码等级过低验证组件，会提示修改密码 |
| ProjectLogin        | 登录组件                             |
| ProjectLogout       | 退出登录组件                         |
| SysExceptionContent | 系统异常组件                         |



# setting

项目的设置

| 文件夹    | 文件                | 说明                                   |
| --------- | ------------------- | -------------------------------------- |
| common    | GlobalSettingLayout | 设置目录的菜单定义，根路由             |
| common    | SettingContent      | 设置中列表的开合以及存在列表数据的组件 |
| home      | SettingHome         | 设置页面中的首页                       |
| hostGroup | HostGroup           | 设置页面中的用户组                     |
| version   | VersionContent      | 版本与许可证页面                       |



### template

| 文件                       | 说明                               |
| -------------------------- | ---------------------------------- |
| AddTemplateMonitor         | 添加模板中的监控项组件             |
| TemplateSetting            | 设置中的模板查询和删除             |
| TemplateSettingAdd         | 模板的创建                         |
| TemplateSettingMonitorList | 设置中模板中监控项的查询和删除页面 |
| TemplateSettingUpdate      | 设置中模板的修改                   |
| UpdateTemplateMonitor      | 设置中模板下监控项的修改           |

