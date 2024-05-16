import React from 'react';
import "./Permissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'thoughtware-privilege-ui';

const Permissions = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainRole
            {...props}
            domainId = {hostId}
            bgroup={"xmonitor"}
        />
    );
};
export default withRouter(Permissions);