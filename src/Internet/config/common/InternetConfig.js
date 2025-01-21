import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./InternetConfig.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const InternetConfig = (props) => {
    const {match:{params},location:{pathname}} = props;

    let internetId = params.id;

    let url = pathname;
    const configsList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/internet/${internetId}/configs/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/internet/${internetId}/configs/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        /*{
            name: '模板',
            icon: 'template',
            url: `/internet/${internetId}/configs/template`,
            key: "template",
            encoded: "template",
        },*/
        {
            name: '图形',
            icon: 'graphics',
            url: `/internet/${internetId}/configs/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]


    return (
        <ProjectLayout {...props}
                       dataList={configsList}
        />
    );
};

export default withRouter(InternetConfig);
