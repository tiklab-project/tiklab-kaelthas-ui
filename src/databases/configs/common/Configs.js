import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./Configs.scss"
import {Col, Layout, Row} from "antd";

const Configs = (props) => {

    const {route} = props;

    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('url');

    const configList = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/DbList/${dbId}/configs/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/DbList/${dbId}/configs/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/DbList/${dbId}/configs/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/DbList/${dbId}/configs/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    function hrefConfiguration(item) {
        console.log(item)
        localStorage.setItem("url", item.url)
        props.history.push(item.url)
    }


    return (
        <Row justify="start" className="hostDetails-layout">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "22", offset: "1"}}>
                <div className="design-up">
                    {
                        configList.map(item => {
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

export default withRouter(Configs);