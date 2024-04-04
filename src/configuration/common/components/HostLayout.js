import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";
import LeftMenu from "./LeftMenu";
import "./HostLayout.scss"

const HostLayout = (props) => {

    const {route} = props;

    return (
        <div className="host-layout">
            <LeftMenu/>
            <Provider>
                {renderRoutes(route.routes)}
            </Provider>
        </div>
    );
};

export default withRouter(HostLayout);