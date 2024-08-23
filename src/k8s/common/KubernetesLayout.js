import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router";
import KuConfigHeader from "./KuConfigHeader";
import "./KuBernetesLayout.scss"

const KubernetesLayout = (props) => {

    const {route} = props;

    return (
        <div className="ku-layout">
            <KuConfigHeader/>
            <div className="ku-body-routes">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(KubernetesLayout);