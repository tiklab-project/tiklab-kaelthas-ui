import React from 'react';
import "./DbPermissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'tiklab-privilege-ui';

const DbPermissions = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainRole
            {...props}
            domainId = {hostId}
            bgroup={"xmonitor"}
        />
    );
};
export default withRouter(DbPermissions);