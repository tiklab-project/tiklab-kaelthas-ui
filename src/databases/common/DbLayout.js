import React from 'react';
import ConfigHeader from "./ConfigHeader";
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./DbLayout.scss"
import {Col, Row} from "antd";

const DbLayout = (props) => {

    const {route,location:{pathname}} = props;

    return (
        <Row className="db-layout">
            <Col md={{span: 24, offset: 0}}
                 lg={{span: 20, offset: 2}}
                 xl={{span: 20, offset: 2}}
                 xll={{span: 16, offset: 4}}
            >
                <ConfigHeader/>
                {
                    pathname.includes("/setting/") ?
                        <div>
                            {renderRoutes(route.routes)}
                        </div>:
                        <div className="db-body-routes">
                            {renderRoutes(route.routes)}
                        </div>
                }
            </Col>
        </Row>
    );
};

export default withRouter(DbLayout);
