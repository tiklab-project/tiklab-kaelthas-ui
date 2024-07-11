import React, {useEffect} from 'react';

import {renderRoutes} from "react-router-config";
import "./HomeLayout.scss";

import {Provider} from 'mobx-react';
import Header from "./Header";
import {AppLink, AvatarLink, HelpLink} from "thoughtware-licence-ui";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {Tooltip} from "antd";

const HomeLayout = (props) => {

    const route = props.route.routes;

    let hostId = localStorage.getItem('hostId');

    const {setNullCondition} = alarmPageStore;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    let url = localStorage.getItem('url');

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
            name: '告警',
            url: '/alarm',
            key: 'alarm',
        }

    ];

    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'frame-header-link'}>
                    {
                        routers.map(item => {
                            return <div key={item.key}
                                        onClick={() => changeCurrentLink(item)}
                                        className={`frame-header-link-item ${menuKey === item.key ? 'frame-header-link-active' : null}`}
                            >
                                <span>
                                    {item.name}
                                </span>
                            </div>
                        })
                    }
                </div>
            )
        }
    }

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
        console.log(url)
        props.history.push(url)
    }

    /**
     * 跳转到系统设置
     */
    const goSet = () => {
        props.history.push("/setting/home")
        sessionStorage.setItem("menuKey", null)
    };

    return (
        <Provider>
            <div className="frame">
                <Header AppLink={<AppLink/>} HelpLink={<HelpLink/>} AvatarLink={<AvatarLink/>} {...props} />
                <div className="frame-content">
                    <div className="frame-content-left">
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
                            <div className="host-left-button">
                                <HelpLink/>
                            </div>
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
                    </div>
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}

export default HomeLayout;