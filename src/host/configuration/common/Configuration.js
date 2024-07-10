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
            icon: 'graphics',
            url: `/hostList/${hostId}/configuration/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    function hrefConfiguration(item) {
        localStorage.setItem("configurationUrl",item.url)
        props.history.push(item.url)
    }

    return (
        <div className="hostDetails-layout">
            <Layout className="prodetail-content">
                <Row justify="start" className="prodetail-row">
                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        <div className="design-up">
                            <div className="design-top">
                                <div className="configuration-title">配置</div>
                            </div>
                            <div className="design-tabs">
                                {
                                    configurationList.map(item =>{
                                        return(
                                            <div key={item.key}
                                                 className={`design-tab ${url===item.url?"design-active":""}`}
                                                 onClick={() => hrefConfiguration(item)}
                                            >
                                                <div className="design-tab-title">
                                                    <svg className="leftMenu-svg-icon" aria-hidden="true">
                                                        <use xlinkHref={`#icon-${item.icon}`}></use>
                                                    </svg>
                                                    {item.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {renderRoutes(route.routes)}
                    </Col>
                </Row>
            </Layout>
        </div>
    );
};

export default withRouter(Configuration);