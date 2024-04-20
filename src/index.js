import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import Routers from './Routers';
import { Provider } from 'mobx-react';
import { orgStores } from "thoughtware-user-ui/es/store";
import { enableAxiosCE } from 'thoughtware-core-ui';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { renderRoutes } from "react-router-config";
import './common/language/i18n'
import "./index.scss"
import "./common/styles/_tabStyle.scss"
import { observer } from "mobx-react"
import { pluginLoader, PluginProvider } from "thoughtware-plugin-core-ui";
import "./assets/index";
import resources from "./common/language/resources";
import {useVersion} from "thoughtware-eam-ui/es/utils";
import {privilegeStores} from "thoughtware-privilege-ui/es/store";
import {fetchMethod} from "../enviroment/enviroment_dev";
enableAxiosCE()
const Index = observer((props) => {

    const { i18n } = useTranslation();
    const [visable, setVisable] = useState(true);
    useVersion()

    const allStore = {
        ...privilegeStores,
        ...orgStores
    }


    const [pluginData, setPluginData] = useState({
        routes: Routers,
        pluginStore: [],
        languageStore: []
    });

    useEffect(() => {
        pluginLoader(Routers, resources,i18n, fetchMethod).then(res => {
            setPluginData(res)
            console.log("res",res)
            setVisable(false)
        })
    }, []);

    if (visable) return <div>加载中</div>

    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        {
                            renderRoutes(pluginData?.routes)
                        }
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginProvider>
    )
});

ReactDOM.render(<Index />, document.getElementById('root'));

