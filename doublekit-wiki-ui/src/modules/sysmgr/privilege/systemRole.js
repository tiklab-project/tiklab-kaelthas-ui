import React, { Fragment, useEffect,useState } from "react";
import { SystemRoleList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";
const SystemRoleWrap = props => {


    return (
        <SystemRoleList
            {...props}
            group={'system'}
        />
    )
}

export default inject("systemRoleStore")(observer(SystemRoleWrap));