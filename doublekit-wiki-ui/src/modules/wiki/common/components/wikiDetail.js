/*
 * @Descripttion: 知识库详情页
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:06:15
 */
import React, { useState,useEffect } from "react";
import { Layout,Row,Col } from 'antd';
import WikideAside from "./wikiDetailAside";
import "../components/wikiDetail.scss";
import { renderRoutes } from "react-router-config";
import {observer, inject} from "mobx-react";
import {getUser} from 'doublekit-core-ui'

const WikiDetail = (props)=>{
    // 解析props
    const {wikiStore,wikiDetailStore,systemRoleStore,route} = props;

    // 解析wikiStore，wikiDetailStore
    const {searchwiki, getWikilist, wikilist} = wikiStore;
    const {setWikiId} = wikiDetailStore;
    const {getInitProjectPermissions} = systemRoleStore;

    // 当前知识库名字
    const wiki =  JSON.parse(localStorage.getItem("wiki"))
    const wikiname = wiki.name;

    // 获取当前知识库id
    const wikiId = wiki.id


    useEffect(() => {
        // 从信息页面跳入知识库详情页面时，获取知识库id
        let search = props.location.search;
        // if(search !== "") {
        //     search = search.split("=")
        //     localStorage.setItem("wiki", search[1]);
        //     setWikiId(search[1])
        // }
        // searchwiki(localStorage.getItem("wikiId")).then((res)=> {
        //     setWikiname(res.name)
        // })

        //获取知识库列表
        getWikilist()

        // systemRoleStore.getInitProjectPermissions(getUser().userId, localStorage.getItem("wikiId"))
        return 
    }, [wikiId])


    return (
        <Layout className="wikidetail">
            <WikideAside 
                wikiName={wikiname}
                wikilist={wikilist} 
                searchwiki = {searchwiki} 
                {...props}
            />
            <Layout className="wikidetail-content">
                {renderRoutes(route.routes)}
            </Layout>
            
        </Layout>
    )
    
}
export default inject("systemRoleStore",'wikiStore','wikiDetailStore')(observer(WikiDetail));