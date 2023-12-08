import React, { Fragment, useEffect,useState } from "react";
import { SystemFeature } from 'thoughtware-privilege-ui';
import { inject, observer } from "mobx-react";

// 系统功能管理
const SystemFeatureList = props => {


    return (
        <SystemFeature
            bgroup={'teamwire'}
            {...props}
        />
    )
}

export default inject("privilegeSystemStore")(observer(SystemFeatureList));