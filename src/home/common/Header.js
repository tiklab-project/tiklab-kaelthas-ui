import React from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Space} from "antd";
import {withRouter} from 'react-router';
import {getUser} from 'thoughtware-core-ui';
import logo from "../../assets/png/monitorPng.png"

import "./Header.scss";
import MessageList from "./MessageList";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";

const Header = props => {
    // 语言包
    const {i18n} = useTranslation();
    // 登录者的信息
    const user = getUser();

    const {AppLink, HelpLink, AvatarLink} = props;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    const {setNullCondition} = alarmPageStore;

    /**
     * 点击菜单跳转
     * @param {菜单信息} item
     */
    const changeCurrentLink = async item => {

        if ("alarm" === item.key) {
            setNullCondition()
        }

        localStorage.removeItem("sprintId")
        sessionStorage.setItem("menuKey", item.key)
        props.history.push(item.to)
    }

    /**
     * 渲染左侧菜单
     * @returns
     */
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
                                    {item.title}
                                </span>

                            </div>
                        })
                    }
                </div>
            )
        }
    }


    /**
     * 跳转到系统设置
     */
    const goSet = () => {
        props.history.push("/setting/home")
        sessionStorage.setItem("menuKey", null)
    };

    // 系统顶部菜单
    const routers = [
        {
            to: '/home',
            title: '首页',
            key: 'home'
        },
        {
            to: '/configuration',
            title: '主机',
            key: 'configuration'
        },
        {
            to: '/alarm',
            title: '告警',
            key: 'alarm'
        },

    ]

    function hrefHome() {
        props.history.push("/home")
    }

    return (
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-left'}>
                    <div className="frame-header-left-choose">
                        {AppLink}
                    </div>
                    {
                        logo &&
                        <div className={'frame-header-logo'} onClick={() => hrefHome()}>
                            <img src={logo} alt={'logo'} className="logo-img"/>
                            <div className="logo-text">Xmonitor</div>
                        </div>
                    }
                </div>
            </Col>
            <Col>
                <div className={'frame-header-right'}>
                    <div className={'frame-header-right-text'}>
                        {/*<div className="frame-header-icon">
                            <div className="frame-header-set" data-title-bottom="系统设置" onClick={() => goSet()}>
                                <Space>
                                    <svg aria-hidden="true" className="header-icon">
                                        <use xlinkHref="#icon-iconsetsys"></use>
                                    </svg>
                                </Space>
                            </div>
                        </div>*/}
                        <MessageList/>
                        {AvatarLink}
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default withRouter(Header);