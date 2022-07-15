import React, { Fragment, useEffect,useState } from "react";
import { DomainRoleList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";
const SystemRoleWrap = props => {


    return (
        <DomainRoleList
            {...props}
            group={'system'}
        />
    )
}

export default inject("systemRoleStore")(observer(SystemRoleWrap));