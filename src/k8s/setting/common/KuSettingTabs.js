import React, {useEffect, useState} from 'react';
import "./KuSettingTabs.scss"
import {withRouter} from "react-router-dom";

const KuSettingTabs = (props) => {

    const kuId = localStorage.getItem("kuId")

    const router = [
        {
            name: 'k8s信息',
            url: `/kubernetes/${kuId}/kuSetting/kuProject`,
            key: "kuSetting",
            encoded: "kuSetting",
        },
        {
            name: '成员',
            url: `/kubernetes/${kuId}/kuSetting/kuMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/kubernetes/${kuId}/kuSetting/kuPermissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ]

    const [selectKey,setSelectKey] = useState(`/kubernetes/${kuId}/kuSetting/kuProject`);

    const selectSetting = (url) => {
        setSelectKey(url)
        props.history.push(url)
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
    }, [kuId])

    return (
        <div className="kuSetting-box-right-left">
            <div className="kuSetting-box-right-text title">
                设置
            </div>
            <div className="kuSetting-box-menu">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectSetting(item.url)}
                                className={`kuSetting-box-right-tabs ${item.url === selectKey ? "kuSetting-kuSetting-select" : ""}`}
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

export default withRouter(KuSettingTabs);