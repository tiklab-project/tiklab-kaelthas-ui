import React from 'react';

import { renderRoutes } from "react-router-config";
import "./HomeLayout.scss";
import { connect } from 'thoughtware-plugin-core-ui';

import { Provider } from 'mobx-react';
import Header from "./Header";
const HomeLayout = (props) => {

    const route = props.route.routes;

    return (
        <Provider >
            <div className="frame">
                <Header/>
                <div className="frame-content">
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}


// const HomeLayout = UserVerify(Layout, '/')
function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}
export default connect(mapStateToProps)(HomeLayout);