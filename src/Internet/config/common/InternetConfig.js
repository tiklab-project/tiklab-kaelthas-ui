import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./InternetConfig.scss"

const InternetConfig = (props) => {

    const {route} = props;

    let internetId = localStorage.getItem('internetId');

    let url = localStorage.getItem('configUrl');

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

    function hrefConfiguration(item) {
        localStorage.setItem("configUrl", item.url)
        props.history.push(item.url)
    }

    return (
        <div className="hostDetails-layout">
            <div className="design-up">
                {
                    configsList.map(item => {
                        return (
                            <div key={item.key}
                                 className={`design-tab ${url === item.url ? "design-active" : ""}`}
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

export default withRouter(InternetConfig);