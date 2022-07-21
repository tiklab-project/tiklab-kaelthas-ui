import React from "react";
import { DomainUserList } from 'doublekit-user-ui';
import { observer, inject } from "mobx-react";

const WikiDomainUser = props => {
    const wikiId = localStorage.getItem("wikiId");;
    return (
        <DomainUserList
            {...props}
            domainId={wikiId}
        />
    )
}
export default inject("privilegeDomainRoleStore")(observer(WikiDomainUser)) ;