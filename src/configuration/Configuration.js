import React from "react";
import PopUp from "./AddHost";
import TableList from "./TableList";
import TapList from "../common/TopList"
import AddHost from "./AddHost";
import "./Configuration.scss"
import {Input} from "antd";

const Configuration = () => {

    const Search = () => <Input placeholder="请输入监控项名称"/>;

    return (
        <div>
            <TapList/>
            <div className='box-configuration-body'>
                <div className="box-configuration-body-item">
                    <div className="box-configuration-body--title">
                        <div className="box-configuration-title-left">
                            <span>主机配置</span>
                        </div>
                        <div className="box-configuration-title-right">
                            <AddHost/>
                        </div>
                    </div>
                    <div className="box-configuration-body-type">
                        <div className="box-configuration-body-tabs">
                            <div className="box-configuration-body-tabs-item">
                                所有
                            </div>
                            <div className="box-configuration-body-tabs-item">
                                可用
                            </div>
                            <div className="box-configuration-body-tabs-item">
                                不可用
                            </div>

                        </div>
                        <div className="box-configuration-body-search">
                            <Search/>
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <TableList/>
                    </div>
                </div>

                {/*<div className="box-configuration">
                    <div className='alarmInfomation'>
                        <div className='alarmDiv' style={{
                            marginLeft: '100px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            display: 'inline-block'
                        }}>
                            <span className='alarm'><h3></h3></span><br/>
                        </div>
                        <div className='newHostDiv' style={{
                            display: 'inline-block',
                            marginLeft: '1500px',
                            marginRight: '100px',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>
                            <div className='PopUp'>
                                <AddHost/>
                            </div>

                        </div>
                        <div className='alarmbody' style={{
                            margin: '10px 100px',
                            display: 'block'
                        }}>
                            <TableList/>
                        </div>
                    </div>

                </div>*/}
            </div>
        </div>
    )
}

export default Configuration;