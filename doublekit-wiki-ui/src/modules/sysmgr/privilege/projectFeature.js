import React, { Fragment, useEffect,useState } from "react";
import { ProjectFeatureList } from 'doublekit-privilege-ui';
import { inject, observer } from "mobx-react";

// 系统功能管理
const ProjectFeature = props => {


    return (
        // <div className="test">
            <ProjectFeatureList
                {...props}
            />
        // </div>
    )
}

export default inject("privilegeProjectFeatureStore")(observer(ProjectFeature));