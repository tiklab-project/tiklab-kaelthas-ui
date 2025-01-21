import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configuration.scss"
import ProjectLayout from "../../../common/project/ProjectLayout"
const Configuration = (props) => {
    const {match:{params},location:{pathname}} = props;

    let url=pathname;
    let hostId=params.id
    const configurationList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/host/${hostId}/config/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/host/${hostId}/config/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/host/${hostId}/config/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/host/${hostId}/config/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    return (
        <ProjectLayout {...props}
                       dataList={configurationList}
        />
    );
};

export default withRouter(Configuration);
