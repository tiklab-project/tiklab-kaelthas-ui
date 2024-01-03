import logo from "../assets/image/logo.png";
import React from "react";
import {withRouter} from "react-router-dom";


const TopList = (props)=>{
    const homePage=()=>{
        props.history.push("/")
    }

    const configuration=()=>{
        props.history.push("/Configuration")
    }

    return(
        <>
            <div className='HeadInformation'>
                <div className='Head-left' style={{display: 'inline-block'}}>
                    <div className="icon" style={{height:"50px"}}>
                        <img src={logo} className={"logo-img"} alt={"logo"}
                             style={{display: 'inline-block', marginLeft: '50px'}}/>
                        <div className="logo-text" align={'center'}
                             style={{display: 'inline-block', marginRight: '100px'}}>monitorSystem
                        </div>
                        <div className='iconType'>
                            <span className="configration-group-item" onClick={homePage} style={{cursor:"pointer"}}>首页</span>
                            {/*<Link className="home-group-item" to="/">首页</Link>*/}
                        </div>
                        <div className='iconType'>
                            <span className="configration-group-item" onClick={configuration} style={{cursor:"pointer"}}>配置</span>
                            {/*<Link className="configration-group-item" to="/Configuration"><span>配置</span></Link>*/}
                        </div>
                        <div className='iconType'>
                            <span>监测</span>
                        </div>
                        <div className='iconType'>
                            <span>告警</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </>

    )
}


export default withRouter(TopList);