import React, { Fragment, useEffect,useState } from "react";
import { FeatureList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";

// 系统功能管理
const SystemFeature = props => {


    return (
        <FeatureList
            {...props}
        />
    )
}

export default inject("privilegeSystemStore")(observer(SystemFeature));