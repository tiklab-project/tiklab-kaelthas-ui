import React from 'react';
import {Image, Table} from "antd";
import computerPng from "../../assets/image/computer.png";
import "./MonitorIng.scss"
const MonitorIng = () => {


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
};

export default MonitorIng;