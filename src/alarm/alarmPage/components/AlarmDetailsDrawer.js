/**
 * @name: AlarmDetailsDrawer
 * @date: 2025-3-5 14:30
 * @description：告警详情抽屉
 * @update: 2025-3-5 14:30
 */

import React, {useState, useEffect, useRef} from 'react';
import { Drawer} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./AlarmDetailsDrawer.scss"
import { conversionType, isConfirm} from "../../common/components/Common";
import Breadcrumb from "../../../host/common/components/Breadcrumb";
import Btn from "../../../common/btn/Btn";
const AlarmDetailsDrawer = (props) => {
    const {visible,setVisible,details}=props

    return(
        <Drawer
            placement='right'
            width={"50%"}
            bodyStyle={{padding:0,overflow:"hidden"}}
            onClose={()=>setVisible(false)}
            closable={false}
            destroyOnClose={true}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={()=>setVisible(false)} />
            }
        >
            <div className='alarm-drawer'>
                <div className='alarm-drawer-bread'>
                    <div className='alarm-drawer-bread-nav'>
                       <div> 告警信息</div>
                        <Btn
                            title={<CloseOutlined style={{fontSize:16}}/>}
                            type="text"
                            onClick={()=>setVisible(false)}
                        />
                    </div>
                    <div className='alarm-drawer-bread-message'>

                        <div className=''>
                            {details?.sendMessage}
                        </div>
                    </div>

                </div>

                <div className={'alarm-drawer-body'}>
                    <div className={'alarm-drawer-left'}>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>设备名称</div>
                            <div>{details?.name}</div>
                        </div>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>告警等级</div>
                            <div>{conversionType(details?.severityLevel)}</div>
                        </div>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>解决时间</div>
                            <div>{details?.resolutionTime?details.resolutionTime:"未解决"}</div>
                        </div>

                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>状态</div>
                            <div>{isConfirm(details?.status)}</div>
                        </div>
                    </div>

                    <div className='alarm-drawer-right'>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>设备IP</div>
                            <div>{details?.ip}</div>
                        </div>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>设备类型</div>
                            <div>{
                                details?.machineType===1&&'主机'||
                                details?.machineType===2&&'数据库'||
                                details?.machineType===3&&'k8s'||
                                details?.machineType===4&&'网络'
                            }</div>
                        </div>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>告警时间</div>
                            <div>{details?.alertTime}</div>
                        </div>
                        <div className='alarm-drawer-nav'>
                            <div className='alarm-drawer-nav-title'>持续时长</div>
                            <div>{details?.duration}</div>
                        </div>
                    </div>
                </div>

            </div>
        </Drawer>
    )

}
export default AlarmDetailsDrawer
