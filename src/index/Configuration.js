import React from "react";
import topList from "../common/TopList";
import logo from "../../public/image/logo.png";
import {Link, NavLink} from "react-router-dom";
import computerPng from "../../public/image/computer.png";

// import "./TestAntd";
import {Button} from "antd";
import TestAntd from "./TestAntd";
import Mock from "mockjs";
import PopUp from "./PopUp";
const Configuration = () => {
    return (
        <div className='configration'>
            <div className='HeadInformation'>
                <div className='Head-left' style={{display: 'inline-block'}}>
                    <div className="icon">
                        <img src={logo} className={"logo-img"} alt={"logo"}
                             style={{display: 'inline-block', marginLeft: '50px'}}/>
                        <div className="logo-text" align={'center'}
                             style={{
                                 display: 'inline-block',
                                 marginRight: '100px'
                             }}>monitorSystem
                        </div>
                        <div className='iconType'>
                            <Link className="home-group-item" to="/">首页</Link>
                        </div>
                        <div className='iconType'>
                            <Link className="configration-group-item" to="/Configuration"><span>配置</span></Link>
                        </div>
                        <div className='iconType'>
                            <a>监测</a>
                        </div>
                        <div className='iconType'>
                            <a>告警</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>

            <div className="body">
                <div className='alarmInfomation'>
                    <div className='alarmDiv' style={{
                        marginLeft: '100px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'inline-block'
                    }}>
                        <span className='alarm'>主机配置</span><br/>
                    </div>
                    <div className='newHostDiv' style={{
                        display: 'inline-block',
                        marginLeft: '1500px',
                        marginRight: '100px',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}>
                        {/*<NavLink to={{pathname: '/Configuration/PopUp', state: 'rowData'}}>
                            <Button type="primary" value="addHost">新建主机</Button>
                        </NavLink>*/}
                        <div className='PopUp'>
                            {/*<div className="PopUp-group-item" ><span>添加主机</span></div>*/}
                            <PopUp  />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

function showData2() {
    console.log(Mock.mock({
        "number|1-100": 100
    }))
}

export default Configuration;