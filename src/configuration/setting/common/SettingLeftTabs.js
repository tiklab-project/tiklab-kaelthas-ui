import React from 'react';
import "./SettingLeftTabs.scss"
import {withRouter} from "react-router-dom";
const SettingLeftTabs = (props) => {


    const router = [
        {
            name: '项目信息',
            url: `/Configuration/Host/Setting`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/Configuration/Host/Setting/member`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/Configuration/Host/Setting/permissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ]

    const selectSetting = (url) => {
        props.history.push(url)
    }

    return (
        <div className="setting-box-right-left">
            <div className="setting-box-right-text">
                设置
            </div>
            {
                router.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => selectSetting(item.url)}
                            className="setting-box-right-tabs"
                        >
                            <span className="setting-text">{item.name}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default withRouter(SettingLeftTabs);