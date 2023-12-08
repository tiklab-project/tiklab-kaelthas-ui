import React from "react";
import { SystemRole } from 'thoughtware-privilege-ui';
import { inject, observer } from "mobx-react";
const SystemRoleWrap = props => {


    return (
            <SystemRole
                {...props}
                bgroup={'teamwire'}
            />
    )
}

export default inject("systemRoleStore")(observer(SystemRoleWrap));