import React from 'react';
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";
import {withRouter} from "react-router-dom";
import SettingLeftTabs from "./SettingLeftTabs";
import "./SettingLayout.scss"
const SettingLayout = (props) => {

    const {route} = props;

    return (
        <div className="setting-layout">
            <div>
                <SettingLeftTabs/>
            </div>
            <div className="setting-layout-right">
                <Provider>
                    {renderRoutes(route.routes)}
                </Provider>
            </div>
        </div>
    );
};

export default withRouter(SettingLayout);