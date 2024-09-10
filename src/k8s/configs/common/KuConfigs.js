import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./KuConfigs.scss"
import {Col, Layout, Row} from "antd";

const KuConfigs = (props) => {

    const {route} = props;

    let kuId = localStorage.getItem('kuId');

    let url = localStorage.getItem('confUrl');

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
        localStorage.setItem("confUrl", item.url)
        props.history.push(item.url)
    }


    return (
        <Row justify="start" className="ku-hostDetails-layout">
            <Col span={24}>
                <div className="ku-design-up">
                    {
                        configList.map(item => {
                            return (
                                <div key={item.key}
                                     className={`ku-design-tab ${url === item.url ? "design-active" : ""}`}
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

export default withRouter(KuConfigs);