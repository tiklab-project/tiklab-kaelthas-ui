import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainUser} from 'thoughtware-user-ui';

const Member = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainUser
            {...props}
            domainId={hostId}
            bgroup={"xmonitor"}
        />
    );
};

export default withRouter(Member);
