import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import "./LeftMenu.scss"
import {Dropdown, Space, Tooltip} from "antd";
import Listicon from "./Listicon";
import {CaretDownOutlined} from "@ant-design/icons";
import hostStore from "../../host/store/HostStore";
import {observer} from "mobx-react";

const LeftMenu = (props) => {

    let hostId = localStorage.getItem('hostId');

    let url = localStorage.getItem('url');

    const router = [
        {
            name: '概况',
            icon: 'host',
            url: `/hostList/${hostId}/hostDetails`,
            key: "host",
            encoded: "host",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/hostList/${hostId}/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/hostList/${hostId}/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/hostList/${hostId}/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/hostList/${hostId}/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ];

    const {hostData, findHostById, findRecentHostList, hostList} = hostStore;

    useEffect(async () => {
        await findHostById(hostId);
        await findRecentHostList(hostId);
    }, [hostId]);

    const selectMenu = (url) => {
        props.history.push(url)
        localStorage.setItem("url", url)
    }


    async function changeHost(item) {
        if (hostId !== item.id) {
            localStorage.setItem("hostId", item.id);
            localStorage.setItem("url",`/hostList/${item.id}/hostDetails`);
            props.history.push(`/hostList/${item.id}/hostDetails`);
        }
    }

    return (
        <div className="leftMenu-body">
            <div className="leftMenu-top">
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
                                     onClick={() => props.history.push('/configuration')}
                                >更多
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="normal-aside-opt-icon">
                        <Tooltip placement="right" title={hostData?.name}>
                            <div>
                                <Listicon
                                    text={hostData?.name}
                                    colors={hostData?.color}
                                />
                            </div>
                        </Tooltip>
                        <span><CaretDownOutlined/></span>
                    </div>
                </Dropdown>
            </div>
            <div className="box-left">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`leftMenu-box ${url === item.url ? "border-left" : ""}`}
                            >
                                <svg className="leftMenu-svg-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>
                                <span className="leftMenu-text">
                                    {item.name}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="box-left-button"
                 onClick={() => selectMenu(`/hostList/${hostId}/projectInformation`)}
            >
                <svg className="leftMenu-svg-icon" aria-hidden="true">
                    <use xlinkHref={"#icon-setting"}></use>
                </svg>
                <span className="leftMenu-text">设置</span>
            </div>
        </div>
    );
};
export default withRouter(observer(LeftMenu));