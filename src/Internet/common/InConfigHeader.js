import React, {useEffect, useState} from 'react';
import "./InConfigHeader.scss"
import {withRouter} from "react-router-dom";
import {Dropdown, Tooltip} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import internetStore from "../internetPage/store/InternetStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";

const InConfigHeader = (props) => {

    const {
        updateInternet
    } = internetStore;

    const {
        findAlarmNumByCondition
    } = alarmPageStore


    let internetId = localStorage.getItem('internetId');

    let url = localStorage.getItem('url');

    const [alarmNum, setAlarmNum] = useState(0);

    useEffect(async () => {
        const newVar = await findAlarmNumByCondition({hostId: internetId});
        setAlarmNum(newVar?.alarmNum)
    }, []);

    const selectMenu = (url) => {
        localStorage.setItem("url", url)
        localStorage.setItem("configUrl", `/internet/${internetId}/configs/monitor`)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/internet/${internetId}/inOverview`,
            key: "inDetails",
            encoded: "inDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/internet/${internetId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/internet/${internetId}/inAlarm`,
            key: "internetAlarm",
            encoded: "internetAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/internet/${internetId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/internet/${internetId}/inSetting/inProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/internet")
    }

    async function changeHost(item) {
        if (internetId !== item.id) {
            await updateInternet(item)
            localStorage.setItem("internetId", item.id);
            localStorage.setItem("internetName", item?.name);
            localStorage.setItem("url", `/internet/${item.id}/kuDetails`);
            props.history.push(`/internet/${item.id}/kuDetails`);
        }
    }

    return (
        <div className="in-configs-header">
            <div className="in-topMenu-top">
                <div className="in-topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                                        网络 / {localStorage.getItem("internetName")}
                                    </span>
                    {/*<Dropdown
                        getPopupContainer={e => e.parentElement}
                        overlayStyle={{width: 200, top: 48, left: 80}}
                        trigger={['click']}
                        overlayClassName="normal-aside-dropdown"
                        overlay={
                            <div className="in-opt">
                                <div className="in-opt-title">切换网络</div>
                                <div className="in-opt-group">
                                    {
                                        internet && internet.map(item => {
                                            return (
                                                <div onClick={() => changeHost(item)}
                                                     key={item?.id}
                                                     className={`in-opt-item ${item?.id === internetId ? "in-opt-active" : ""}`}
                                                >
                                                <span className={`in-opt-icon mf-icon-${item?.color}`}>
                                                    {item?.name?.substring(0, 1).toUpperCase()}
                                                </span>
                                                    <span className="in-opt-name">
                                                    {item?.name}
                                                </span>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='in-opt-more' onClick={() => props.history.push('/internet')}>更多</div>
                                </div>
                            </div>
                        }
                    >
                        <div className="in-normal-aside-opt-icon">
                            <Tooltip placement="right" title={localStorage.getItem("internetName")}>
                                <div className="in-normal-host-opt-title">
                                    <span className="in-normal-opt-text" onClick={() => dropDownList()}>
                                        {localStorage.getItem("internetName")}
                                    </span>
                                    <CaretDownOutlined/>
                                </div>
                            </Tooltip>
                        </div>
                    </Dropdown>*/}
                </div>
            </div>
            <div className="in-config-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`inMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                {/*<svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                <span className="inMenu-text">
                                    {item.name}
                                </span>
                                {"告警" === item.name && alarmNum !== 0 ?
                                    <div className="inTop-text-div">
                                        <div className="inTop-text-number">
                                            {alarmNum}
                                        </div>
                                    </div> : ""}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(InConfigHeader);