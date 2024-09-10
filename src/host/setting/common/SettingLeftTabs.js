import React, {useEffect, useState} from 'react';
import "./SettingLeftTabs.scss"
import {withRouter} from "react-router-dom";

const SettingLeftTabs = (props) => {

    const hostId = localStorage.getItem("hostId")

    const router = [
        {
            name: '主机信息',
            url: `/hostList/${hostId}/projectInformation`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/hostList/${hostId}/member`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/hostList/${hostId}/permissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ];

    const [selectKey,setSelectKey] = useState(`/hostList/${hostId}/projectInformation`);

    const selectSetting = (url) => {
        setSelectKey(url)
        props.history.push(url)
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
    }, [hostId])

    return (
        <div className="setting-box-right-left">
            <div className="setting-box-right-text title">
                设置
            </div>
            <div className="setting-box-menu">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectSetting(item.url)}
                                className={`setting-box-right-tabs ${item.url === selectKey ? "setting-setting-select" : ""}`}
                            >
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(SettingLeftTabs);