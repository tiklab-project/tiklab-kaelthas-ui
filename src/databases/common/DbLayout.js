import React from 'react';
import ConfigHeader from "./ConfigHeader";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./DbLayout.scss"

const DbLayout = (props) => {

    const {route} = props;

    return (
        <div className="db-layout">
            <ConfigHeader/>
            <div className="db-body-routes">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(DbLayout);