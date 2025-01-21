import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingTabs from "./DbSettingTabs";
import "./DbSetting.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const DbSetting = (props) => {

    const {match:{params}} = props;
    const dbId=params.id
    const router = [
        {
            name: '数据库信息',
            url: `/db/${dbId}/dbSetting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/db/${dbId}/dbSetting/dbMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/db/${dbId}/dbSetting/dbPermissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ]

    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
    );
};

export default withRouter(DbSetting);
