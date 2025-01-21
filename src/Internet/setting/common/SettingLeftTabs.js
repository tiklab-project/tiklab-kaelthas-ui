import React, {useEffect, useState} from 'react';
import "./SettingLeftTabs.scss"
import {withRouter} from "react-router-dom";

const SettingLeftTabs = (props) => {
    const {match:{params}} = props;
    const internetId = params.id

    const router = [
        {
            name: '网络信息',
            url: `/internet/${internetId}/inSetting/inProject`,
            key: "inProject",
            encoded: "inProject",
        },
        {
            name: '成员',
            url: `/internet/${internetId}/inSetting/inMember`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/internet/${internetId}/inSetting/inPermissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ];

    const [selectKey,setSelectKey] = useState(`/internet/${internetId}/inSetting/inProject`);

    const selectSetting = (url) => {
        setSelectKey(url)
        props.history.push(url)
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
    }, [internetId])

    return (
        <div className="in-setting-box-right-left">
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
    );
};

export default withRouter(SettingLeftTabs);
