import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainUser} from 'tiklab-user-ui';

const Member = (props) => {
    const {match:{params}} = props;

    return (
        <DomainUser
            {...props}
            domainId={params.id}
            bgroup={"kaelthas"}
        />
    );
};

export default withRouter(Member);
