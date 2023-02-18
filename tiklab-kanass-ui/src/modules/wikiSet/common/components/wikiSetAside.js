/*
 * @Descripttion: 项目详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-19 13:13:36
 */

import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Layout, Button } from "antd";

import { useTranslation } from 'react-i18next';
//import "../../../../assets/font-icon/iconfont";
const { Sider } = Layout;

const WikiSetAside = (props) => {
    console.log(props)
    const { t } = useTranslation();
    const wikiId = props.match.params.wikiId;
    const wikiName = JSON.parse(localStorage.getItem("wiki")).wikiName
    // 路由
    const wikirouter = [
        {
            title: '知识库信息',
            icon: 'survey',
            key: `/index/wikiSet/${wikiId}/basicInfo`,
            encoded: "Survey",
        },
        {
            title: `${t('user')}`,
            icon: 'survey',
            key: `/index/wikiSet/${wikiId}/user`,
            encoded: "User",
        },
        {
            title: `${t('privilege')}`,
            icon: 'survey',
            key: `/index/wikiSet/${wikiId}/domainRole`,
            encoded: "Privilege",
        }
    ];
    // 当前选中路由
    const [selectKey, setSelectKey] = useState(`/index/wikiSet/${wikiId}/basicInfo`);

    // 菜单是否折叠
    const [isShowText, SetIsShowText] = useState(true)

    // 当前项目id
    // const wikiId = props.match.params.id


    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
        return
    }, [wikiId])


    /**
     * 点击左侧菜单
     * @param {*} key 
     */
    const selectKeyFun = (key) => {
        setSelectKey(key)
        props.history.push(key)

    }

    const backWiki = () => {
        props.history.push(`/index/wikidetail/${wikiId}/survey`)
    }


    return (
        <Fragment>
            <Sider trigger={null} collapsible collapsed={!isShowText} collapsedWidth="50" width="200">
                <div className={`wiki-set-aside ${isShowText ? "" : "wiki-icon"}`}>

                    <div className="wiki-set-title">
                        <span className={`${isShowText ? "" : "wiki-notext"}`} style={{ marginRight: "20px" }}>
                            设置
                        </span>
                    </div>
                    <div className={`wiki-set-back`}
                        onClick={() => backWiki()}
                    >
                        <svg className="menu-icon" aria-hidden="true">
                            <use xlinkHref="#icon-backwiki"></use>
                        </svg>
                        <span>
                        返回知识库
                        </span>
                    </div>
                    {/* <div className="wiki-set-back">
                        返回知识库
                    </div> */}
                    <ul className="wiki-menu">
                        {
                            wikirouter && wikirouter.map(Item => {
                                return <div className={`wiki-menu-submenu ${Item.key === selectKey ? "wiki-menu-select" : ""}`}
                                    key={Item.key}
                                    onClick={() => selectKeyFun(Item.key)}
                                >
                                    <span className={`${isShowText ? "" : "wiki-notext"}`}>
                                        {Item.title}
                                    </span>
                                </div>
                            })
                        }
                    </ul>
                </div>
            </Sider>
        </Fragment>
    )

}
export default withRouter(WikiSetAside);