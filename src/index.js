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
import Routes from './Routers';
import {renderRoutes} from "react-router-config";
import { Provider } from 'mobx-react';
import {store } from "./stores"
import {orgStores} from "tiklab-user-ui/es/store";
import {getUser, enableAxiosCE} from 'tiklab-core-ui'
import {messageModuleStores} from 'tiklab-message-ui/es/store'
import { pluginLoader, PluginProvider } from "tiklab-plugin-core-ui";
import './common/language/i18n';
import "./index.scss";
import {observer} from "mobx-react"
import { useTranslation } from 'react-i18next';
import resources from './common/language/resources';
import "./assets/index";
import "tiklab-slate-ui/es/tiklab-slate.css";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
enableAxiosCE()
const Index = observer(() => {
    const {i18n} = useTranslation();
    const [visable, setVisable] =  useState(true);

    const allStore = {  
        ...privilegeStores,
        ...orgStores,
        ...messageModuleStores,
        ...store
    }

    const [pluginData,setPluginData] = useState({
        routes: Routes,
        pluginStore:[],
        languageStore:[]
    });
    useEffect(() => {
        pluginLoader(Routes, resources,i18n).then(res => {
            setPluginData(res)
            setVisable(false)
        })
    }, []);

    if(visable) return <div>加载。。。</div>

    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore}>
                <HashRouter >
                    {
                        renderRoutes(pluginData.routes)
                    }
                </HashRouter>
            </Provider>
        </PluginProvider>
    )
});

ReactDOM.render(<Index/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
}
