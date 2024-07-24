import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingTabs from "./DbSettingTabs";
import "./DbSetting.scss"

const DbSetting = (props) => {

    const {route} = props;

    return (
        <div className="setting-layout">
            <SettingTabs/>
            <div className="setting-layout-right">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(DbSetting);