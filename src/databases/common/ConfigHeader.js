import React from 'react';
import "./ConfigHeader.scss"
import {withRouter} from "react-router-dom";

const ConfigHeader = (props) => {

    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('url');
    console.log(url)

    const selectMenu = (url) => {
        console.log(url)
        localStorage.setItem("url", url)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostDetails',
            url: `/databasesList/${dbId}/databasesDetails`,
            key: "databasesDetails",
            encoded: "databasesDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/databasesList/${dbId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/databasesList/${dbId}/DBAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/databasesList/${dbId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/databasesList/${dbId}/projectInformation`,
            key: "setting",
            encoded: "setting",
        },
    ];

    return (
        <div className="configs-header">
            <div></div>
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