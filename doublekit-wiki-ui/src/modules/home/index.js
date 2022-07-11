/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-20 13:34:14
 */
import React, { Fragment } from 'react';
import logo from "../../assets/images/logo.png";
import { renderRoutes } from "react-router-config";
import { withRouter } from 'react-router';
import useAppConfig from "../../common/hooks/appLink";
import LocalHeader  from "./components/localHeader";
import "./components/header.scss";
import Search from '../search/container/search';
import { loginOutAcc, useWorkAppConfig, verifyUserHoc } from 'doublekit-eam-ui';
import { connect } from 'doublekit-plugin-ui';
const Layout = (props) => {
    const headerRouter = [
        {
            to:'/index/home',
            title: '首页',
            key: 'home'
        },
        {
            to:'/index/wiki',
            title:'知识库',
            key: 'wiki'
        },
        {
            to:'/index/template',
            title:'模板',
            key: 'template'
        },
        {
            to:'/index/sysmgr',
            title:'系统',
            key: 'sysmgr'
        }
    ]
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);
    const route = props.route;
    const projectLogout = () => {
        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    return (
        <div className="frame">
            <LocalHeader
                {...props}
                logo={logo}
                AppConfigComponent={component}
                projectLogout={projectLogout}
                search={<Search {...props}/>}
                routers={headerRouter}
            />
            <div>
                {renderRoutes(route.routes)}
            </div>
            {ModalComponent}
            {editOrAddModal}
        </div>
    )
}

// const IndexHoc = verifyUserHoc(Layout)
// function mapStateToProps(state) {
//     return {
//         pluginStore: state.pluginStore
//     }
// }
// export default connect(mapStateToProps)(IndexHoc);
export default Layout;