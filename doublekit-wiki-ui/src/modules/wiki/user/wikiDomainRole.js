/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-16 10:40:09
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 10:41:59
 */
import React from "react";
import { DomainRoleList } from 'doublekit-privilege-ui';

const WikiDomainRole = props => {
    const wikiId = JSON.parse(localStorage.getItem("wiki")).id;

    return (
        <DomainRoleList
            {...props}
            domainId={wikiId}
        />
    )
}

export default WikiDomainRole;