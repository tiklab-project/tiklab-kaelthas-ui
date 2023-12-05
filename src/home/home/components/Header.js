/*
 * @Descripttion: 页面头部
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-01-08 10:44:07
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:16:03
 */
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Col, Row, Dropdown, Menu,  Space } from "antd";
import { withRouter } from 'react-router';
import logo from "../../../assets/images/logo_k4.png";
import Message from "./MessageList"
import { observer, inject } from "mobx-react";
import Search from "../../search/components/Search";
import { getUser } from 'tiklab-core-ui';
const Header = props => {
    const {systemRoleStore, HelpLink, AppLink, AvatarLink} = props;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    useEffect(() => {
        if (user && user.userId) {
            systemRoleStore.getSystemPermissions(user.userId, "kanass")
        }
        return;
    }, [])

    const routers = [
        {
            to:'/home',
            title: '首页',
            key: 'home'
        },
        {
            to:'/repository',
            title:'知识库',
            key: 'repository'
        },
        {
            to:'/sysmgr/systemFeature',
            title:'系统',
            key: 'sysmgr'
        }
    ]
    const user = getUser();

    const changeCurrentLink = item => {
        localStorage.removeItem("sprintId")
        props.history.push(item.to)
        sessionStorage.setItem("menuKey", item.key)
    }

    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'frame-header-link'}>
                    <div key='home' onClick={() => changeCurrentLink(routers[0])} className={`frame-header-link-item ${menuKey === "home" ? 'frame-header-link-active' : null}`}> <span>{routers[0].title}</span> </div>
                    <div key='repository' onClick={() => changeCurrentLink(routers[1])} className={`frame-header-link-item ${menuKey === "repository" ? 'frame-header-link-active' : null}`}> <span>{routers[1].title}</span> </div>
                </div>
            )
        }
    }

    const goSet = (url) => {
        props.history.push(url)
        sessionStorage.setItem("menuKey", "set")
    };


    return (
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-left'}>
                    <AppLink isSSO={false} />
                    {logo && <div className={'frame-header-logo'}><img src={logo} alt={'logo'} /></div>}
                    {renderRouter()}
                </div>
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    <div className='frame-header-right-search-wrap'>
                        <Search />
                    </div>
                    <div className={'frame-header-right-text'}>
                        <div className="frame-header-icon">
                            <div className="frame-header-set" data-title="系统设置" onClick={() => goSet("/setting/organ")}>
                                <Space>
                                    <svg aria-hidden="true" className="header-icon">
                                        <use xlinkHref="#icon-iconsetsys"></use>
                                    </svg>
                                </Space>
                            </div>
                        </div>
                        <Message />
                        <HelpLink />
                        <AvatarLink {...props} />
                    </div>
                </div>
            </Col>
            
        </Row>
    )
}
export default withRouter(inject( "systemRoleStore")(observer(Header)));