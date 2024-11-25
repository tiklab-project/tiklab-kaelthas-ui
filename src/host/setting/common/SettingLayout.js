import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingLeftTabs from "./SettingLeftTabs";
import "./SettingLayout.scss"

const SettingLayout = (props) => {

    const {route} = props;

    return (
        <div className="setting-layout">
                <SettingLeftTabs/>
            <div>
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(SettingLayout);