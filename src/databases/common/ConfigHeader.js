import React, {useEffect, useState} from 'react';
import "./ConfigHeader.scss"
import {withRouter} from "react-router-dom";
import databasesStore from "../databasesPage/store/DatabasesStore";
import {observer} from "mobx-react";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";

const ConfigHeader = (props) => {

    const {
        updateDbInfo,
    } = databasesStore;
    const {
        findAlarmNumByCondition
    } = alarmPageStore


    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('url');

    const [alarmNum, setAlarmNum] = useState(0);

    const selectMenu = (url) => {
        localStorage.setItem("url", url)
        localStorage.setItem("confUrl", `/db/${dbId}/configs/monitor`)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/db/${dbId}/dbDetails`,
            key: "dbDetails",
            encoded: "dbDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/db/${dbId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/db/${dbId}/dbAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/db/${dbId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/db/${dbId}/dbSetting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/db")
    }

    useEffect(async () => {
        //查询配置的数据库列表,查询4个
        const newVar = await findAlarmNumByCondition({hostId: dbId});
        setAlarmNum(newVar?.alarmNum)
    }, []);

    async function changeHost(item) {
        if (dbId !== item.id) {
            await updateDbInfo(item)
            localStorage.setItem("dbType", item.dbType);
            localStorage.setItem("dbId", item.id);
            localStorage.setItem("dbName", item?.name);
            localStorage.setItem("url", `/db/${item.id}/dbDetails`);
            props.history.push(`/db/${item.id}/dbDetails`);
        }
    }

    return (
        <div className="configs-header">
            <div className="db-topMenu-top">
                <div className="db-topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                            数据库 / {localStorage.getItem("dbName")}
                        </span>
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
                                {/*<svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                <span className="dbMenu-text">
                                    {item.name}
                                </span>
                                {"告警" === item.name ?
                                    <div className="dbTop-text-div">
                                        <div className="dbTop-text-number">
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

export default withRouter(observer(ConfigHeader));