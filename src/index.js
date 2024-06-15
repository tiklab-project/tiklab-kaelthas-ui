import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import Routers from './Routers';
import { Provider } from 'mobx-react';
import { orgStores } from "thoughtware-user-ui/es/store";
import { enableAxios } from 'thoughtware-core-ui';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { renderRoutes } from "react-router-config";
import './common/language/i18n'
import "./index.scss"
import "./common/styles/_tabStyle.scss"
import { observer } from "mobx-react"
import "./assets/index";
import {useVersion} from "thoughtware-eam-ui/es/utils";
import {privilegeStores} from "thoughtware-privilege-ui/es/store";
import App from "./App";
enableAxios()
const Index = observer((props) => {

    const { i18n } = useTranslation();
    useVersion()

    const allStore = {
        ...privilegeStores,
        ...orgStores
    }

    return (
        <App
            routes={Routers}
            allStore={allStore}
        />
    )
});

ReactDOM.render(<Index />, document.getElementById('root'));

