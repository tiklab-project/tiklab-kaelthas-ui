import React, { Fragment, useEffect,useState } from "react";
import { ProjectRole } from 'tiklab-user-ui';
import { inject, observer } from "mobx-react";

const ProjectRoleList = props => {
    

    return (
            < ProjectRole
                bgroup={'teamwire'}
                isBase = {true}
                {...props}
            />
    )
}

export default inject("privilegeDomainRoleStore")(observer(ProjectRoleList));