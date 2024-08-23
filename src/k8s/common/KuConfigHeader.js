import React, {useEffect, useState} from 'react';
import "./KuConfigHeader.scss"
import {withRouter} from "react-router-dom";
import {Dropdown, Tooltip} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";

const KuConfigHeader = (props) => {


    let kuId = localStorage.getItem('kuId');

    let url = localStorage.getItem('url');

    const [kuList,setDbList] = useState();

    const selectMenu = (url) => {
        localStorage.setItem("url", url)
        localStorage.setItem("confUrl",`/kubernetes/${kuId}/configs/monitor`)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostDetails',
            url: `/kubernetes/${kuId}/kuOverview`,
            key: "kuDetails",
            encoded: "kuDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/kubernetes/${kuId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/kubernetes/${kuId}/kuAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/kubernetes/${kuId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/kubernetes/${kuId}/kuSetting/kuProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/kubernetes")
    }

    async function dropDownList() {
        // const kus = await findDropDown();
        // setDbList(kus)
    }

    async function changeHost(item) {
        if (kuId !== item.id) {
            // await updateDbInfo(item)
            localStorage.setItem("kuId", item.id);
            localStorage.setItem("kuName", item?.name);
            localStorage.setItem("url", `/kuList/${item.id}/kuDetails`);
            props.history.push(`/kuList/${item.id}/kuDetails`);
        }
    }

    return (
        <div className="ku-configs-header">
            <div className="ku-topMenu-top">
                <div className="ku-topMenu-top-title">
                    <div className="ku-normal-aside-left">
                        <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                             onClick={() => goBackHost()}>
                            <use xlinkHref={`#icon-left`}></use>
                        </svg>
                    </div>
                    {/*<Dropdown
                        getPopupContainer={e => e.parentElement}
                        overlayStyle={{width: 200, top: 48, left: 80}}
                        trigger={['click']}
                        overlayClassName="normal-aside-dropdown"
                        overlay={
                            <div className="ku-opt">
                                <div className="ku-opt-title">切换主机</div>
                                <div className="ku-opt-group">
                                    {
                                        kuList && kuList.map(item => {
                                            return (
                                                <div onClick={() => changeHost(item)}
                                                     key={item?.id}
                                                     className={`ku-opt-item ${item?.id === kuId ? "ku-opt-active" : ""}`}
                                                >
                                                <span className={`ku-opt-icon mf-icon-${item?.color}`}>
                                                    {item?.name?.substring(0, 1).toUpperCase()}
                                                </span>
                                                    <span className="ku-opt-name">
                                                    {item?.name}
                                                </span>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='ku-opt-more' onClick={() => props.history.push('/ku')}>更多</div>
                                </div>
                            </div>
                        }
                    >
                        <div className="ku-normal-aside-opt-icon">
                            <Tooltip placement="right" title={localStorage.getItem("kuName")}>
                                <div className="ku-normal-host-opt-title">
                                    <span style={{fontSize: 16}} onClick={() => dropDownList()}>
                                        {localStorage.getItem("kuName")}
                                    </span>
                                    <CaretDownOutlined/>
                                </div>
                            </Tooltip>
                        </div>
                    </Dropdown>*/}
                </div>
            </div>
            <div className="ku-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`kuMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                <svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>
                                <span className="kuMenu-text">
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

export default withRouter(KuConfigHeader);