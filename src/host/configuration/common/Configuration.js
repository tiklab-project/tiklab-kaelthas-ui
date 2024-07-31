import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configuration.scss"
import {Col, Layout, Row} from "antd";

const Configuration = (props) => {

    const {route} = props;

    let hostId = localStorage.getItem('hostId');

    let url = localStorage.getItem('configurationUrl');

    const configurationList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/hostList/${hostId}/configuration/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/hostList/${hostId}/configuration/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/hostList/${hostId}/configuration/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'dbGraphics',
            url: `/hostList/${hostId}/configuration/graphics`,
            key: "dbGraphics",
            encoded: "dbGraphics",
        },
    ]

    function hrefConfiguration(item) {
        localStorage.setItem("configurationUrl", item.url)
        props.history.push(item.url)
    }

    return (
        <Row justify="start" className="hostDetails-layout">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "22", offset: "1"}}>
                <div className="design-up">
                    {
                        configurationList.map(item => {
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
            </Col>
        </Row>
    );
};

export default withRouter(Configuration);