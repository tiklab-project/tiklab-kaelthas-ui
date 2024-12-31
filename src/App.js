import React from 'react';
import {Provider} from "mobx-react";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import './common/language/i18n'
import "./index.scss"
import {InitInstallProvider} from "tiklab-eam-ui";

const App = ({allStore,routes}) => {
    return (
        <InitInstallProvider bgroup={'kaelthas'}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        {renderRoutes(routes)}
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </InitInstallProvider>

    );
};

export default App;
