import React from 'react';
import "./GlobalSettingLeftTabs.scss"
import {withRouter} from "react-router-dom";

const SettingLeftTabs = (props) => {

    const hostId = localStorage.getItem("hostId")

    const router = [
        {
            name: '模板配置',
            url: `/globalSettings/template`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '监控项原型',
            url: `/globalSettings/hostGroup`,
            key: "member",
            encoded: "member",
        },
        {
            name: '主机组设置',
            url: `/globalSettings/monitorItem`,
            key: "permissions",
            encoded: "permissions",
        },
    ]

    const selectSetting = (url) => {
        props.history.push(url)
    }

    return (
        <div className="globalSetting-box-right-left">
            {
                router.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => selectSetting(item.url)}
                            className="globalSetting-box-right-tabs"
                        >
                            <span className="globalSetting-text">{item.name}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default withRouter(SettingLeftTabs);