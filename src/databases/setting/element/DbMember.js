import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainUser} from 'tiklab-user-ui';

const DbMember = (props) => {
    const {match:{params}} = props;

    return (
        <DomainUser
            {...props}
            domainId={params.id}
            bgroup={"kaelthas"}
        />
    );
};

export default withRouter(DbMember);
