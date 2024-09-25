import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router";
import KuConfigHeader from "./InConfigHeader";
import "./InternetLayout.scss"
import {Col, Row} from "antd";

const InternetLayout = (props) => {

    const {route} = props;

    return (
        <Row className="internet-layout">
            <Col md={{span: 24, offset: 0}}
                 lg={{span: 20, offset: 2}}
                 xl={{span: 20, offset: 2}}
                 xll={{span: 16, offset: 4}}>
                <KuConfigHeader/>
                <div className="internet-body-routes">
                    {renderRoutes(route.routes)}
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(InternetLayout);