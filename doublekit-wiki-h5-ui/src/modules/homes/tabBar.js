import React, {useState} from "react";
import { Badge, TabBar } from 'antd-mobile'
import {AppOutline,UnorderedListOutline, UserOutline} from 'antd-mobile-icons'
import { withRouter } from "react-router";
import { useLocation } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import "./tabBar.scss"
const WikiTabBar = (props) => {
    const location = useLocation()
    const { pathname } = location
    const route = props.route;
    const tabs = [
        {
            key: '/index/wiki',
            title: '我的知识库',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: '/template',
            title: '模板',
            icon: <UserOutline />,
        },
    ]
    const setRouteActive = (value) => {
        props.history.push(value)
      }

    return (
        <div className="tabbar">
            <div className="content">
                {renderRoutes(route.routes)}
            </div>
            <div className='bottom'>
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
            </div>
        </div>
    )
}
export default withRouter(WikiTabBar);