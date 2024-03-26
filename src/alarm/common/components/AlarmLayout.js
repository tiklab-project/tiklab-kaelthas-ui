import React from 'react';
import {withRouter} from "react-router";
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";

const AlarmLayout = (props) => {

    const {route} = props;

    return (
        <div>
            <Provider>
                {renderRoutes(route.routes)}
            </Provider>
        </div>
    );
};

export default withRouter(AlarmLayout);