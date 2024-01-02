/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-08 17:00:38
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from "react-router-dom";
import Routes from './Routers';
import {renderRoutes} from "react-router-config";
import {Provider} from 'mobx-react';
import {observer} from "mobx-react"

const Index = observer(() => {

    return (
        <Provider>
            <HashRouter>
                {
                    renderRoutes(Routes)
                }
            </HashRouter>
        </Provider>
    )
});

ReactDOM.render(
    <BrowserRouter>
        <Index/>
    </BrowserRouter>,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
