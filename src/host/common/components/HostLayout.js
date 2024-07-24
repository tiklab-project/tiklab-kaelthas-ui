import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./HostLayout.scss"
import TopMenu from "./TopMenu";

const HostLayout = (props) => {

    const {route} = props;

    return (
        <div className="host-layout">
            <TopMenu/>
            <div className="prodetail-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(HostLayout);