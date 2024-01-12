/*
 * @Descripttion: 登录
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-11 10:41:38
 */
import React from "react";
import {Login} from 'thoughtware-eam-ui'


const ProjectLogin = (props) => {
    
    return (
        <Login 
            {...props}
            // logoImg={logo}
            loginGoRouter={'/'}
            vaildUserAuthRouter = {'/noAuth'}
            title = {'项目管理'}
        />
    )
}
export default ProjectLogin;