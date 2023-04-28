/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-16 10:40:09
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 10:41:59
 */
import React from "react";
import { DomainRole } from 'tiklab-privilege-ui';

const RepositoryDomainRole = props => {
    const repositoryId = JSON.parse(localStorage.getItem("repository")).id;

    return (
        <div style={{backgroundColor: "#fff",height: "100%"}}>
            <DomainRole
                {...props}
                domainId={repositoryId}
                bgroup = {"teamwire"}
            />
        </div>
        
    )
}

export default RepositoryDomainRole;