import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import countStore from "../store/CountStore";
import "./SettingHome.scss";
import {applyJump} from "thoughtware-core-ui";

const SettingHome = props => {

    const {findCount} = countStore;

    const [count,setCount] = useState({})

    useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
    },[])

    /**
     * 路由跳转
     */
    const li = ['department','user','userGroup','directory'];
    const goPath = path => {
        const authConfig = JSON.parse(localStorage.getItem("authConfig"))
        if(!authConfig.authType){
            if(li.some(item => item===path)){
                return applyJump(`${authConfig.authServiceUrl}/#/setting/${path}`)
            }
        }
        props.history.push(`/setting/${path}`)
    }

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "21", offset: "1" }}
                xxl={{ span: "20", offset: "2" }}
            >
                <div className='mf-home-limited'>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>用户与权限</div>
                        <div className='home-chunk'>
                            {
                                version==='ce' &&
                                <>
                                    <div className='home-chunk-item' onClick={()=>goPath('department')}>
                                        <div className='home-chunk-label'>部门</div>
                                        <div className='home-chunk-info'>
                                            <div className='home-chunk-desc'>部门</div>
                                            <div className='home-chunk-length'>{count?.departmentNumber || 0}</div>
                                        </div>
                                    </div>
                                    <div className='home-chunk-item' onClick={()=>goPath('user')}>
                                        <div className='home-chunk-label'>用户</div>
                                        <div className='home-chunk-info'>
                                            <div className='home-chunk-desc'>用户</div>
                                            <div className='home-chunk-length'>{count?.userNumber || 0}</div>
                                        </div>
                                    </div>
                                    <div className='home-chunk-item' onClick={()=>goPath('userGroup')}>
                                        <div className='home-chunk-label'>用户组</div>
                                        <div className='home-chunk-info'>
                                            <div className='home-chunk-desc'>用户组</div>
                                            <div className='home-chunk-length'>{count?.userGroupNumber || 0}</div>
                                        </div>
                                    </div>
                                    {/*<div className='home-chunk-item' onClick={()=>goPath('directory')}>
                                        <div className='home-chunk-label'>用户目录</div>
                                        <div className='home-chunk-info'>
                                            <div className='home-chunk-desc'>用户目录</div>
                                            <div className='home-chunk-length'>{count?.userDirNumber || 0}</div>
                                        </div>
                                    </div>*/}
                                </>
                            }
                            {/*<div className='home-chunk-item' onClick={()=>goPath('systemRole')}>
                                <div className='home-chunk-label'>权限</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>权限</div>
                                    <div className='home-chunk-length'>{count?.roleNumber || 0}</div>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>消息</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' onClick={()=>goPath('messageNotice')}>
                                <div className='home-chunk-label'>消息通知方案</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>消息通知方案</div>
                                    <div className='home-chunk-length'>{count?.messageNoticeNumber || 0}</div>
                                </div>
                            </div>
                            <div className='home-chunk-item' onClick={()=>goPath('messageSendType')}>
                                <div className='home-chunk-label'>消息发送方式</div>
                                <div className='home-chunk-info'>
                                    <div className='home-chunk-desc'>消息发送方式</div>
                                    <div className='home-chunk-length'>{count?.messageSendTypeNumber || 0}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='home-title'>监控配置</div>
                        <div className='home-chunk'>
                            <div className='home-chunk-item' >
                                <div className='home-chunk-label'>模板配置</div>
                                <div className='home-chunk-info home-chunk-wrap' onClick={()=>goPath('grouping')}>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>模板数量</div>
                                        <div className='home-chunk-length'>{count?.templateNum || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>监控项数量</div>
                                        <div className='home-chunk-length'>{count?.templateMonitorNum || 0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='home-chunk-item' >
                                <div className='home-chunk-label'>主机配置</div>
                                <div className='home-chunk-info home-chunk-wrap' onClick={()=>goPath('hostGroup')}>
                                    <div className='home-chunk-wrap-inline' >
                                        <div className='home-chunk-desc'>主机数量</div>
                                        <div className='home-chunk-length'>{count?.hostNum || 0}</div>
                                    </div>
                                    <div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>监控项数量</div>
                                        <div className='home-chunk-length'>{count?.hostMonitorNum || 0}</div>
                                    </div>
                                    {/*<div className='home-chunk-wrap-inline'>
                                        <div className='home-chunk-desc'>触发器数量</div>
                                        <div className='home-chunk-length'>{count?.hostNumber || 0}</div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        version==='ce' &&
                        <div className='setting-home-chunk'>
                            <div className='home-title'>应用与安全</div>
                            <div className='home-chunk'>
                                <div className='home-chunk-item' onClick={()=>goPath('backups')}>
                                    <div className='home-chunk-label'>备份与恢复</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>上次备份时间</div>
                                        <div className='home-chunk-length'>{count?.backupsTime || '无'}</div>
                                    </div>
                                </div>
                                <div className='home-chunk-item' onClick={()=>goPath('version')}>
                                    <div className='home-chunk-label'>版本与许可证</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>版本类型</div>
                                        <div className='home-chunk-length'>{count?.expired ? '社区版' : '企业版'}</div>
                                    </div>
                                </div>
                                <div className='home-chunk-item' onClick={()=>goPath('productAuth')}>
                                    <div className='home-chunk-label'>应用访问权限</div>
                                    <div className='home-chunk-info'>
                                        <div className='home-chunk-desc'>已授权</div>
                                        <div className='home-chunk-length'>{count?.authNumber || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;