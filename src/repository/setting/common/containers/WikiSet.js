/*
 * @Descripttion: 项目详情页
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-07 15:07:14
 */
import React, { useState,useEffect } from "react";
import { Layout,Row,Col } from 'antd';
import WikiSetAside from "../components/WikiSetAside";
import "../components/wikiSet.scss";
import { renderRoutes } from "react-router-config";
import {observer, inject} from "mobx-react";
import { getUser } from "tiklab-core-ui";

const WikiSetDetail = (props)=>{
    const route = props.route
    const { wikiStore } = props;
    const { findRepositoryList, searchwiki } = wikiStore;
    const userId = getUser().userId;

    // 当前项目名字
    const [wikiname,setWikiname] = useState();

    // 获取当前项目id
    const wikiId = props.match.params.id;


    useEffect(() => {
        // 从信息页面跳入项目详情页面时，获取项目id
        let search = props.location.search;
        if(search !== "") {
            search = search.split("=")
            localStorage.setItem("wikiId", search[1]);
        }
        searchwiki({id: wikiId}).then((res)=> {
            setWikiname(res.wikiName)
        })
        //获取项目列表
        findRepositoryList({ master: userId })
        return 
    }, [wikiId])


    return (
        <Layout className="wiki-set">
            <WikiSetAside 
                wikiName={wikiname}
                // prolist={prolist} 
                // searchpro = {searchpro} 
                {...props}
            />
            <Layout>
                {renderRoutes(route.routes)}
            </Layout>
            
        </Layout>
    )
    
}
export default inject('wikiStore')(observer(WikiSetDetail));