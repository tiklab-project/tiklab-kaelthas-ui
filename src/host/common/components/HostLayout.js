import React from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import LeftMenu from "./LeftMenu";
import "./HostLayout.scss"
import {Col, Layout, Row} from "antd";

const HostLayout = (props) => {

    const {route} = props;

    return (
        <div className="host-layout">
            <LeftMenu/>
            <Layout className="prodetail-content">
                <Row justify="start" className="prodetail-row">
                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                        {renderRoutes(route.routes)}
                    </Col>
                </Row>
            </Layout>
        </div>
    );
};

export default withRouter(HostLayout);