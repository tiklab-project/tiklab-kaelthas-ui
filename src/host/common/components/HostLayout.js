import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./HostLayout.scss"
import TopMenu from "./TopMenu";
import {Col, Row} from "antd";

const HostLayout = (props) => {

    const {route,location:{pathname}} = props;



    return (
        <Row className="host-layout">
            <Col  md={{ span: 24, offset: 0 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                  xll={{ span: 16, offset: 4 }}
            >
                <TopMenu/>
                {
                    pathname.includes("/setting/")?
                        <div>
                            {renderRoutes(route.routes)}
                        </div>:
                        <div className="prodetail-content">
                            {renderRoutes(route.routes)}
                        </div>
                }

            </Col>
        </Row>
    );
};

export default withRouter(HostLayout);
