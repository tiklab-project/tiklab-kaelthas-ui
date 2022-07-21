import React, { Fragment, useEffect,useState } from "react";
import { SystemFeatureList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";

// 系统功能管理
const SystemFeature = props => {


    return (
        <SystemFeatureList
            {...props}
        />
    )
}

export default inject("privilegeSystemStore")(observer(SystemFeature));