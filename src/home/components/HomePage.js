import React from "react";
import computerPng from "../../assets/image/computer.png"

import "./HomePage.scss";
import "../../configuration/configurationPage/components/Configuration";
import {connect} from "thoughtware-plugin-core-ui";
import {UserVerify} from "thoughtware-eam-ui";
import {Col, Image, Layout, Row, Table} from "antd";

const HomePage = (props) => {

    const host = () => {
        props.history.push('/configuration/host')
    }
    return (

        <div className="home">
            <div className="home-body">
                <div className="home-content">
                    <div className="home-content-title">
                        <div className="home-content-title-text">
                            常用主机列表
                        </div>
                    </div>
                    <div className="home-content-detail">
                        <div className="home-content-detail-item">
                            <div className="item-title">
                                <Image src={computerPng}/>
                                <span onClick={host}>第1个主机</span>
                            </div>
                            <div className="item-work">
                                <div className="item-work-item">告警数量:</div>
                                <div className="item-work-item">主机状态:</div>
                            </div>
                        </div>
                        <div className="home-content-detail-item">
                            <div className="item-title">
                                <Image src={computerPng}/>
                                <span onClick={host}>第2个主机</span>
                            </div>
                            <div className="item-work">
                                <div className="item-work-item">告警数量:</div>
                                <div className="item-work-item">主机状态:</div>
                            </div>
                        </div>
                        <div className="home-content-detail-item">
                            <div className="item-title">
                                <Image src={computerPng}/>
                                <span onClick={host}>第3个主机</span>
                            </div>
                            <div className="item-work">
                                <div className="item-work-item">告警数量:</div>
                                <div className="item-work-item">主机状态:</div>
                            </div>
                        </div>
                        <div className="home-content-detail-item">
                            <div className="item-title">
                                <Image src={computerPng}/>
                                <span onClick={host}>第4个主机</span>
                            </div>
                            <div className="item-work">
                                <div className="item-work-item">告警数量:</div>
                                <div className="item-work-item">主机状态:</div>
                            </div>
                        </div>
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
        </div>
    )
}

const HomeLayout = UserVerify(Layout, '/')

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(HomePage);