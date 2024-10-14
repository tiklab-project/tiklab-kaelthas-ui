import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainUser} from 'tiklab-user-ui';

const KuMember = (props) => {

    const hostId = localStorage.getItem('hostId')

    return (
        <DomainUser
            {...props}
            domainId={hostId}
            bgroup={"xmonitor"}
        />
    );
};

export default withRouter(KuMember);
