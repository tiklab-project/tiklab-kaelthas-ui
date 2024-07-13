import React from 'react';
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";
import {withRouter} from "react-router-dom";
import SettingLeftTabs from "./SettingLeftTabs";
import "./SettingLayout.scss"
import {Col, Row} from "antd";

const SettingLayout = (props) => {

    const {route} = props;

    return (
        <div className="setting-layout">
                <SettingLeftTabs/>
            <div className="setting-layout-right">
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(SettingLayout);