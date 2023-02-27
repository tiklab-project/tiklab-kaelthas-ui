/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-22 09:02:16
 */
import React from "react";
import {Login} from 'tiklab-eam-ui'
import logo from "../assets/images/logo.png";
import {observer, inject} from 'mobx-react'
const ProjectLogin = (props) => {

    return (
        <div>
            <Login 
                {...props}
                logoImg={logo}
                loginGoRouter={'/index/home'}
                title = {'知识库管理'}
            />
        </div>
    )
}
export default inject("eamStore")(observer(ProjectLogin));