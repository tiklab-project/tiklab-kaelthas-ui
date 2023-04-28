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
import RepositorydeAside from "./RepositoryDetailAside";
import "../components/RepositoryLayout.scss";
import { renderRoutes } from "react-router-config";
import {observer, inject} from "mobx-react";
import {getUser} from "tiklab-core-ui"
const RepositoryDetail = (props)=>{
    // 解析props
    const {repositoryStore,repositoryDetailStore,systemRoleStore,route} = props;

    const {searchrepository, findRepositoryList, repositorylist} = repositoryStore;
    const repositoryId = props.match.params.repositoryId;
    const [repository, setRepository] = useState()

    useEffect(() => {
        // 从信息页面跳入知识库详情页面时，获取知识库id
        let search = props.location.search;
        searchrepository(repositoryId).then((res)=> {
            console.log(res)
            localStorage.setItem("repository", JSON.stringify(res.data));
            const isPublish = res.data?.projectLimits === "0" ? true : false
            systemRoleStore.getInitProjectPermissions(getUser().userId, res.data.id, isPublish)
            setRepository(res.data)
        })

        //获取知识库列表
        findRepositoryList({})

        // systemRoleStore.getInitProjectPermissions(getUser().userId, localStorage.getItem("repositoryId"))
        return 
    }, [repositoryId])


    return (
        <Layout className="repositorydetail">
            <RepositorydeAside 
                repository={repository}
                repositorylist={repositorylist} 
                searchrepository = {searchrepository} 
                {...props}
            />
            <Layout className="repositorydetail-content">
                {renderRoutes(route.routes)}
            </Layout>
            
        </Layout>
    )
    
}
export default inject("systemRoleStore",'repositoryStore','repositoryDetailStore')(observer(RepositoryDetail));