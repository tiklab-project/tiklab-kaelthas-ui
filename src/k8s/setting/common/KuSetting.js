import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingTabs from "./KuSettingTabs";
import "./KuSetting.scss"

const KuSetting = (props) => {

    const {route} = props;

    return (
        <div>
            <SettingTabs/>
            <div>
                {renderRoutes(route.routes)}
            </div>
        </div>
    );
};

export default withRouter(KuSetting);