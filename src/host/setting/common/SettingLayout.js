import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingLeftTabs from "./SettingLeftTabs";
import "./SettingLayout.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const SettingLayout = (props) => {

    const {match:{params}} = props;
    const hostId = params.id

    const router = [
        {
            name: '主机信息',
            url: `/host/${hostId}/projectInformation`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/host/${hostId}/member`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/host/${hostId}/permissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ];

    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
 /*       <div className="setting-layout">
                <SettingLeftTabs/>
            <div className='setting-layout-right'>
                {renderRoutes(route.routes)}
            </div>
        </div>*/
    );
};

export default withRouter(SettingLayout);
