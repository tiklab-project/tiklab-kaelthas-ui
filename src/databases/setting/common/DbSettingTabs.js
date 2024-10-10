import React, {useEffect, useState} from 'react';
import "./DbSettingTabs.scss"
import {withRouter} from "react-router-dom";

const DbSettingTabs = (props) => {

    const dbId = localStorage.getItem("dbId")

    const router = [
        {
            name: '数据库信息',
            url: `/db/${dbId}/dbSetting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/db/${dbId}/dbSetting/dbMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/db/${dbId}/dbSetting/dbPermissions`,
            key: "permissions",
            encoded: "permissions",
        },
    ]

    const [selectKey,setSelectKey] = useState(`/db/${dbId}/dbSetting/dbProject`);

    const selectSetting = (url) => {
        setSelectKey(url)
        props.history.push(url)
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
    }, [dbId])

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

export default withRouter(DbSettingTabs);