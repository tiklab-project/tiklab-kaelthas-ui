import React from "react";
import PopUp from "./AddHost";
import TableList from "./TableList";
import TapList from "../common/TopList"
import AddHost from "./AddHost";

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

            </div>
        </div>
    )
}

export default Configuration;