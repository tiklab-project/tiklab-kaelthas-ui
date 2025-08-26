import React from 'react';
import {withRouter} from "react-router-dom";
import {DomainRole} from 'tiklab-privilege-ui';

const KuRole = (props) => {
    const {match:{params}} = props;

    return (
        <DomainRole
            {...props}
            domainId = {params.id}
            bgroup={"kaelthas"}
        />
    );
};
export default withRouter(KuRole);
