import React from 'react';
import "./DbPermissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'tiklab-privilege-ui';

const DbPermissions = (props) => {

    const dbId = localStorage.getItem('dbId')

    return (
        <DomainRole
            {...props}
            domainId = {dbId}
            bgroup={"kaelthas"}
        />
    );
};
export default withRouter(DbPermissions);