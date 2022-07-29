import React from "react";
import { DomainUserList } from 'tiklab-user-ui';
import { observer, inject } from "mobx-react";

const WikiDomainUser = props => {
    const wikiId = JSON.parse(localStorage.getItem("wiki")).id;
    return (
        <div style={{backgroundColor: "#fff",height: "100%"}}>
            <DomainUserList
                {...props}
                domainId={wikiId}
            />
        </div>
    )
}
export default inject("privilegeDomainRoleStore")(observer(WikiDomainUser)) ;