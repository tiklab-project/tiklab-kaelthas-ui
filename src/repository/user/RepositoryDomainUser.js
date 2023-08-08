import React from "react";
import { DomainUser} from 'tiklab-user-ui';
import { observer, inject } from "mobx-react";

const RepositoryDomainUser = props => {
    const repositoryId = props.match.params.repositoryId
    return (
        <div style={{backgroundColor: "#fff",height: "100%"}}>
            <DomainUser
                {...props}
                domainId={repositoryId}
            />
        </div>
    )
}
export default inject("privilegeDomainRoleStore")(observer(RepositoryDomainUser)) ;