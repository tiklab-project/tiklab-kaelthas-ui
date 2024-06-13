import React from 'react';

import { renderRoutes } from "react-router-config";
import "./HomeLayout.scss";

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

export default HomeLayout;