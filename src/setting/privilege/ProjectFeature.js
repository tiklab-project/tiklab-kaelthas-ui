import React from "react";
import { ProjectFeature } from 'tiklab-privilege-ui';
import { inject, observer } from "mobx-react";

// 系统功能管理
const ProjectFeatureList = props => {


    return (
        <ProjectFeature
            bgroup={'teamwire'}
            {...props}
        />
    )
}

export default inject("privilegeProjectFeatureStore")(observer(ProjectFeatureList));