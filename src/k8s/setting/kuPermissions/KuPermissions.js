import React from 'react';
import "./KuPermissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'tiklab-privilege-ui';

const KuPermissions = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainRole
            {...props}
            domainId = {hostId}
            bgroup={"kaelthas"}
        />
    );
};
export default withRouter(KuPermissions);