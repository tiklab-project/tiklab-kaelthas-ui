import React from "react";
import logo from "../../public/image/logo.png"
import computerPng from "../../public/image/computer.png"

import "../css/HomePage.css";
import "./configuration/Configuration";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className='HomePageCss'>
            <div className='HeadInformation'>
                <div className='Head-left' style={{display: 'inline-block'}}>
                    <div className="icon">
                        <img src={logo} className={"logo-img"} alt={"logo"}
                             style={{display: 'inline-block', marginLeft: '50px'}}/>
                        <div className="logo-text" align={'center'}
                             style={{display: 'inline-block', marginRight: '100px'}}>monitorSystem
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
                <div className='hostTop'>
                    <div style={{marginLeft: '100px', marginTop: '30px'}}>常用主机</div>
                    <div className='host1'
                         style={{
                             display: "inline-block",
                             margin: '30px 100px 30px 100px',
                             background: '#f1f1f1', padding: '20px'
                         }}>
                        <img src={computerPng} className={"computer-png"} alt={"computer"}
                             style={{display: 'inline-block'}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a>host01</a>

                        <p>
                            最新数据:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            告警:&nbsp;&nbsp;&nbsp;<br/>状态:</p>
                    </div>
                    <div className={"alarmList"}>
                        <img src={computerPng} className={"computer-png"} alt={"computer"}
                             style={{display: 'inline-block'}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a>host02</a>

                        <p>
                            最新数据:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            告警:&nbsp;&nbsp;&nbsp;<br/>状态:</p>
                    </div>
                    <div className={"alarmList"}>
                        <img src={computerPng} className={"computer-png"} alt={"computer"}
                             style={{display: 'inline-block'}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a>host03</a>

                        <p>
                            最新数据:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            告警:&nbsp;&nbsp;&nbsp;<br/>状态:</p>
                    </div>
                    <div className={"alarmList"}>
                        <img src={computerPng} className={"computer-png"} alt={"computer"}
                             style={{display: 'inline-block'}}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a>host04</a>

                        <p>
                            最新数据:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            告警:&nbsp;&nbsp;&nbsp;<br/>状态:</p>
                    </div>
                </div>


                <div className='alarmInfomation'>
                    <div className='alarmDiv' style={{marginLeft: '100px', marginTop: '30px', marginBottom: '30px'}}>
                        <span className='alarm'>告警信息</span><br/>
                    </div>
                    <div className='alarmlist1'
                         style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='alarmTable'>
                            主机名称
                        </div>
                        <div className='alarmTable'>
                            告警信息
                        </div>
                        <div className='alarmTable'>
                            告警严重等级
                        </div>
                        <div className='alarmTable'>
                            告警时间
                        </div>
                        <div className='alarmTable'>
                            消息是否发送成功
                        </div>
                    </div>
                    <div className='alarmlist2' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='list2-line1' style={{
                            display: 'inline-block',
                            marginLeft: '130px',
                            marginRight: '100px',
                            marginTop: '10px'
                        }}>
                            host1
                        </div>
                        <div className='list2-line2' style={{
                            display: 'inline-block',
                            marginLeft: '100px',
                            marginRight: '50px',
                            marginTop: '10px'
                        }}>
                            CPU空闲使用率超过指定数值
                        </div>
                        <div className='list2-line3' style={{
                            display: 'inline-block',
                            marginLeft: '110px',
                            marginRight: '140px',
                            marginTop: '10px'
                        }}>一般严重
                        </div>
                        <div className='list2-line4' style={{
                            display: 'inline-block',
                            marginLeft: '80px',
                            marginRight: '100px',
                            marginTop: '10px'
                        }}>2023/12/14 14：12
                        </div>
                        <div className='list2-line5' style={{
                            display: 'inline-block',
                            marginLeft: '150px',
                            marginTop: '10px'
                        }}>是
                        </div>
                    </div>
                    <div className='alarmlist3' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='list3-line1' style={{
                            display: 'inline-block',
                            marginLeft: '130px',
                            marginRight: '100px',
                            marginTop: '10px'
                        }}>host2
                        </div>
                        <div className='list3-line2' style={{
                            display: 'inline-block',
                            marginLeft: '100px',
                            marginRight: '50px',
                            marginTop: '10px'
                        }}>主机已用内存超过指定数值
                        </div>
                        <div className='list3-line3' style={{
                            display: 'inline-block',
                            marginLeft: '135px',
                            marginRight: '130px',
                            marginTop: '10px'
                        }}>未分类
                        </div>
                        <div className='list3-line4' style={{
                            display: 'inline-block',
                            marginLeft: '100px',
                            marginRight: '100px',
                            marginTop: '10px'
                        }}>2023/12/14 12：42
                        </div>
                        <div className='list3-line5' style={{
                            display: 'inline-block',
                            marginLeft: '150px',
                            marginRight: '100px',
                            marginTop: '10px'
                        }}>否
                        </div>
                    </div>

                </div>
                <div className='news'>
                    <div className='newsDiv' style={{marginLeft: '100px', marginTop: '30px', marginBottom: '30px'}}>
                        <span className='news'>最新动态</span><br/>
                    </div>
                    <div className='newslist1' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='newsListLeft'>
                            创建主机host04
                        </div>
                        <div className='newsListRight'>
                            2023/12/15 18：43
                        </div>
                    </div>
                    <div className='newslist2' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='newsListLeft'>
                            创建主机host03
                        </div>
                        <div className='newsListRight'>
                            2023/12/15 15：43
                        </div>
                    </div>
                    <div className='newslist3' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='newsListLeft'>
                            创建主机host02
                        </div>
                        <div className='newsListRight'>
                            2023/12/14 9：27
                        </div>
                    </div>
                    <div className='newslist4' style={{display: 'inline-block', marginLeft: '50px'}}>
                        <div className='newsListLeft'>
                            创建主机host01
                        </div>
                        <div className='newsListRight'>
                            2023/12/13 13：22
                        </div>
                    </div>

                </div>
                <div className='news'>

                </div>

            </div>
        </div>
    )
}
export default HomePage;