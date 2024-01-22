import React from 'react';
import {renderRoutes} from "react-router-config";
import {Provider} from "mobx-react";
import {withRouter} from "react-router-dom";
import GlobalSettingLeftTabs from "./GlobalSettingLeftTabs";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import "./GlobalSettingLayout.scss"

const GlobalSettingLayout = (props) => {

    const {route} = props;

    return (
        <div>
            <Provider>
                <Layout className="globalSetting-box">
                    <Sider>
                        <GlobalSettingLeftTabs/>
                    </Sider>
                    <Content className="globalSetting-box-right">
                        {renderRoutes(route.routes)}
                    </Content>
                </Layout>
            </Provider>
        </div>
    );
};

export default withRouter(GlobalSettingLayout);