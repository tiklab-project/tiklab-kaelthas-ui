/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-03-08 17:00:38
 */
import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import routers from './routers';
import {renderRoutes} from "react-router-config";
import { Provider } from 'mobx-react';
import {store } from "./stores"
import {orgStores} from "doublekit-user-ui";
import {privilegeStores} from 'doublekit-privilege-ui'
import {getUser} from 'doublekit-core-ui'
import {formStores} from 'doublekit-form-ui'
import {flowStores} from 'doublekit-flow-ui'
import {messageModuleStores} from 'doublekit-message-ui'
import { createContainer, initFetch } from 'doublekit-plugin-ui';
import "./assets/font-icon/iconfont"
import './common/language/i18n';
import "./index.scss";
import {observer} from "mobx-react"
import { useTranslation } from 'react-i18next';
import resources from './common/language/resources';

const Index = observer(() => {
    // useLoadLanguage(resources,fetchMethod, pluginAddressUrl, "zh")
    const {i18n} = useTranslation();
    const [visable, setVisable] =  useState(true);

    const allStore = {  
        ...privilegeStores,
        ...orgStores,
        ...formStores,
        ...flowStores,
        ...messageModuleStores,
        ...store
    }
    // allStore.authConfigStore.getFindAuthConfig()
    const userInfo = getUser()
    if (userInfo && userInfo.userId) {
        allStore.systemRoleStore.getSystemPermissions(userInfo.userId)
    }

    const [pluginData,setPluginData] = useState({
        routes: routers,
        pluginStore:[],
        languageStore:[]
    });
    useEffect(() => {
        initFetch(fetchMethod, routers, resources,i18n).then(res => {
            setPluginData(res)
            setVisable(false)
        })
    }, []);

    const CounterContainer = createContainer();

    if(visable) return <div>加载。。。</div>

    return (
        <CounterContainer.Provider initialState={pluginData}>
            <Provider {...allStore}>
                <HashRouter >
                    {
                        renderRoutes(pluginData.routes)
                    }
                </HashRouter>
            </Provider>
        </CounterContainer.Provider>
    )
});

ReactDOM.render(<Index/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
