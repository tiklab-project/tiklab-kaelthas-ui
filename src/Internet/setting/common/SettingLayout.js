import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingLeftTabs from "./SettingLeftTabs";
import "./SettingLayout.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const SettingLayout = (props) => {
    const {match:{params}} = props;
    const internetId = params.id

    const router = [
        {
            name: '网络信息',
            url: `/internet/${internetId}/inSetting/inProject`,
            key: "inProject",
            encoded: "inProject",
        },
        {
            name: '成员',
            url: `/internet/${internetId}/inSetting/inMember`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/internet/${internetId}/inSetting/inPermissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ];
    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
      /*  <div className='setting-layout'>
            <SettingLeftTabs/>
            <div className='setting-layout-right'>
                {renderRoutes(route.routes)}
            </div>
        </div>*/
    );
};

export default withRouter(SettingLayout);
