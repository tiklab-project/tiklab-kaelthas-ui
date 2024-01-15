import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";

const HostLayout = (props) => {

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

export default withRouter(HostLayout);