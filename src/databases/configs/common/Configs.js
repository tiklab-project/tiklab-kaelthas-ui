import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configs.scss"
import {Col, Layout, Row} from "antd";

const Configs = (props) => {

    const {route} = props;

    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('confUrl');

    const configList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/dbList/${dbId}/configs/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/dbList/${dbId}/configs/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '自定义SQL',
            icon: 'customize',
            url: `/dbList/${dbId}/configs/customize`,
            key: "customize",
            encoded: "customize",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/dbList/${dbId}/configs/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/dbList/${dbId}/configs/dbGraphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    function hrefConfiguration(item) {

        localStorage.setItem("confUrl", item.url)
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