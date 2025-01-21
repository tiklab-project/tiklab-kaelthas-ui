import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./KuConfigs.scss"
import {Col, Layout, Row} from "antd";
import ProjectLayout from "../../../common/project/ProjectLayout";

const KuConfigs = (props) => {
    const {match:{params},location:{pathname},route} = props;

    let kuId = params.id;

    let url = pathname;

    const configList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/kubernetes/${kuId}/configs/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/kubernetes/${kuId}/configs/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        /*{
            name: '模板',
            icon: 'template',
            url: `/kubernetes/${kuId}/configs/template`,
            key: "template",
            encoded: "template",
        },*/
        {
            name: '图形',
            icon: 'graphics',
            url: `/kubernetes/${kuId}/configs/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    function hrefConfiguration(item) {
        props.history.push(item.url)
    }


    return (
        <ProjectLayout {...props}
                       dataList={configList}
        />
    );
};

export default withRouter(KuConfigs);
