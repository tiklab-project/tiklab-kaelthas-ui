import React, {useEffect} from 'react';

import {renderRoutes} from "react-router-config";
import "./HomeLayout.scss";

import {Provider} from 'mobx-react';
import Header from "./Header";
import {AppLink, AvatarLink, HelpLink} from "thoughtware-licence-ui";
import {getUser} from "thoughtware-core-ui";

const HomeLayout = (props) => {

    const route = props.route.routes;

    /*const {systemRoleStore} = props;

    const {getSystemPermissions} = systemRoleStore

    useEffect(()=>{
        // 获取系统权限
        getSystemPermissions(getUser().userId)
    },[])*/

    return (
        <Provider >
            <div className="frame">
                <Header AppLink={<AppLink/>} HelpLink={<HelpLink/>} AvatarLink={<AvatarLink/>} {...props} />
                <div className="frame-content">
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}

export default HomeLayout;