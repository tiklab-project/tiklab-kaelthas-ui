import {Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import React from "react";

const MonitorLayout = (props) => {

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

export default withRouter(MonitorLayout);