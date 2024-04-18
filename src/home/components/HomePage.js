import React from "react";
import computerPng from "../../assets/image/dataComputer.png"

import "./HomePage.scss";
import "../../configuration/configurationPage/components/Configuration";
import {connect} from "thoughtware-plugin-core-ui";
import {UserVerify} from "thoughtware-eam-ui";
import {Col, Image, Layout, Row, Table} from "antd";

const HomePage = (props) => {

    const host = () => {
        props.history.push('/configuration/host')
    }

    const hostList = [1, 2, 3, 4, 5,6];

    return (

        <Row className="home">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="home-body">
                    <div className="home-content">
                        <div className="home-content-title">
                            <div className="home-content-title-text">
                                常用主机列表
                            </div>
                        </div>
                        <div className="home-content-detail">
                            {
                                hostList.map(item => {
                                    return (
                                        <div className="home-content-detail-item">
                                            <div className="item-title">
                                                <div className="item-title-png">
                                                    <Image src={computerPng}/>
                                                </div>
                                                <div className="item-title-text">
                                                    <span onClick={host}>第{item}个主机</span>
                                                </div>
                                            </div>
                                            <div className="item-work">
                                                <div className="item-work-item">告警数量:</div>
                                                <div className="item-work-item">主机状态:</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="home-alarm-table">
                        <div className="home-table-title">告警信息</div>
                        <div className="home-alarm-table-list">
                            <Table/>
                        </div>
                    </div>
                    <div className="home-alarm-table">
                        <div className="home-table-title">动态信息</div>
                        <div className="home-alarm-table-list">
                            <Table/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const HomeLayout = UserVerify(Layout, '/')

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(HomePage);