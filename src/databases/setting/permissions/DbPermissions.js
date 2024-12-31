import React from 'react';
import "./DbPermissions.scss"
import {withRouter} from "react-router-dom";
import {DomainRole} from 'tiklab-privilege-ui';

const DbPermissions = (props) => {
    const {match:{params}} = props;

    return (
        <DomainRole
            {...props}
            domainId = {params.id}
            bgroup={"kaelthas"}
        />
    );
};
export default withRouter(DbPermissions);
