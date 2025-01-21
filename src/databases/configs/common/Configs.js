import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configs.scss"
import {Col, Layout, Row} from "antd";
import ProjectLayout from "../../../common/project/ProjectLayout";

const Configs = (props) => {
    const {match:{params},location:{pathname}} = props;
    const {route} = props;

    let dbId = params.id;

    let url = pathname;

    const configList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/db/${dbId}/configs/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/db/${dbId}/configs/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        /*{
            name: '自定义SQL',
            icon: 'customize',
            url: `/db/${dbId}/configs/customize`,
            key: "customize",
            encoded: "customize",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/db/${dbId}/configs/template`,
            key: "template",
            encoded: "template",
        },*/
        {
            name: '图形',
            icon: 'graphics',
            url: `/db/${dbId}/configs/dbGraphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]




    return (
        <ProjectLayout {...props}
                       dataList={configList}
        />
    );
};

export default withRouter(Configs);
