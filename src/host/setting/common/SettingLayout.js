import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./SettingLayout.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const SettingLayout = (props) => {

    const {match:{params}} = props;
    const hostId = params.id

    const router = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/host/${hostId}/setting/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/host/${hostId}/setting/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/host/${hostId}/setting/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/host/${hostId}/setting/graphics`,
            key: "graphics",
            encoded: "graphics",
        },

    ];

    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
    );
};

export default withRouter(SettingLayout);
