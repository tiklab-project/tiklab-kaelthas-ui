import React, { Fragment, useEffect,useState } from "react";
import { DomainRoleList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";

const ProjectRole = props => {
    console.log(props)

    return (
        // <div className="test">
            < DomainRoleList
                group={'system'}
                {...props}
            />
        // </div>
    )
}

export default inject("privilegeDomainRoleStore")(observer(ProjectRole));