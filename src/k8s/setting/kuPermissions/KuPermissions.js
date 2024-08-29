import React from 'react';
import "./KuPermissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'thoughtware-privilege-ui';

const KuPermissions = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainRole
            {...props}
            domainId = {hostId}
            bgroup={"xmonitor"}
        />
    );
};
export default withRouter(KuPermissions);