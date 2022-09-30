/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-20 13:34:14
 */
import React, { Fragment } from 'react';
import logo from "../../../assets/images/logo_k.png";
import { renderRoutes } from "react-router-config";
import LocalHeader  from "./localHeader";
import "./header.scss";
import Search from '../../search/components/search';
import { useWorkAppConfig, verifyUserHoc } from 'tiklab-eam-ui';
import { connect } from 'tiklab-plugin-ui/es/_utils';

import apiboxImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import jenkinsImg from 'tiklab-eam-ui/es/assests/img/jenkins.png';
import knowledgeImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import projectImg from 'tiklab-eam-ui/es/assests/img/project.png';

const Portal = (props) => {
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
            to:'/index/sysmgr/systemFeature',
            title:'系统',
            key: 'sysmgr'
        }
    ]

    const productIcons = {
        postin:apiboxImg,
        teamwire:projectImg,
        teston:jenkinsImg,
        kanass:knowledgeImg
    }
    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false, productIcons);
    const route = props.route;
    const projectLogout = () => {
        props.history.push({
            pathname:'/logout',
            state: window.location.href
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

const IndexHoc = verifyUserHoc(Portal)
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}
export default connect(mapStateToProps)(IndexHoc);