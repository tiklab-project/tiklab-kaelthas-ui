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
import WikideAside from "../components/WikiDetailAside";
import "../components/wikiDetail.scss";
import { renderRoutes } from "react-router-config";
import {observer, inject} from "mobx-react";

const WikiDetail = (props)=>{
    // 解析props
    const {wikiStore,wikiDetailStore,systemRoleStore,route} = props;

    const {searchwiki, findRepositoryList, wikilist} = wikiStore;
    const wikiId = props.match.params.wikiId;
    const [wiki, setWiki] = useState()

    useEffect(() => {
        // 从信息页面跳入知识库详情页面时，获取知识库id
        let search = props.location.search;
        // if(search !== "") {
        //     search = search.split("=")
        //     localStorage.setItem("wiki", search[1]);
        //     setWikiId(search[1])
        // }
        searchwiki(wikiId).then((res)=> {
            console.log(res)
            localStorage.setItem("wiki", JSON.stringify(res.data));
            setWiki(res.data)
        })

        //获取知识库列表
        findRepositoryList({})

        // systemRoleStore.getInitProjectPermissions(getUser().userId, localStorage.getItem("wikiId"))
        return 
    }, [wikiId])


    return (
        <Layout className="wikidetail">
            <WikideAside 
                wiki={wiki}
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