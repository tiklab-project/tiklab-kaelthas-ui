import React from "react";
import logo from "../../../public/image/logo.png";
import {Link, NavLink} from "react-router-dom";
import Mock from "mockjs";
import PopUp from "../PopUp";
import TableList from "./TableList";
import TapList from "../../common/TopList"

const Configuration = () => {
    return (
        <div className='configration'>
            <TapList/>

            <div className="body">
                <div className='alarmInfomation'>
                    <div className='alarmDiv' style={{
                        marginLeft: '100px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'inline-block'
                    }}>
                        <span className='alarm'><h3>主机配置</h3></span><br/>
                    </div>
                    <div className='newHostDiv' style={{
                        display: 'inline-block',
                        marginLeft: '1500px',
                        marginRight: '100px',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <div className='PopUp'>
                            <PopUp/>
                        </div>

                    </div>
                    <div className='alarmbody' style={{
                        margin: '10px 100px',
                        display: 'block'
                    }}>
                        <TableList/>
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