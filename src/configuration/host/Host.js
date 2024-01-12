import React from 'react';
import TopList from "../../home/common/components/TopList";
import LeftMenu from "../common/LeftMenu";
import  "./Host.css"
import HostDetailsList from "./HostDetailsList";
import {withRouter} from "react-router-dom";
const Host = (props) => {

    return (
        <div>
            <TopList/>
            <div className="host-body" >
                <div className="box">
                    <LeftMenu/>
                    <div className="box-right">

                        {/*<div style={{margin:'20px 200px'}}>主机详情</div>*/}
                        <div className="box-host-details">
                            <div className="box-host-margin-details">
                                <div className="box-host-details-text">主机名称：host1</div>
                                <div className="box-host-details-text">主机描述：可用</div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-details-text">主机ip：127.0.0.1</div>
                                <div className="box-host-details-text">监控项数量：4</div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-details-text">主机状态：开启</div>
                                <div className="box-host-details-text">触发器数量：2</div>
                            </div>
                            <div className="box-host-margin-details">
                                <div className="box-host-details-text">主机是否可用：可用</div>
                            </div>
                        </div>
                        <div>
                            <div className="host-news">
                                主机最新动态
                            </div>
                            <div className="host-news-List">
                                <HostDetailsList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Host);