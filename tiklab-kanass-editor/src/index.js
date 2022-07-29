/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 13:50:03
 */
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import routers from './routers';
import {renderRoutes} from "react-router-config";
import { Provider } from 'mobx-react';
import {store } from "./stores"
// import "./assets/font-icon/iconfont"
import "./assets/index"
import "./index.scss";
import {observer} from "mobx-react"

const Index = observer(() => {

    
    return (
        <Provider {...store}>
            <HashRouter >
                {renderRoutes(routers) }
            </HashRouter>
        </Provider>
    )
});

ReactDOM.render(<Index/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
