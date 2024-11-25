import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainUser} from 'tiklab-user-ui';

const DbMember = (props) => {

    const dbId = localStorage.getItem('dbId')

    return (
        <DomainUser
            {...props}
            domainId={dbId}
            bgroup={"kaelthas"}
        />
    );
};

export default withRouter(DbMember);
