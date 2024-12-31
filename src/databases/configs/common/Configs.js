import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configs.scss"
import {Col, Layout, Row} from "antd";

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

    function hrefConfiguration(item) {
        props.history.push(item.url)
    }


    return (
        <div className="db-hostDetails-layout">
            <div className="db-design-up">
                {
                    configList.map(item => {
                        return (
                            <div key={item.key}
                                 className={`db-design-tab ${url === item.url ? "design-active" : ""}`}
                                 onClick={() => hrefConfiguration(item)}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            {renderRoutes(route.routes)}
        </div>
    );
};

export default withRouter(Configs);
