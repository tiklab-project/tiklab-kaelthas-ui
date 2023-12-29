import logo from "../../public/image/logo.png";
import {Link} from "react-router-dom";
import React from "react";


const TopList = ()=>{
    return(
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
    )
}


export default TopList;