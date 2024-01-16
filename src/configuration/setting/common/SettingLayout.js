import React from 'react';
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";
import {withRouter} from "react-router-dom";

const SettingLayout = (props) => {

    const {route} = props;

    return (
        <div>
            <Provider>
                <div>
                    <div>
                        {renderRoutes(route.routes)}
                    </div>
                </div>
            </Provider>
        </div>
    );
};

export default withRouter(SettingLayout);