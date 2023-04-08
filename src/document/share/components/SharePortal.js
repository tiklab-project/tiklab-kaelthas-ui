/*
 * @Descripttion: 页面主题框架
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 16:14:15
 */
import React, { useEffect, useState } from 'react';
import logo from "../../../assets/images/logo_k3.png";
import "./SharePortal.scss";
import ShareDocument from "./ShareDocument";
import { Dropdown, Space } from "antd";

const SharePortal = (props) => {

    const routers = [
        {
            to: '/index/home',
            title: '首页',
            key: 'home'
        },
        {
            to: '/index/repository',
            title: '知识库',
            key: 'repository'
        },
        {
            to: '/index/sysmgr/systemFeature',
            title: '系统',
            key: 'sysmgr'
        }
    ]

    const projectLogout = () => {
        props.history.push({
            pathname: '/logout',
            state: {
                preRoute: props.location.pathname
            }
        })
    }
    const helpMenu = (
        <div className="help-box">
            <div className="help-head">
                帮助
            </div>
            <div className="help-item">
                <span className="help-item-left">
                    <svg aria-hidden="true" className="svg-icon">
                        <use xlinkHref="#icon-doc"></use>
                    </svg>
                    文档
                </span>

                <svg aria-hidden="true" className="svg-icon">
                    <use xlinkHref="#icon-jump"></use>
                </svg>
            </div>
            <div className="help-item">
                <span className="help-item-left">
                    <svg aria-hidden="true" className="svg-icon">
                        <use xlinkHref="#icon-cuservice"></use>
                    </svg>
                    社区支持
                </span>

                <svg aria-hidden="true" className="svg-icon">
                    <use xlinkHref="#icon-jump"></use>
                </svg>
            </div>
            <div className="help-item">
                <span className="help-item-left">
                    <svg aria-hidden="true" className="svg-icon">
                        <use xlinkHref="#icon-workorder"></use>
                    </svg>
                    在线工单
                </span>

                <svg aria-hidden="true" className="svg-icon">
                    <use xlinkHref="#icon-jump"></use>
                </svg>
            </div>
            <div className="help-item">
                <span className="help-item-left">
                    <svg aria-hidden="true" className="svg-icon">
                        <use xlinkHref="#icon-community"></use>
                    </svg>
                    在线客服
                </span>

                <svg aria-hidden="true" className="svg-icon">
                    <use xlinkHref="#icon-jump"></use>
                </svg>
            </div>
        </div>
    )
    return (
        <div className="share-page">
            <div className="share-page-head">
                <div className='share-page-logo'><img src={logo} alt={'logo'} /></div>
                <div className="share-header-icon">
                    <div className="share-header-help" data-title="帮助与支持">
                        <Dropdown overlay={helpMenu} trigger={"click"}>
                            <Space>
                                <svg aria-hidden="true" className="header-icon" style={{ stroke: '#fff' }} >
                                    <use xlinkHref="#icon-help"></use>
                                </svg>
                            </Space>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <ShareDocument />
        </div>
    )
}


export default SharePortal;