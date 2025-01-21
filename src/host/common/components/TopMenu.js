import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./TopMenu.scss"
import hostStore from "../../hostOverview/store/HostStore";
import {observer} from "mobx-react";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";

const TopMenu = (props) => {
    const {match:{params},location:{pathname}} = props;

    const [alarmNum,setAlarmNum] = useState(0);

    const {findAlarmNumByCondition} = alarmPageStore

    let hostId=params.id

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

    const {hostData, findHostById} = hostStore;
    const [url,setUrl]=useState();

    useEffect(async () => {
        if (pathname.includes("/config/")){
           // const a=pathname.slice(0,pathname.indexOf("/config/"))
            setUrl( `/host/${hostId}/config/monitor`)
        }else if(pathname.endsWith("/member")||pathname.endsWith("/permissions")){
            setUrl(`/host/${hostId}/projectInformation`)
        } else{
            setUrl(pathname)
        }
    }, [pathname]);

    useEffect(async () => {
        await findHostById(hostId);
        const newVar = await findAlarmNumByCondition({hostId: hostId});
        setAlarmNum(newVar?.alarmNum)
    }, [hostId]);

    const selectMenu = (url, key) => {
        props.history.push(url)
    }


    function goBackHost() {
        props.history.push("/host")
    }

    return (
        <div className="topMenu-body">
            <div className="topMenu-top">
                <div className="topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                         主机 / {hostData?.name && hostData?.name}
                    </span>
                </div>
            </div>
            <div className="top-tabs">

                <div className="top-right">
                    {
                        router.map((item, index) => {
                            return (

                                <div
                                    key={index}
                                    onClick={() => selectMenu(item.url, item.key)}
                                    className={`topMenu-box ${url === item.url ? "border-bottom" : ""}`}
                                >
                                    {/*<svg className="topMenu-svg-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                    <span className={`topMenu-text`}>
                                    {item.name}
                                    </span>
                                    {"告警" === item.name && alarmNum !== 0 ?
                                        <div className="top-text-div">
                                            <div className="top-text-number">
                                                {alarmNum}
                                            </div>
                                        </div> : ""}
                                </div>
                            )
                        })
                    }
                </div>
                <div>

                </div>
                {/*<div
                    onClick={() => selectMenu(`/host/${hostId}/project`, "setting")}
                    className={`top-box-right ${url === `/host/${hostId}/project` ? "border-bottom" : ""}`}>
                    <svg className="topMenu-svg-icon" aria-hidden="true">
                        <use xlinkHref={`#icon-setting`}></use>
                    </svg>
                    <span className={`top-box-right-text`}>
                        设置
                    </span>
                </div>*/}
            </div>
        </div>
    );
};
export default withRouter(observer(TopMenu));
