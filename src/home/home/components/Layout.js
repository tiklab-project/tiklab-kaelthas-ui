/*
 * @Descripttion: 页面主题框架
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 16:14:15
 */
import React from 'react';

import { renderRoutes } from "react-router-config";
import Header from "./Header";
import "../components/header.scss";
import { UserVerify } from 'thoughtware-eam-ui';
import { connect } from 'thoughtware-plugin-core-ui/es';
import { AppLink, HelpLink, AvatarLink } from 'thoughtware-licence-ui';
const Layout = (props) => {
    const route = props.route ? props.route.routes : [];

    return (
        <div className="frame">
            <Header
                {...props}
                AppLink={AppLink}
                HelpLink={HelpLink}
                AvatarLink={AvatarLink}
            >
            </Header>
            <div className="frame-content">
                {renderRoutes(route)}
            </div>
        </div>
    )
}


const IndexHoc = UserVerify(Layout, '/no-auth')
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}
export default connect(mapStateToProps)(IndexHoc);