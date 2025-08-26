import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./KuSetting.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const KuSetting = (props) => {

    const {match:{params}} = props;

    const kuId = params.id

    const router = [
        {
            name: 'k8s信息',
            url: `/kubernetes/${kuId}/setting/kuProject`,
            key: "kuSetting",
            encoded: "kuSetting",
        },
        {
            name: '成员',
            url: `/kubernetes/${kuId}/setting/kuMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/kubernetes/${kuId}/setting/kuRole`,
            key: "permissions",
            encoded: "permissions",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/kubernetes/${kuId}/setting/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/kubernetes/${kuId}/setting/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/kubernetes/${kuId}/setting/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]
    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
    );
};

export default withRouter(KuSetting);
