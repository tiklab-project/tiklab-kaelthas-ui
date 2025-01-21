import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import SettingTabs from "./KuSettingTabs";
import "./KuSetting.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const KuSetting = (props) => {

    const {match:{params}} = props;

    const kuId = params.id

    const router = [
        {
            name: 'k8s信息',
            url: `/kubernetes/${kuId}/kuSetting/kuProject`,
            key: "kuSetting",
            encoded: "kuSetting",
        },
        {
            name: '成员',
            url: `/kubernetes/${kuId}/kuSetting/kuMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/kubernetes/${kuId}/kuSetting/kuPermissions`,
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

export default withRouter(KuSetting);
