import React from 'react';
import "./ConfigHeader.scss"
import {withRouter} from "react-router-dom";
import {Dropdown, Tooltip} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";

const ConfigHeader = (props) => {

    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('url');

    const selectMenu = (url) => {
        localStorage.setItem("url", url)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostDetails',
            url: `/dbList/${dbId}/dbDetails`,
            key: "dbDetails",
            encoded: "dbDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/dbList/${dbId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/dbList/${dbId}/dbAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/dbList/${dbId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/dbList/${dbId}/dbSetting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/db")
    }

    return (
        <div className="configs-header">
            <div className="topMenu-top">
                <div className="topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <Dropdown
                        getPopupContainer={e => e.parentElement}
                        overlayStyle={{width: 200, top: 48, left: 80}}
                        trigger={['click']}
                        overlayClassName="normal-aside-dropdown"
                        overlay={
                            <div className="host-opt">
                                <div className="host-opt-title">切换主机</div>
                                <div className="host-opt-group">
                                    {/*{
                                        hostList && hostList.map(item => {
                                            return (
                                                <div onClick={() => changeHost(item)}
                                                     key={item?.id}
                                                     className={`host-opt-item ${item?.id === hostId ? "host-opt-active" : ""}`}
                                                >
                                                <span className={`host-opt-icon mf-icon-${item?.color}`}>
                                                    {item?.name?.substring(0, 1).toUpperCase()}
                                                </span>
                                                    <span className="host-opt-name">
                                                    {item?.name}
                                                </span>
                                                </div>
                                            )
                                        })
                                    }*/}
                                    <div className='host-opt-more'
                                         onClick={() => props.history.push('/db')}
                                    >更多
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className="normal-aside-opt-icon">
                            <Tooltip placement="right" title={"pgsql"}>
                                <div className="normal-host-opt-title">
                                    <span style={{fontSize: 16}}>
                                    {"pgsql"}
                                    </span>
                                    <CaretDownOutlined/>
                                </div>
                            </Tooltip>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div className="db-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`dbMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                <svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>
                                <span className="dbMenu-text">
                                    {item.name}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(ConfigHeader);