/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 09:41:52
 */
import React, {useEffect} from 'react';
import Wikiaside from "./wikiAside";
import { Layout,Row, Col } from 'antd';
import Wikicontent from "./wikiContent";
import "../components/wiki.scss";
import {observer, inject} from "mobx-react";
const { Sider } = Layout;

const Wiki=(props)=>{
    const {wikiStore} = props;
    const {getWikilist,wikilist,wikiTypelist,getWikiTypeList,getUseList,uselist} = wikiStore;
    // 初始化获取知识库列表
    useEffect(() => {
        getWikilist()
    }, [])

    return (
        <div className="wiki">
            <Layout  className="wiki-content">
                <Sider>
                    <Wikiaside></Wikiaside>
                </Sider>
                <Layout className="wiki-table">
                    <Wikicontent
                        wikilist= {wikilist}
                        wikiTypelist = {wikiTypelist}
                        getWikiTypeList ={getWikiTypeList}
                        getUseList = {getUseList}
                        uselist = {uselist}
                    />
                </Layout>
            </Layout>
        </div>

    )
}
export default inject('wikiStore')(observer(Wiki)); 