import React from "react";
import { DomainUserList } from 'doublekit-user-ui';
import { observer, inject } from "mobx-react";

const WikiDomainUser = props => {
    const wikiId = JSON.parse(localStorage.getItem("wiki")).id;
    return (
        <DomainUserList
            {...props}
            domainId={wikiId}
        />
    )
}
export default inject("privilegeDomainRoleStore")(observer(WikiDomainUser)) ;