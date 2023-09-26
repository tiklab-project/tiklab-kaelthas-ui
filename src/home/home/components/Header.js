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

import Message from "./MessageList"
import { observer, inject } from "mobx-react";
import { AppLink } from 'tiklab-licence-ui';
import { getUser } from 'tiklab-core-ui';
import Search from "../../search/components/Search";
const Header = props => {
    const {logo,routers,systemRoleStore, HelpLink,  AvatarLink} = props;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/index/home") ? sessionStorage.getItem("menuKey") : "home";

    useEffect(() => {
        if (user && user.userId) {
            systemRoleStore.getSystemPermissions(user.userId, "kanass")
        }
    }, [])

  
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
                    <div key='home' onClick={() => changeCurrentLink(routers[0])} className={`frame-header-link-item ${menuKey === "home" ? 'frame-header-link-active' : null}`}> {routers[0].title}</div>
                    <div key='repository' onClick={() => changeCurrentLink(routers[1])} className={`frame-header-link-item ${menuKey === "repository" ? 'frame-header-link-active' : null}`}> {routers[1].title}</div>
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
                            <div className="frame-header-set" data-title="系统设置" onClick={() => goSet("/index/setting/organ")}>
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