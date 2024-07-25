import React from 'react';

import {renderRoutes} from "react-router-config";
import "./HomeLayout.scss";

import {Provider} from 'mobx-react';
import Header from "./Header";
import {AppLink, AvatarLink, HelpLink} from "thoughtware-licence-ui";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {Tooltip} from "antd";
import VipType from "./VipType";
import {useHistory} from "react-router";

const HomeLayout = (props) => {

    const route = props.route.routes;

    let hostId = localStorage.getItem('hostId');

    const {setNullCondition} = alarmPageStore;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    const history = useHistory()

    const routers = [
        {
            name: '首页',
            url: '/home',
            key: 'home',
        },
        {
            name: '主机',
            url: '/configuration',
            key: 'host',
        },
        {
            name: '数据',
            url: '/db',
            key: 'db',
        },
        {
            name: '告警',
            url: '/alarm',
            key: 'alarm',
        }
    ];

    /**
     * 点击菜单跳转
     * @param {菜单信息} item
     */
    const changeCurrentLink = async item => {

        if ("alarm" === item.key) {
            setNullCondition()
        }
        sessionStorage.setItem("menuKey", item.key)
        props.history.push(item.url)
    }

    const selectMenu = (url, key) => {
        if (key === "host") {
            localStorage.setItem("configurationUrl", `/hostList/${hostId}/configuration/monitor`)
        }
        if ("alarm" === key) {
            setNullCondition()
        }
        localStorage.setItem("url", url)
        sessionStorage.setItem("menuKey", key)
        props.history.push(url)
    }

    /**
     * 跳转到系统设置
     */
    const goSet = () => {
        props.history.push("/setting/version")
        sessionStorage.setItem("menuKey", null)
    };

    function showMainMenu() {
        let pathname =  history.location.pathname;

        if (!pathname.startsWith("/setting")) {

            return <div className="frame-content-left">
                <div className="host-left">
                    {
                        routers.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => selectMenu(item.url, item.key)}
                                    className={`leftMenu-host ${menuKey === item.key ? "border-left" : ""}`}
                                >
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-${item.key}`}></use>
                                    </svg>
                                    <span className="leftMenu-text">
                                                {item.name}
                                            </span>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className="host-left-button"
                         onClick={() => goSet()}
                    >
                        <Tooltip title="设置" placement="right">
                            <svg aria-hidden="true" className="header-icon">
                                <use xlinkHref="#icon-iconsetsys"></use>
                            </svg>
                        </Tooltip>
                    </div>
                </div>
            </div>;
        }
    }

    return (
        <Provider>
            <div className="frame">
                <Header AppLink={<AppLink/>} HelpLink={<HelpLink/>} AvatarLink={<AvatarLink {...props}/>}
                        VipType={<VipType/>}/>
                <div className="frame-content">
                    {showMainMenu()}
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}

export default HomeLayout;