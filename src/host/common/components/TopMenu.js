import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import "./TopMenu.scss"
import {Col, Dropdown, Row, Space, Tooltip} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import hostStore from "../../hostOverview/store/HostStore";
import {observer} from "mobx-react";

const TopMenu = (props) => {

    let hostId = localStorage.getItem('hostId');

    let url = localStorage.getItem('url');

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/host/${hostId}/hostOverview`,
            key: "hostOverview",
            encoded: "hostOverview",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/host/${hostId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/host/${hostId}/hostAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/host/${hostId}/config/monitor`,
            key: "config",
            encoded: "config",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/host/${hostId}/projectInformation`,
            key: "setting",
            encoded: "setting",
        },
    ];

    const {hostData, findHostById, findRecentHostList, hostList} = hostStore;

    useEffect(async () => {
        await findHostById(hostId);
        await findRecentHostList(hostId);
    }, [hostId]);

    const selectMenu = (url, key) => {
        if (key === "config") {
            localStorage.setItem("configUrl", `/host/${hostId}/config/monitor`)
        }
        localStorage.setItem("url", url)
        props.history.push(url)
    }


    async function changeHost(item) {
        if (hostId !== item.id) {
            localStorage.setItem("hostId", item.id);
            localStorage.setItem("hostName", item?.name);
            localStorage.setItem("url", `/host/${item.id}/hostOverview`);
            props.history.push(`/host/${item.id}/hostOverview`);
        }
    }

    function goBackHost() {
        props.history.push("/host")
    }

    return (
        <div className="topMenu-body">
            <div className="topMenu-top">
                <div className="topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor:"pointer"}} onClick={() => goBackHost()}>
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
                                    {
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
                                    }
                                    <div className='host-opt-more'
                                         onClick={() => props.history.push('/config')}
                                    >更多
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className="normal-aside-opt-icon">
                            <Tooltip placement="right" title={hostData?.name}>
                                <div className="normal-host-opt-title">
                                    <span style={{fontSize: 16}}>
                                        {hostData?.name && hostData?.name}
                                    </span>
                                    <CaretDownOutlined/>
                                </div>
                            </Tooltip>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div className="top-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url, item.key)}
                                className={`topMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                <svg className="topMenu-svg-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>
                                <span className="topMenu-text">
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
export default withRouter(observer(TopMenu));